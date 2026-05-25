import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'Your full name' },
    { name: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'you@company.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: Phone, placeholder: '+60 12 345 6789' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map(({ name, label, type, icon: Icon, placeholder }) => (
        <div key={name} className="relative group">
          <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wide mb-2">
            {label}
          </label>
          <div className="relative">
            <Icon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/60 group-focus-within:text-[#C9A84C] transition-colors"
            />
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-[#0E1726] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all"
            />
          </div>
        </div>
      ))}

      {/* Message */}
      <div className="relative group">
        <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wide mb-2">
          Message
        </label>
        <div className="relative">
          <MessageSquare
            size={16}
            className="absolute left-4 top-4 text-[#C9A84C]/60 group-focus-within:text-[#C9A84C] transition-colors"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your requirements..."
            rows={4}
            required
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-[#0E1726] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all resize-none"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300"
        style={{ background: sent ? '#22c55e' : 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
      >
        {sent ? (
          <>
            <CheckCircle size={18} />
            Message Sent Successfully!
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  )
}
