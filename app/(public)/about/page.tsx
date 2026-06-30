'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }

const values = [
  { icon: '✦', title: 'Widest Selection', desc: 'From everyday Cadbury bars to rare imported brands — we stock more chocolate varieties than anywhere else in Nanded.' },
  { icon: '✦', title: 'Trusted Since 2001', desc: 'Over 23 years of serving Nanded families, building a reputation for quality, availability, and great service.' },
  { icon: '✦', title: 'Gift Hampers', desc: 'Beautiful curated gift boxes for birthdays, weddings, Diwali, and corporate gifting — assembled in-store for you.' },
  { icon: '✦', title: 'Open Late', desc: 'We stay open until 10:00 PM every day, so you can always find the perfect chocolate — even at the last minute.' },
]

export default function AboutPage() {
  return (
    <div style={{ background: '#f8f4ef' }}>
      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 text-center" style={{ background: '#1c0f08' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
              Our Journey
            </span>
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}>
            Our <em>Story</em>
          </h1>
          <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
            23 years of making Nanded&apos;s chocolate lovers happy.
          </p>
        </motion.div>
      </div>

      {/* Story Section */}
      <section 
        className="py-24 md:py-32 px-6 lg:px-12 relative overflow-hidden"
        style={{ 
          background: 'url(/bestsellers bg.png) center/cover no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, rgba(248,244,239,0.65) 0%, rgba(248,244,239,0.60) 100%)'
          }}
        />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
              <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
                Est. 2001
              </span>
            </div>
            <h2 className="text-5xl font-semibold mb-8 leading-tight" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}>
              Nanded's Most Loved <em>Chocolate Shop</em>
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
              Chocolate Shopee opened its doors on Bhagya Nager T point, Nanded in 2001 with a simple mission: bring the world's best chocolates to one place. Over two decades later, we remain the city's most trusted destination for chocolate lovers of all ages.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
              From iconic Indian brands like Cadbury and Amul to international favourites like Ferrero Rocher, Lindt, Toblerone, Kinder, and more — our shelves carry hundreds of varieties so you always find exactly what you're looking for.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '23+', label: 'Years in Business' },
              { value: '100+', label: 'Brands Stocked' },
              { value: '10 PM', label: 'Open Until' },
              { value: '5000+', label: 'Happy Customers' },
            ].map((stat) => (
              <div key={stat.label} className="p-8 flex flex-col items-center justify-center text-center" style={{ border: '1px solid #e2d4c1' }}>
                <span className="text-4xl md:text-5xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#c9a84c' }}>
                  {stat.value}
                </span>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Store Info Banner */}
      <section className="py-12 px-6 lg:px-12" style={{ background: '#c9a84c' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {[
            { icon: '📍', label: 'Location', value: 'Bhagya Nager T point, Nanded' },
            { icon: '🕙', label: 'Hours', value: 'Open Until 10:00 PM Daily' },
            { icon: '📅', label: 'Est.', value: '2001 — 23 Years in Business' },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(28,15,8,0.6)', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 15, color: '#1c0f08', fontWeight: 500 }}>{item.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-6 lg:px-12" style={{ background: '#1c0f08' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
              <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>What Sets Us Apart</span>
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}>
              Why <em>Chocolate Shopee</em>
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(201,168,76,0.1)' }}>
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="p-10" style={{ background: '#1c0f08' }}>
                <span className="text-3xl mb-6 block" style={{ color: '#c9a84c' }}>{v.icon}</span>
                <h3 className="text-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef', fontWeight: 600 }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,244,239,0.55)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 text-center" style={{ background: '#f8f4ef' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-5xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}>
            Visit Us or <em>Order Online</em>
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
            Come find us on Bhagya Nager T point, Nanded — or WhatsApp us to check availability and place an order.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <motion.button whileHover={{ scale: 1.03 }} className="px-10 py-4 text-xs tracking-[0.25em] uppercase" style={{ background: '#1c0f08', color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}>
                Browse Products
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.03 }} className="px-10 py-4 text-xs tracking-[0.25em] uppercase border transition-all duration-300 hover:bg-[#1c0f08] hover:text-[#f8f4ef]" style={{ borderColor: '#1c0f08', color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 400 }}>
                Get in Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
