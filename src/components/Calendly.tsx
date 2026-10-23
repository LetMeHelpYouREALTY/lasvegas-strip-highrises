'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { calendlyUrl } from '@/lib/calendly'

type CalendlyApi = {
  initPopupWidget: (o: { url: string }) => void
  initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void
  initBadgeWidget: (o: { url: string; text: string; color: string; textColor: string; branding?: boolean }) => void
  destroyBadgeWidget?: () => void
}

const calendly = () => (window as unknown as { Calendly?: CalendlyApi }).Calendly

/** Loads Calendly once and shows the floating badge on every page. */
export function CalendlyScript() {
  const pathname = usePathname() || '/'

  // Rebuild the badge on each route change so utm_campaign matches the page.
  const initBadge = useCallback(() => {
    const api = calendly()
    if (!api) return
    if (api.destroyBadgeWidget) api.destroyBadgeWidget()
    else document.querySelector('.calendly-badge-widget')?.remove()
    api.initBadgeWidget({
      url: calendlyUrl('tour', 'badge', pathname.slice(1) || 'home'),
      text: 'Schedule a showing',
      color: '#eab308',
      textColor: '#030712',
      branding: false,
    })
  }, [pathname])

  useEffect(() => {
    initBadge()
  }, [initBadge])

  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" onLoad={initBadge} />
    </>
  )
}

/** Opens the Calendly popup; falls back to the booking page without JS. */
export function CalendlyButton({
  url,
  className,
  children,
}: {
  url: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        const api = calendly()
        if (e.metaKey || e.ctrlKey || e.shiftKey || !api) return
        e.preventDefault()
        api.initPopupWidget({ url })
      }}
    >
      {children}
    </a>
  )
}

/** Inline Calendly scheduler. */
export function CalendlyInline({ url, height = 700 }: { url: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let tries = 0
    const timer = window.setInterval(() => {
      const api = calendly()
      if (api && ref.current) {
        window.clearInterval(timer)
        ref.current.innerHTML = ''
        api.initInlineWidget({ url, parentElement: ref.current })
      } else if (++tries > 100) window.clearInterval(timer)
    }, 100)
    return () => window.clearInterval(timer)
  }, [url])
  return <div ref={ref} className="w-full overflow-hidden rounded-xl bg-white" style={{ minWidth: 320, height }} />
}
