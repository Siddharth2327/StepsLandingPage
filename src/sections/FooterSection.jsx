import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import FadeIn from '../components/FadeIn'

const quickLinks = ['About Us', 'Our Services', 'Our Clients', 'Contact Us', 'Careers']
const serviceLinks = [
    'Expatriate Visa (ESD)',
    'Professional Visit Pass',
    'Dependent Pass',
    'Employment Pass (MDEC)',
    'Residence Pass',
    'APEC Travel Card',
]
const socials = [
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
]

export default function FooterSection() {
    const handleNav = (e, id) => {
        e.preventDefault()
        const el = document.getElementById(id.toLowerCase().replace(/\s+/g, ''))
            || document.getElementById(id.toLowerCase().split(' ')[1]?.toLowerCase() || id.toLowerCase())
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer
            style={{ background: 'linear-gradient(180deg, #0A1628 0%, #060E1A 100%)' }}
        >
            {/* Top CTA band */}
            <div
                className="border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3
                                    className="text-2xl font-semibold text-white mb-1"
                                    style={{ fontFamily: 'Playfair Display, serif' }}
                                >
                                    Ready to work in Malaysia?
                                </h3>
                                <p className="text-white/50 text-sm">Let our experts guide your journey.</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-sm font-semibold flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
                            >
                                Get Started Today
                                <ArrowRight size={16} />
                            </motion.button>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Main footer grid */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-5">
                                <img
                                    src="images/logo/stepslogo.png"
                                    alt="Sree Step Management"
                                    className="w-12 h-12 object-contain flex-shrink-0"
                                />
                                <div className="flex flex-col ">
                                    <div className="text-sm font-bold tracking-wide leading-none">
                                        <span style={{ color: '#CC1A1A' }}>SREE </span><span style={{ color: '#2E7D32' }}>STEP</span>
                                    </div>
                                    <div className="text-white/40 text-[10px] tracking-widest uppercase mt-1">Management Sdn Bhd</div>
                                </div>
                            </div>

                            <p className="text-white/50 text-sm leading-relaxed mb-6">
                                Malaysia's trusted expatriate management and immigration consultancy since 2005.
                            </p>

                            {/* Social icons — using react-icons/fa */}
                            <div className="flex gap-3">
                                {socials.map(({ icon: Icon, href, label }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        whileHover={{ y: -2, scale: 1.1 }}
                                        aria-label={label}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                                        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(201,168,76,0.2)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                                    >
                                        <Icon size={15} color="rgba(255,255,255,0.6)" />
                                    </motion.a>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <FadeIn delay={0.1}>
                            <h4 className="text-white text-xs font-semibold tracking-[0.15em] uppercase mb-5">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            onClick={(e) => handleNav(e, link)}
                                            className="text-sm text-white/50 hover:text-[#E8C97A] transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-3 h-px bg-[#C9A84C] transition-all duration-300 flex-shrink-0" />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>

                    {/* Services */}
                    <div>
                        <FadeIn delay={0.15}>
                            <h4 className="text-white text-xs font-semibold tracking-[0.15em] uppercase mb-5">
                                Our Services
                            </h4>
                            <ul className="space-y-3">
                                {serviceLinks.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#services"
                                            onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
                                            className="text-sm text-white/50 hover:text-[#E8C97A] transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-3 h-px bg-[#C9A84C] transition-all duration-300 flex-shrink-0" />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>

                    {/* Contact */}
                    <div>
                        <FadeIn delay={0.2}>
                            <h4 className="text-white text-xs font-semibold tracking-[0.15em] uppercase mb-5">
                                Contact Us
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-white/50 leading-relaxed">
                                        Suite 12-5, Menara Kembar Bank Rakyat, Wangsa Maju, 53300 Kuala Lumpur
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={14} className="text-[#C9A84C] flex-shrink-0" />
                                    <div className='flex flex-col'>
                                        <a
                                            href="tel:+60362426901"
                                            className="text-sm text-white/50 hover:text-[#E8C97A] transition-colors"
                                        >
                                            +603-6242 6901
                                        </a>
                                        <a
                                            href="tel:+60362436901"
                                            className="text-sm text-white/50 hover:text-[#E8C97A] transition-colors"
                                        >
                                            +603-6243 6901
                                        </a>
                                    </div>

                                </li>

                                <li className="flex items-center gap-3">
                                    <Mail size={14} className="text-[#C9A84C] flex-shrink-0" />
                                    <a
                                        href="mailto:admin@steps.com.my"
                                        className="text-sm text-white/50 hover:text-[#E8C97A] transition-colors"
                                    >
                                        admin@steps.com.my
                                    </a>
                                </li>
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div
                className="border-t"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white/30 text-xs text-center sm:text-left">
                        © COPYRIGHT SREE STEP MANAGEMENT SDN BHD. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}