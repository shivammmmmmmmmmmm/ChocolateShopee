'use client'

import { motion } from 'framer-motion'

const waLink = 'https://wa.me/1234567890?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20chocolates%20at%20Chocolate%20Shopee%2C%20Nanded'

export default function ContactPage() {
  return (
    <div style={{ background: '#f8f4ef' }}>
      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 text-center" style={{ background: '#1c0f08' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
              Visit Us or Message Us
            </span>
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}>
            Find <em>Us</em>
          </h1>
          <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
            We&apos;re open daily until 10 PM. Walk in or WhatsApp us for availability &amp; gift orders.
          </p>
        </motion.div>
      </div>

      {/* Store Info Cards */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                label: 'Address',
                value: 'Bhagya Nagar Road, Nanded, Maharashtra',
                href: 'https://maps.google.com/?q=Bhagya+Nagar+Road+Nanded',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                label: 'Store Hours',
                value: 'Open Daily · Until 10:00 PM',
                href: null,
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
                label: 'WhatsApp',
                value: '+91 12345 67890',
                href: waLink,
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
                label: 'Email',
                value: 'hello@chocolateshopee.com',
                href: 'mailto:hello@chocolateshopee.com',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center p-8 transition-all duration-300"
                style={{ border: '1px solid #e2d4c1', background: '#fffaf6' }}
              >
                <div className="mb-4" style={{ color: '#c9a84c' }}>{item.icon}</div>
                <span className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}>
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm leading-relaxed text-center hover:text-[#c9a84c] transition-colors"
                    style={{ color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm leading-relaxed text-center" style={{ color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
                    {item.value}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 overflow-hidden"
            style={{ border: '1px solid #e2d4c1' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30334.47!2d77.3057!3d19.1639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d7f48aa3ee51%3A0x2cc5c3f5d5b4d3c!2sNanded%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1" 
              width="100%"
              height="380"
              style={{ border: 0, display: 'block', filter: 'sepia(20%) contrast(95%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chocolate Shopee Location — Bhagya Nagar Road, Nanded"
            />
          </motion.div>

          {/* WhatsApp CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center p-16"
            style={{ background: '#1c0f08' }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
              <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
                Quickest Way to Enquire
              </span>
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}>
              Chat with Us on <em>WhatsApp</em>
            </h2>
            <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
              Ask about availability, gift hamper options, pricing, and bulk orders. We reply quickly!
            </p>
            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.2em] uppercase"
              style={{ background: '#25D366', color: '#fff', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
