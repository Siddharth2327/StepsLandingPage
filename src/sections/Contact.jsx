import React from 'react'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import SectionTitle from '../components/SectionTitle'
import FadeIn from '../components/FadeIn'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'Office Suites, 9th floor, Suite-32, \n Kompleks Mutiaras, Batu 3 1/2, Jalan Ipoh, \n51200, Kuala Lumpur, Malaysia.',
    type: 'text',
  },
  {
    icon: Phone,
    label: 'Phone',
    type: 'phone',
    lines: [
      { display: '+603-6242 6901',   href: 'tel:+60362426901'   },
      { display: '+603-6243 6901',   href: 'tel:+60362436901'   },
    ],
  },
  {
    icon: Mail,
    label: 'Email',
    type: 'email',
    lines: [
      { display: 'admin@steps.com.my', href: 'mailto:admin@steps.com.my' },
    ],
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Mon – Fri: 9:00 AM – 6:00 PM\nSat: 9:00 AM – 1:00 PM',
    type: 'text',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 overflow-hidden" style={{ background: '#F8F6F1' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeIn>
          <SectionTitle
            eyebrow="Get In Touch"
            title={<>Let's Start Your<br />Malaysia Journey</>}
            subtitle="Reach out to our team of immigration experts. We respond within one business day."
          />
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: Contact Form (3 cols) ── */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <div
              className="rounded-3xl overflow-hidden shadow-xl"
              style={{ background: 'linear-gradient(160deg, #0E1726 0%, #1A2A42 100%)' }}
            >
              {/* Form header band */}
              <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-3"
                  style={{ background: 'rgba(201,168,76,0.18)', color: '#E8C97A', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  Free Consultation
                </div>
                <h3
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Send Us a Message
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  Fill in the details below and our team will be in touch shortly.
                </p>
              </div>

              {/* Form body */}
              <div className="px-8 py-7">
                <ContactForm dark />
              </div>
            </div>
          </FadeIn>

          {/* ── RIGHT: Info + Map (2 cols) ── */}
          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="flex flex-col gap-5">

              {/* Contact info cards — each full width, no 2-col grid */}
              {contactInfo.map((info) => {
                const { icon: Icon, label } = info
                return (
                <div
                  key={label}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-md transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #F5E9C8, #E8C97A40)' }}
                  >
                    <Icon size={16} style={{ color: '#C9A84C' }} strokeWidth={2} />
                  </div>

                  {/* Text — min-w-0 prevents overflow */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold text-[#5A6478] uppercase tracking-widest mb-1">
                      {label}
                    </div>
                    {info.type === 'phone' || info.type === 'email' ? (
                      <div className="flex flex-col gap-0.5">
                        {info.lines.map(({ display, href }) => (
                          <a
                            key={href}
                            href={href}
                            className="text-sm text-[#0E1726] hover:text-[#C9A84C] transition-colors duration-200 break-all leading-relaxed"
                            style={{ textDecoration: 'none' }}
                          >
                            {display}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="text-sm text-[#0E1726] leading-relaxed whitespace-pre-line break-words"
                        style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                      >
                        {info.value}
                      </div>
                    )}
                  </div>
                </div>
                )
              })}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md" style={{ height: 200 }}>
                <iframe
                  title="Sree Step Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.6410311699065!2d101.67810437505383!3d3.1887177967865425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4875afce5879%3A0xf0c5cf4f0e4ce310!2sSREE%20STEP%20MANAGEMENT%20SDN%20BHD!5e0!3m2!1sen!2sin!4v1779709890089!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Response badge */}
              <div
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #F5E9C8, #FDF8EC)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse"
                  style={{ boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
                />
                <p className="text-sm text-[#5A6478] leading-snug">
                  <span className="font-semibold text-[#0E1726]">Typically within 4 hours —</span>{' '}
                  our team responds fast on business days.
                </p>
              </div>

            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}