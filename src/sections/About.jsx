import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Building2, FileText, Users, Landmark } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import FadeIn from '../components/FadeIn'

const highlights = [
  { icon: Users, label: 'Expatriate Management', desc: 'End-to-end support for expatriate relocation and employment.' },
  { icon: Landmark, label: 'Immigration Support', desc: 'Visa, pass applications, and government liaison services.' },
  { icon: Building2, label: 'Corporate Services', desc: 'Company registration, secretarial, and advisory solutions.' },
  { icon: FileText, label: 'Taxation Assistance', desc: 'Tax compliance and advisory for foreign professionals.' },
  { icon: Shield, label: 'Government Liaison', desc: 'Expert liaison with MDEC, MIDA, Immigration, and more.' },
]

export default function About() {
  return (
    <section id="about" className="py-28 section-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            <SectionTitle
              eyebrow="About Us"
              title={<>Malaysia's Premier<br />Expatriate Advisory</>}
              subtitle="SREE STEP MANAGEMENT SDN BHD provides expert advisory services on documentation and liaison with government agencies in Malaysia, empowering global businesses to operate seamlessly."
            />

            <FadeIn delay={0.3}>
              <div className="space-y-4">
                {highlights.map(({ icon: Icon, label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F7F5F0] transition-colors group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #F5E9C8, #E8C97A40)' }}
                    >
                      <Icon size={18} style={{ color: '#C9A84C' }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0E1726] mb-0.5 group-hover:text-[#C9A84C] transition-colors">
                        {label}
                      </div>
                      <div className="text-sm text-[#5A6478] leading-relaxed">{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Visual Cards */}
          <div className="relative">
            <FadeIn delay={0.2} direction="left">
              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden bg-[#0E1726] p-8 shadow-2xl">
                {/* Background decorative */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ background: '#C9A84C', transform: 'translate(30%, -30%)' }}
                />
                <div
                  className="absolute bottom-0 left-0 w-36 h-36 rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{ background: '#5B8EC4', transform: 'translate(-20%, 20%)' }}
                />

                <div className="relative z-10">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                    style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#E8C97A]">
                      Our Mission
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-semibold text-white mb-4 leading-snug"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Bridging Malaysia's<br />
                    <span style={{ color: '#E8C97A' }}>opportunities</span> with<br />
                    global talent.
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-8">
                    Since 2005, we've been the trusted partner for multinational corporations,
                    SMEs, and individual professionals navigating Malaysia's regulatory landscape.
                  </p>

                  {/* Mini stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: '20+', label: 'Years Experience' },
                      { val: '113+', label: 'Corporate Clients' },
                      { val: '2500+', label: 'Expats Served' },
                      { val: '5', label: 'Global Offices' },
                    ].map(({ val, label }) => (
                      <div
                        key={label}
                        className="p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <div
                          className="text-2xl font-bold mb-0.5"
                          style={{ color: '#E8C97A', fontFamily: 'Playfair Display, serif' }}
                        >
                          {val}
                        </div>
                        <div className="text-xs text-white/50 font-medium">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
                  >
                    <Shield size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0E1726]">Government Certified</div>
                    <div className="text-[11px] text-[#5A6478]">MDEC & MIDA Accredited</div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
