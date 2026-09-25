'use client'
import { useEffect, useRef } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement | null }) => void
    }
  }
}

export default function CalendlyWidget({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const fullUrl = `${url}?hide_gdpr_banner=1`

  useEffect(() => {
    if (window.Calendly && ref.current && ref.current.childElementCount === 0) {
      window.Calendly.initInlineWidget({ url: fullUrl, parentElement: ref.current })
    }
  }, [fullUrl])

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Calendly && ref.current && ref.current.childElementCount === 0) {
            window.Calendly.initInlineWidget({ url: fullUrl, parentElement: ref.current })
          }
        }}
      />
      <div
        ref={ref}
        className="calendly-inline-widget"
        data-url={fullUrl}
        style={{ minWidth: '320px', height: '700px' }}
      />
    </>
  )
}
