import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = ['About', 'Services', 'Clients', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
    >
      <nav
        className={`w-full max-w-5xl rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border border-white/60'
            : 'glass'
        }`}
      >
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}) }} className="flex items-center gap-3 group">
          <img
            src="images/logo/stepslogo.png"
            alt="Sree Step Management"
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col items-center">
            <div className="text-base font-semibold tracking-widest uppercase leading-none">
              <span style={{ color: '#CC1A1A' }}>Sree </span><span style={{ color: '#2E7D32' }}>Step</span>
            </div>
            <div className={`text-xs tracking-wider uppercase leading-none transition-colors ${scrolled ? 'text-[#5A6478]' : 'text-white/70'}`}>
              Management
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleNav(e, link)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-100 relative group ${
                  scrolled ? 'text-[#0E1726]/70 hover:text-[#C9A84C]' : 'text-white/80 hover:text-white'
                }`}
              >
                {link}
                <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{background:'#C9A84C'}} />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, 'Contact')}
          className="hidden md:block text-sm font-medium px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#fff' }}
        >
          Get Started
        </a>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-[#0E1726]' : 'text-white'}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-6 z-40"
          >
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => handleNav(e, link)}
                    className="block text-base font-medium text-[#0E1726]/80 hover:text-[#C9A84C] transition-colors py-1"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, 'Contact')}
                  className="block text-center text-sm font-medium px-5 py-3 rounded-xl text-white mt-2"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}