import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

export default function FactCard({ icon: Icon, value, label, suffix = '', index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(value, 2000, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#C9A84C]/8 transition-all duration-300 overflow-hidden group"
    >
      {/* BG glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #F5E9C820 0%, transparent 70%)' }}
      />

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{ background: 'linear-gradient(135deg, #F5E9C8, #E8C97A50)' }}
      >
        <Icon size={26} style={{ color: '#C9A84C' }} strokeWidth={1.6} />
      </div>

      <div className="text-4xl font-bold text-[#0E1726] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-[#5A6478] tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  )
}
