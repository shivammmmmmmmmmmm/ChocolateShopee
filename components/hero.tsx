'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface HeroProps {
  videoUrl?: string
}

export function Hero({ videoUrl }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative w-full" style={{ height: '100svh', minHeight: '600px' }}>
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {videoUrl ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #1c0f08 0%, #3d1f0d 40%, #2a1509 70%, #1c0f08 100%)',
            }}
          />
        )}
        {/* Multi-layer luxury overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(28,15,8,0.3) 0%, rgba(28,15,8,0.5) 50%, rgba(28,15,8,0.85) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(28,15,8,0.4) 100%)',
          }}
        />
      </div>

      {/* Floating gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[3, 2, 4, 3, 5, 2, 4, 3].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: '#c9a84c',
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.4,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#f8f4ef',
            textShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}
        >
          Chocolate
          <br />
          <span className="gold-shimmer">Shopee</span>
        </motion.h1>

        {/* Eyebrow — below headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div style={{ width: 30, height: 1, background: '#c9a84c', opacity: 0.7 }} />
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 400 }}
          >
            Nanded&apos;s Favourite Chocolate Store
          </span>
          <div style={{ width: 30, height: 1, background: '#c9a84c', opacity: 0.7 }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl max-w-lg mb-12 leading-relaxed"
          style={{
            color: 'rgba(248,244,239,0.75)',
            fontFamily: 'Jost, Inter, sans-serif',
            fontWeight: 300,
          }}
        >
          Every chocolate brand you love — all under one roof in Nanded.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
              style={{
                background: '#c9a84c',
                color: '#1c0f08',
                fontFamily: 'Jost, Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.2em',
              }}
            >
              Explore Collection
            </motion.button>
          </Link>
          <a
            href="https://wa.me/1234567890?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20chocolates%20at%20Chocolate%20Shopee%2C%20Nanded"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.03, borderColor: '#c9a84c', color: '#c9a84c' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-xs tracking-[0.25em] uppercase border transition-all duration-300"
              style={{
                borderColor: 'rgba(248,244,239,0.4)',
                color: '#f8f4ef',
                fontFamily: 'Jost, Inter, sans-serif',
                fontWeight: 400,
              }}
            >
              Contact Us
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
