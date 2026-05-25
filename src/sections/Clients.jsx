import React, { useRef, useState, useEffect } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'
import ClientLogo from '../components/ClientLogo'
import SectionTitle from '../components/SectionTitle'
import FadeIn from '../components/FadeIn'

const BASE = import.meta.env.BASE_URL

const clients = [
  { name: 'Immigration Dept Malaysia', image: `${BASE}images/clients/client1.png` },
  { name: 'MDEC Malaysia',             image: `${BASE}images/clients/client2.png` },
  { name: 'MIDA',                      image: `${BASE}images/clients/client3.png` },
  { name: 'Petronas',                  image: `${BASE}images/clients/client4.png` },
  { name: 'Tenaga Nasional',           image: `${BASE}images/clients/client5.png` },
  { name: 'Maybank Group',             image: `${BASE}images/clients/client6.png` },
]

const testimonials = [
  {
    quote: 'Sree Step streamlined our expatriate processes dramatically. Their knowledge of Malaysian immigration is unparalleled.',
    name: 'David Lim',
    role: 'HR Director, MNC Technology Firm',
  },
  {
    quote: "Professional, efficient, and always available. They handled our entire team's Employment Pass renewals seamlessly.",
    name: 'Priya Nair',
    role: 'Operations Head, Regional Consultancy',
  },
  {
    quote: 'From initial inquiry to visa approval, the team guided us through every step with clarity and expertise.',
    name: 'James Thornton',
    role: 'Country Manager, European Manufacturing Co.',
  },
  {
    quote: 'We have relied on Sree Step for over six years across three offices. Their turnaround time and accuracy are exceptional.',
    name: 'Mei Lin Tan',
    role: 'People & Culture Lead, Regional Bank',
  },
  {
    quote: 'The team anticipated every compliance requirement before we even asked. Truly a partner, not just a service provider.',
    name: 'Rajan Krishnamurthy',
    role: 'General Manager, Industrial Conglomerate',
  },
  {
    quote: 'Renewing thirty dependent passes in one month sounded impossible. Sree Step made it routine.',
    name: 'Sophie Marchand',
    role: 'Head of Mobility, French Energy Group',
  },
]

// ── Infinite scrolling carousel ───────────────────────────────────────────────
function TestimonialCarousel() {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const SPEED = 0.5 // px per frame

  // Duplicate cards so the loop is seamless
  const cards = [...testimonials, ...testimonials]

  useAnimationFrame(() => {
    const track = trackRef.current
    if (!track || pausedRef.current) return

    offsetRef.current += SPEED
    const halfWidth = track.scrollWidth / 2

    // When we've scrolled one full set width, snap back silently
    if (offsetRef.current >= halfWidth) {
      offsetRef.current -= halfWidth
    }

    track.style.transform = `translateX(-${offsetRef.current}px)`
  })

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      // Fade edges
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-5 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {cards.map(({ quote, name, role }, i) => (
          <div
            key={`${name}-${i}`}
            className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C9A84C]/20 transition-all duration-300 flex flex-col flex-shrink-0"
            style={{ width: 320 }}
          >
            {/* Quote mark */}
            <div
              className="text-5xl leading-none mb-4 select-none"
              style={{ color: '#E8C97A', fontFamily: 'Playfair Display, serif', lineHeight: 0.8 }}
            >
              "
            </div>
            <p className="text-sm text-[#5A6478] leading-relaxed flex-1 mb-6 italic">
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
              >
                {name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0E1726]">{name}</div>
                <div className="text-xs text-[#5A6478]">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Clients() {
  return (
    <section id="clients" className="py-28 section-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionTitle
            eyebrow="Trusted Partners"
            title="Trusted By Leading Organizations Since 2005"
            subtitle="We are proud to serve government bodies, multinational corporations, and regional enterprises across Malaysia and beyond."
            center
          />
        </FadeIn>

        {/* Logo Grid — 6 clients, 3 cols on mobile → 6 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {clients.map((client, i) => (
            <ClientLogo key={client.name} {...client} index={i} />
          ))}
        </div>

        {/* Divider */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-14">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-[#5A6478] font-medium tracking-wider uppercase px-2">
              Client Testimonials
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </FadeIn>

        {/* Infinite carousel — full bleed past the container */}
      </div>

      {/* Full-width carousel outside the constrained container */}
      <FadeIn>
        <TestimonialCarousel />
      </FadeIn>
    </section>
  )
}