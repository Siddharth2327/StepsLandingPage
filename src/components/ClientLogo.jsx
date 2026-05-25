import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ClientLogo({ name, image, index }) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
      className="group flex items-center justify-center p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#C9A84C]/8 transition-all duration-300 cursor-default"
      style={{ minHeight: 100 }}
    >
      {!failed ? (
        <img
          src={image}
          alt={name}
          onError={() => setFailed(true)}
          style={{
            width: '100%',
            height: 56,
            objectFit: 'contain',
            objectPosition: 'center',
            filter: 'grayscale(100%)',
            opacity: 0.65,
            transition: 'filter 0.3s ease, opacity 0.3s ease',
          }}
          className="group-hover:grayscale-0 group-hover:opacity-100"
          onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.65' }}
        />
      ) : (
        // Fallback — just the name initial letters
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #F0EDE6, #E8E3D8)' }}
        >
          <span className="text-sm font-bold text-[#C9A84C] tracking-wide">
            {name.split(' ').map(w => w[0]).join('').slice(0, 3)}
          </span>
        </div>
      )}
    </motion.div>
  )
}