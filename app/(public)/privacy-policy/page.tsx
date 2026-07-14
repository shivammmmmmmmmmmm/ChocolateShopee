'use client'

import { motion } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: '#f8f4ef' }}>
      {/* Header */}
      <div className="pt-40 pb-16 px-6 lg:px-12 text-center" style={{ background: '#1c0f08' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
              Legal
            </span>
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}>
            Privacy <em>Policy</em>
          </h1>
          <p className="text-sm mt-4" style={{ color: 'rgba(248,244,239,0.4)', fontFamily: 'Jost, Inter, sans-serif' }}>
            Last updated: January 2025
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <section className="py-20 px-6 lg:px-12">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: 'About This Website',
              body: 'This website belongs to Chocolate Shopee, a retail chocolate shop located at Bhagya Nager T point, Nanded, Maharashtra, India. We operate a product showcase website to help customers browse our chocolate collection and contact us for purchases.',
            },
            {
              title: 'Information We Do Not Collect',
              body: 'This website does not require customer registration, login, or account creation. We do not collect personal information from visitors browsing the public website. There are no customer-facing forms that collect personal data.',
            },
            {
              title: 'WhatsApp Orders',
              body: 'Orders are placed via WhatsApp. When you tap the WhatsApp button, you are redirected to WhatsApp\'s platform. Any information shared through WhatsApp is governed by WhatsApp\'s own privacy policy (whatsapp.com/legal/privacy-policy).',
            },
            {
              title: 'Google Maps',
              body: 'Our contact page embeds a Google Maps iframe to display our store location. Google Maps is subject to Google\'s privacy policy. We do not collect any data from this embed.',
            },
            {
              title: 'Cookies',
              body: 'This website uses a single session cookie exclusively for the shop owner\'s admin panel. No tracking cookies, advertising cookies, or analytics cookies are used. Visitors browsing the public website are not tracked.',
            },
            {
              title: 'Third-Party Services',
              body: 'We use Google Fonts for typography (fonts.googleapis.com) and Cloudinary for product image storage (res.cloudinary.com). These services operate under their own privacy policies.',
            },
            {
              title: 'Admin Access',
              body: 'This website has a backend admin panel used exclusively by the shop owner to manage the product catalogue. This panel is not accessible to the public and requires authentication.',
            },
            {
              title: 'Contact',
              body: 'For any privacy-related questions, contact us at Bhagya Nager T point, Nanded, Maharashtra — or via WhatsApp at +91 91588 82111.',
            },
          ].map((section) => (
            <div key={section.title} className="mb-10">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
              >
                {section.title}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
