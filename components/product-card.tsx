'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image?: string | null
  category?: { name: string } | null
  bestseller?: boolean
  featured?: boolean
}

export function ProductCard({ id, name, description, price, image, category, bestseller, featured }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group"
    >
      <Link href={`/products/${id}`}>
        <div
          className="overflow-hidden h-full"
          style={{ background: '#fffaf6', border: '1px solid #e2d4c1' }}
        >
          {/* Image container */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#f0e8da' }}>
            {image && !imgError ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #3d1f0d 0%, #2a1509 100%)',
                }}
              >
                <span
                  className="text-4xl opacity-30"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#c9a84c' }}
                >
                  🍫
                </span>
              </div>
            )}

            {/* Overlay on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{ background: 'rgba(28,15,8,0.25)' }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {bestseller && (
                <span
                  className="px-2.5 py-1 text-xs tracking-[0.15em] uppercase"
                  style={{
                    background: '#c9a84c',
                    color: '#1c0f08',
                    fontFamily: 'Jost, Inter, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  Best Seller
                </span>
              )}
              {featured && !bestseller && (
                <span
                  className="px-2.5 py-1 text-xs tracking-[0.15em] uppercase"
                  style={{
                    background: 'rgba(28,15,8,0.75)',
                    color: '#f8f4ef',
                    fontFamily: 'Jost, Inter, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {category && (
              <span
                className="text-xs tracking-[0.2em] uppercase mb-2 block"
                style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 400 }}
              >
                {category.name}
              </span>
            )}

            <h3
              className="text-xl mb-2 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#1c0f08' }}
            >
              {name}
            </h3>

            <p
              className="text-sm line-clamp-2 mb-4 leading-relaxed"
              style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
            >
              {description}
            </p>

            <div className="flex items-center justify-between">
              <span
                className="text-2xl font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
              >
                ₹{price.toFixed(0)}
              </span>
              <motion.span
                className="text-xs tracking-[0.15em] uppercase flex items-center gap-1.5 transition-colors duration-300"
                style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
                whileHover={{ x: 3 }}
              >
                View Details
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
