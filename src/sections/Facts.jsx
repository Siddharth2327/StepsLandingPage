import React from 'react'
import { Globe, Smile, Users, TrendingUp } from 'lucide-react'
import FactCard from '../components/FactCard'
import SectionTitle from '../components/SectionTitle'
import FadeIn from '../components/FadeIn'

const facts = [
  { icon: Globe, value: 5, label: 'Overseas Offices & Partners', suffix: '' },
  { icon: Smile, value: 113, label: 'Happy Clients', suffix: '+' },
  { icon: Users, value: 2597, label: 'Happy Expats', suffix: '+' },
  { icon: TrendingUp, value: 20, label: 'Years in Market', suffix: '+' },
]

export default function Facts() {
  return (
    <section className="py-24 section-cream relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #F5E9C8 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #E8C97A20 0%, transparent 40%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <SectionTitle
            eyebrow="Our Impact"
            title="Numbers That Speak"
            subtitle="Over two decades of trusted service, building lasting relationships with clients, expatriates, and government partners across Malaysia."
            center
          />
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <FactCard key={fact.label} {...fact} index={i} />
          ))}
        </div>

        {/* Bottom trust line */}
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-sm">
              <div className="flex -space-x-2">
                {['MN', 'JP', 'KR', 'IN', 'SG'].map((c, i) => (
                  <div
                    key={c}
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: `hsl(${i * 60 + 200}, 50%, 40%)` }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <span className="text-sm text-[#5A6478] font-medium">
                Serving expats from <span className="text-[#C9A84C] font-semibold">30+ countries</span> across Malaysia
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
