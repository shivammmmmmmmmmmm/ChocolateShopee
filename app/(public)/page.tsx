'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Hero } from '@/components/hero'
import { ProductCard } from '@/components/product-card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string | null
  category?: { name: string } | null
  featured?: boolean
  bestseller?: boolean
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const features = [
  {
    icon: '✦',
    title: '23 Years of Trust',
    desc: 'Serving Nanded since 2001 — a name every chocolate lover in the city knows and trusts.',
  },
  {
    icon: '✦',
    title: 'All Top Brands',
    desc: "Cadbury, Ferrero, Lindt, Toblerone, Kit Kat, Kinder, Mars — India's widest chocolate selection.",
  },
  {
    icon: '✦',
    title: 'Gift Hampers',
    desc: 'Custom-curated gift boxes for birthdays, weddings, Diwali, and every celebration.',
  },
  {
    icon: '✦',
    title: 'Open Till 10 PM',
    desc: 'Late-evening shopping made easy. We stay open so you never miss out on last-minute gifts.',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Nanded',
    text: ' chocolate shop in Nanded, hands down. They have every brand I can think of and the gift boxes are gorgeous. My go-to for every occasion.',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    location: 'Nanded',
    text: 'Ordered a Ferrero Rocher hamper for my wife\'s birthday and it was wrapped beautifully. Amazing variety and the WhatsApp ordering is so convenient.',
    rating: 5,
  },
  {
    name: 'Kavya Reddy',
    location: 'Nanded',
    text: 'They stock imported chocolates that you simply cannot find anywhere else in the city. Excellent service, always open late. Highly recommend!',
    rating: 5,
  },
]

export default function Home() {
  const searchParams = useSearchParams()
  const [featured, setFeatured] = useState<Product[]>([])
  const [bestsellers, setBestsellers] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])

  // Helper function to get category styling based on name
  const getCategoryStyle = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('chocolate') && !lowerName.includes('imported')) {
      return {
        bg: 'url(https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80)',
        gradient: 'linear-gradient(135deg, rgba(28,15,8,0.7) 0%, rgba(61,31,13,0.7) 100%)',
        subtitle: 'Bold & Intense'
      }
    } else if (lowerName.includes('imported')) {
      return {
        bg: 'url(https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80)',
        gradient: 'linear-gradient(135deg, rgba(60,30,10,0.7) 0%, rgba(120,60,30,0.7) 100%)',
        subtitle: 'Premium Selection'
      }
    } else if (lowerName.includes('gift') || lowerName.includes('hamper')) {
      return {
        bg: 'url(https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80)',
        gradient: 'linear-gradient(135deg, rgba(61,31,13,0.7) 0%, rgba(107,58,31,0.7) 100%)',
        subtitle: 'For Every Occasion'
      }
    } else if (lowerName.includes('beverage') || lowerName.includes('drink')) {
      return {
        bg: 'url(/bevrages.png)',
        gradient: 'linear-gradient(135deg, rgba(28,15,8,0.7) 0%, rgba(61,31,13,0.7) 100%)',
        subtitle: 'Energy & Cold Drinks'
      }
    }
    // Default fallback
    return {
      bg: 'url(https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80)',
      gradient: 'linear-gradient(135deg, rgba(28,15,8,0.7) 0%, rgba(61,31,13,0.7) 100%)',
      subtitle: 'Explore'
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ])
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()
        const products = Array.isArray(productsData) ? productsData : []
        setFeatured(products.filter((p: Product) => p.featured).slice(0, 6))
        setBestsellers(products.filter((p: Product) => p.bestseller).slice(0, 4))
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div style={{ background: '#f8f4ef' }}>
      {/* HERO */}
      <Hero videoUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Extreme_macro_cinematography_of_luxurious_molten_dark_chocolate%2C_smooth_flowing_chocolate_silk_textu_seed4196127522-MhkcgjfbMz06IgYFJBERBl13Ujr3Bf.mp4" />

      {/* MARQUEE STRIP */}
      <div
        className="overflow-hidden py-4"
        style={{ background: '#c9a84c' }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 600 }}
            >
              Cadbury · Ferrero · Lindt · Toblerone &nbsp;&nbsp;✦&nbsp;&nbsp; Gift Hampers Available &nbsp;&nbsp;✦&nbsp;&nbsp; Open Until 10:00 PM &nbsp;&nbsp;✦&nbsp;&nbsp; Bhagya Nager T point, Nanded &nbsp;&nbsp;✦&nbsp;&nbsp; 23 Years of Trust &nbsp;&nbsp;✦&nbsp;&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* COLLECTIONS INTRO */}
      <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            <span
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
            >
              Our Collections
            </span>
            <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-semibold mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
          >
            Shop by <em>Category</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
          >
            From everyday favourites to premium imported brands — find every chocolate you love in one place.
          </motion.p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((cat, i) => {
              const style = getCategoryStyle(cat.name)
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <Link href={`/products?category=${cat.id}`}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden cursor-pointer"
                      style={{ aspectRatio: '3/4' }}
                    >
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: style.bg }}
                      />
                      {/* Overlay Gradient */}
                      <div
                        className="absolute inset-0"
                        style={{ background: style.gradient }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <h3
                          className="text-3xl font-semibold mb-2"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}
                        >
                          {cat.name}
                        </h3>
                        <p
                          className="text-xs tracking-[0.25em] uppercase mb-8"
                          style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
                        >
                          {style.subtitle}
                        </p>
                        <div
                          className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300 hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-[#1c0f08]"
                          style={{ borderColor: 'rgba(201,168,76,0.5)', color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif' }}
                        >
                          Explore
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })
          ) : (
            // Fallback to static categories if API fails
            [
              { title: 'Chocolates', subtitle: 'Bold & Intense', bg: 'url(https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80)', gradient: 'linear-gradient(135deg, rgba(28,15,8,0.7) 0%, rgba(61,31,13,0.7) 100%)' },
              { title: 'Imported Chocolates', subtitle: 'Premium Selection', bg: 'url(https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80)', gradient: 'linear-gradient(135deg, rgba(60,30,10,0.7) 0%, rgba(120,60,30,0.7) 100%)' },
              { title: 'Gift Hampers', subtitle: 'For Every Occasion', bg: 'url(https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80)', gradient: 'linear-gradient(135deg, rgba(61,31,13,0.7) 0%, rgba(107,58,31,0.7) 100%)' },
              { title: 'Beverages', subtitle: 'Energy & Cold Drinks', bg: 'url(/bevrages.png)', gradient: 'linear-gradient(135deg, rgba(28,15,8,0.7) 0%, rgba(61,31,13,0.7) 100%)' },
            ].map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link href="/products">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden cursor-pointer"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: cat.bg }}
                    />
                    {/* Overlay Gradient */}
                    <div
                      className="absolute inset-0"
                      style={{ background: cat.gradient }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <h3
                        className="text-3xl font-semibold mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}
                      >
                        {cat.title}
                      </h3>
                      <p
                        className="text-xs tracking-[0.25em] uppercase mb-8"
                        style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
                      >
                        {cat.subtitle}
                      </p>
                      <div
                        className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300 hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-[#1c0f08]"
                        style={{ borderColor: 'rgba(201,168,76,0.5)', color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif' }}
                      >
                        Explore
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>


      {/* STORY SECTION */}
      <section
        className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden"
        style={{ 
          background: 'url(/bg.png) center/cover no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, rgba(248,244,239,0.75) 0%, rgba(248,244,239,0.70) 100%)'
          }}
        />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
              <span
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
              >
                Nanded&apos;s Chocolate Destination
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl font-semibold mb-8 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
            >
              Your City&apos;s <em>Chocolate Store</em>,<br />Open Since <em>2001</em>
            </h2>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 400 }}
            >
              Chocolate Shopee has been Nanded's most loved chocolate destination for over 23 years. 
              Located on Bhagya Nager T point, we stock every major brand — from Cadbury and Ferrero Rocher
              to Lindt, Toblerone, Kinder, and rare imported varieties.
            </p>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 400 }}
            >
              Whether you're picking up a casual treat or looking for a stunning gift hamper, 
              we have everything you need — and we stay open until 10 PM every day.
            </p>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="px-10 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  background: '#1c0f08',
                  color: '#f8f4ef',
                  fontFamily: 'Jost, Inter, sans-serif',
                  fontWeight: 500,
                }}
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '23+', label: 'Years in Business' },
              { value: '100+', label: 'Brands Stocked' },
              { value: '10 PM', label: 'Open Until' },
              { value: '5000+', label: 'Happy Customers' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-8 flex flex-col items-center justify-center text-center"
                style={{ border: '1px solid #e2d4c1' }}
              >
                <span
                  className="text-4xl md:text-5xl font-semibold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#c9a84c' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32 px-6 lg:px-12" style={{ background: '#2a1509' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
              <span
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
              >
                The Difference
              </span>
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            </div>
            <h2
              className="text-5xl md:text-6xl font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}
            >
              Why Shop at <em>Chocolate Shopee</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(201,168,76,0.1)' }}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ background: 'rgba(201,168,76,0.08)' }}
                className="p-10 transition-colors duration-300"
                style={{ background: '#2a1509' }}
              >
                <span className="text-3xl mb-6 block" style={{ color: '#c9a84c' }}>{feature.icon}</span>
                <h3
                  className="text-xl mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef', fontWeight: 600 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(248,244,239,0.55)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS - MARQUEE STYLE */}
      {bestsellers.length > 0 && (
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
          
          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
                <span
                  className="text-xs tracking-[0.35em] uppercase"
                  style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
                >
                  Most Loved
                </span>
                <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
              </div>
              <h2
                className="text-5xl md:text-6xl font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
              >
                Best <em>Sellers</em>
              </h2>
            </motion.div>

            {/* Marquee Container */}
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: 'linear-gradient(to right, rgba(248,244,239,0.9) 0%, transparent 100%)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: 'linear-gradient(to left, rgba(248,244,239,0.9) 0%, transparent 100%)' }} />
              
              {/* Scrolling Marquee */}
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -1200] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear"
                  }
                }}
              >
                {/* First set */}
                {bestsellers.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{ width: '280px' }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {bestsellers.map((product) => (
                  <div
                    key={`dup-${product.id}`}
                    className="flex-shrink-0"
                    style={{ width: '280px' }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 lg:px-12" style={{ background: '#1c0f08' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
              <span
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
              >
                Voices of Delight
              </span>
              <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
            </div>
            <h2
              className="text-5xl md:text-6xl font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}
            >
              What Our <em>Guests Say</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8"
                style={{ border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} style={{ color: '#c9a84c' }}>★</span>
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed mb-8 italic"
                  style={{
                    color: 'rgba(248,244,239,0.75)',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.1rem',
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs tracking-[0.1em]"
                    style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
                  >
                    {t.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className="py-24 md:py-32 px-6 lg:px-12 text-center"
        style={{ background: '#f8f4ef', borderTop: '1px solid #e2d4c1' }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-5xl md:text-6xl font-semibold mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
            >
              Ready to <em>Shop?</em>
            </h2>
            <p
              className="text-lg mb-12"
              style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
            >
              Browse our collection or WhatsApp us for enquiries, gift hamper orders & availability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-10 py-4 text-xs tracking-[0.25em] uppercase"
                  style={{ background: '#1c0f08', color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
                >
                  Browse Collection
                </motion.button>
              </Link>
              <a
                href="https://wa.me/919158882111?text=Hi%20there%2C%20I%20want%20to%20buy%20chocolates"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-10 py-4 text-xs tracking-[0.25em] uppercase border flex items-center gap-2 transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
                  style={{ borderColor: '#1c0f08', color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 400 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order on WhatsApp
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
