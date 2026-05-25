import React from 'react'
import FadeIn from './FadeIn'

export default function SectionTitle({ eyebrow, title, subtitle, light = false, center = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <FadeIn delay={0}>
          <div className={`inline-flex items-center gap-2 mb-4`}>
            <span className="h-px w-8" style={{ background: '#C9A84C' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#C9A84C' }}
            >
              {eyebrow}
            </span>
            <span className="h-px w-8" style={{ background: '#C9A84C' }} />
          </div>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2
          className={`text-4xl md:text-5xl font-semibold leading-tight mb-4 ${
            light ? 'text-white' : 'text-[#0E1726]'
          }`}
        >
          {title}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.2}>
          <p
            className={`text-base md:text-lg leading-relaxed max-w-2xl ${
              center ? 'mx-auto' : ''
            } ${light ? 'text-white/70' : 'text-[#5A6478]'}`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  )
}
