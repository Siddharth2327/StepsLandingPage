import React, { useState } from 'react'
import {
  Briefcase, Globe, Users, Building2, Cpu, Home, Heart, Plane
} from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import SectionTitle from '../components/SectionTitle'
import FadeIn from '../components/FadeIn'

const BASE = import.meta.env.BASE_URL

const services = [
  {
    icon: Briefcase,
    image: `${BASE}images/services/service1.jpg`,
    title: 'Expatriate Visa (ESD)',
    description: 'Comprehensive Employment Pass applications through the Expatriate Services Division for skilled foreign nationals.',
  },
  {
    icon: Globe,
    image: `${BASE}images/services/service1.jpg`,
    title: 'Professional Visit Pass (PVP)',
    description: 'Short-term professional visit arrangements for consultants, trainers, and specialists entering Malaysia.',
  },
  {
    icon: Users,
    image: `${BASE}images/services/service1.jpg`,
    title: 'Dependent Pass',
    description: 'Facilitate Dependent Pass applications for spouses and children of approved Employment Pass holders.',
  },
  {
    icon: Building2,
    image: `${BASE}images/services/service2.jpg`,
    title: 'Expatriate Post (MIDA)',
    description: 'Strategic employment pass approvals through MIDA for manufacturing and industrial sector expatriates.',
  },
  {
    icon: Cpu,
    image: `${BASE}images/services/service3.jpg`,
    title: 'Employment Pass (MDEC)',
    description: 'Tech sector Employment Pass processing via MDEC for digital economy and MSC Malaysia companies.',
  },
  {
    icon: Home,
    image: `${BASE}images/services/service4.png`,
    title: 'Residence Pass',
    description: 'Long-term Residence Pass (RP-T) applications for highly skilled talent seeking permanent stay in Malaysia.',
  },
  {
    icon: Heart,
    image: `${BASE}images/services/service4.png`,
    title: 'Spouse Visa & Work Permit',
    description: 'Combined applications for spouse visas and associated work permits for qualifying expatriate families.',
  },
  {
    icon: Plane,
    image: `${BASE}images/services/service4.png`,
    title: 'APEC Business Travel Card',
    description: 'APEC Business Travel Card facilitation enabling fast-track entry across 21 APEC member economies.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 section-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionTitle
            eyebrow="What We Offer"
            title={<>Comprehensive Immigration<br />& Advisory Services</>}
            subtitle="We manage every stage of your expatriate lifecycle — from initial visa applications to long-term residency, with expert guidance at each step."
            center
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-16 text-center p-10 rounded-3xl" style={{ background: 'linear-gradient(135deg, #0E1726 0%, #1A2A42 100%)' }}>
            <div
              className="inline-block px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-4"
              style={{ background: 'rgba(201,168,76,0.2)', color: '#E8C97A', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              Custom Advisory
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Not sure which service you need?
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Our consultants will assess your situation and recommend the right pathway for your business or personal immigration needs.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
            >
              Book a Free Consultation
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}