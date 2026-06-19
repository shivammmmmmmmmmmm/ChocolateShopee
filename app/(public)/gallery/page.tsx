'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const gallery = [
  { title: 'Dark Origins', subtitle: 'Single-Origin Collection', bg: 'linear-gradient(135deg, #1c0f08 0%, #3d1f0d 100%)' },
  { title: 'The Art of Tempering', subtitle: 'Behind the Scenes', bg: 'linear-gradient(135deg, #2a1509 0%, #5c3317 100%)' },
  { title: 'Premium Packaging', subtitle: 'Gift Collections', bg: 'linear-gradient(135deg, #3d1f0d 0%, #6b3a1f 100%)' },
  { title: 'Cacao Harvesting', subtitle: 'From Farm to Bar', bg: 'linear-gradient(135deg, #4a2510 0%, #3d1f0d 100%)' },
  { title: 'Truffle Atelier', subtitle: 'Master Chocolatiers at Work', bg: 'linear-gradient(135deg, #1c0f08 0%, #4a2510 100%)' },
  { title: 'Signature Creations', subtitle: 'Limited Editions', bg: 'linear-gradient(135deg, #5c3317 0%, #2a1509 100%)' },
  { title: 'Gold Leaf Collection', subtitle: 'Luxury Series', bg: 'linear-gradient(135deg, #3d2a0d 0%, #1c0f08 100%)' },
  { title: 'Seasonal Specialties', subtitle: 'Festival Editions', bg: 'linear-gradient(135deg, #2a1509 0%, #6b3a1f 100%)' },
  { title: 'Gift Boxes', subtitle: 'Curated Gifting', bg: 'linear-gradient(135deg, #1c0f08 0%, #5c3317 100%)' },
]

export default function GalleryPage() {
  return (
    <div style={{ background: '#f8f4ef' }}>
      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 text-center" style={{ background: '#1c0f08' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
              Visual Showcase
            </span>
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}>
            The <em>Gallery</em>
          </h1>
          <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
            Explore the art and craftsmanship behind every creation.
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{ background: item.bg, aspectRatio: i === 0 || i === 4 ? '3/4' : '4/3' }}
                >
                  {/* Gold shimmer overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(201,168,76,0.06)' }}
                  />

                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-6 h-6 opacity-30" style={{ borderTop: '1px solid #c9a84c', borderLeft: '1px solid #c9a84c' }} />
                  <div className="absolute top-4 right-4 w-6 h-6 opacity-30" style={{ borderTop: '1px solid #c9a84c', borderRight: '1px solid #c9a84c' }} />
                  <div className="absolute bottom-4 left-4 w-6 h-6 opacity-30" style={{ borderBottom: '1px solid #c9a84c', borderLeft: '1px solid #c9a84c' }} />
                  <div className="absolute bottom-4 right-4 w-6 h-6 opacity-30" style={{ borderBottom: '1px solid #c9a84c', borderRight: '1px solid #c9a84c' }} />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <span
                      className="text-xs tracking-[0.3em] uppercase mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                      style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
                    >
                      {item.subtitle}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}
                    >
                      {item.title}
                    </h3>
                    <div
                      className="mt-4 w-8 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ background: '#c9a84c' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Strip */}
      <section className="py-24 px-6 lg:px-12 text-center" style={{ background: '#1c0f08' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}>
            Follow Our <em>Journey</em>
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
            Behind-the-scenes, new arrivals, and sweet moments — follow us on Instagram.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.03 }} className="px-10 py-4 text-xs tracking-[0.25em] uppercase border transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#1c0f08] hover:border-[#c9a84c]"
                style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
                Follow on Instagram
              </motion.button>
            </a>
            <Link href="/products">
              <motion.button whileHover={{ scale: 1.03 }} className="px-10 py-4 text-xs tracking-[0.25em] uppercase"
                style={{ background: '#c9a84c', color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 600 }}>
                Shop Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
