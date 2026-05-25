import React, { useState } from 'react'
import { motion } from 'framer-motion'

function ServiceImage({ image, icon: Icon }) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src={image}
        alt=""
        onError={() => setFailed(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',   // show full image, no cropping
          objectPosition: 'center',
          padding: '6px',         // small breathing room inside the container
          display: 'block',
        }}
      />
    )
  }

  // Fallback — lucide icon
  return <Icon size={22} style={{ color: '#C9A84C' }} strokeWidth={1.8} />
}

export default function ServiceCard({ icon: Icon, image, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#C9A84C]/8 transition-all duration-300 cursor-default"
    >
      {/* Gold accent corner */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(225deg, #F5E9C8, transparent)' }}
      />

      {/* Icon / Image container — larger to show image fully */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 overflow-hidden transition-all duration-300 group-hover:scale-110 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #F5E9C8, #E8C97A40)' }}
      >
        {image
          ? <ServiceImage image={image} icon={Icon} />
          : <Icon size={22} style={{ color: '#C9A84C' }} strokeWidth={1.8} />
        }
      </div>

      <h3 className="text-base font-semibold text-[#0E1726] mb-2 group-hover:text-[#C9A84C] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-[#5A6478] leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
        style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
      />
    </motion.div>
  )
}