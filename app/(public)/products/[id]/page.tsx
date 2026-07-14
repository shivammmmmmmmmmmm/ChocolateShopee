'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  details?: string | null
  price: number
  image?: string | null
  inStock: boolean
  category?: { id: string; name: string } | null
  featured?: boolean
  bestseller?: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => setProduct(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div style={{ background: '#f8f4ef', minHeight: '100vh', paddingTop: 120 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="animate-pulse" style={{ aspectRatio: '1', background: '#ede5da' }} />
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse" style={{ height: 20 + i * 8, background: '#ede5da' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product || (product as any).error) {
    return (
      <div style={{ background: '#f8f4ef', minHeight: '100vh', paddingTop: 120 }} className="flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-6xl mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#c9a84c' }}>🍫</p>
          <h1 className="text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}>
            Product not found
          </h1>
          <Link href="/products">
            <button className="px-8 py-3 text-xs tracking-[0.2em] uppercase mt-4"
              style={{ background: '#1c0f08', color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif' }}>
              Back to Collection
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in "${product.name}" (₹${product.price.toFixed(0)}) from Chocolate Shopee, Nanded. Is it available?`
  )

  return (
    <div style={{ background: '#f8f4ef', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="pt-28 pb-6 px-6 lg:px-12"
        style={{ background: '#1c0f08', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-xs tracking-[0.15em] uppercase transition-colors hover:text-[#c9a84c]"
            style={{ color: 'rgba(248,244,239,0.5)', fontFamily: 'Jost, Inter, sans-serif' }}>
            Home
          </Link>
          <span style={{ color: 'rgba(248,244,239,0.25)' }}>—</span>
          <Link href="/products" className="text-xs tracking-[0.15em] uppercase transition-colors hover:text-[#c9a84c]"
            style={{ color: 'rgba(248,244,239,0.5)', fontFamily: 'Jost, Inter, sans-serif' }}>
            Collection
          </Link>
          <span style={{ color: 'rgba(248,244,239,0.25)' }}>—</span>
          <span className="text-xs tracking-[0.15em] uppercase"
            style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: '#ede5da' }}>
              {product.image && !imgError ? (
                <Image src={product.image} alt={product.name} fill className="object-cover"
                  onError={() => setImgError(true)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #3d1f0d 0%, #2a1509 100%)' }}>
                  <span className="text-8xl opacity-20">🍫</span>
                </div>
              )}
              {product.bestseller && (
                <div className="absolute top-4 left-4 px-3 py-1.5 text-xs tracking-[0.15em] uppercase"
                  style={{ background: '#c9a84c', color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 600 }}>
                  Best Seller
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            {product.category && (
              <span className="text-xs tracking-[0.3em] uppercase block mb-4"
                style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}>
                {product.category.name}
              </span>
            )}

            <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}>
                ₹{product.price.toFixed(0)}
              </span>
              <span className="text-xs tracking-[0.15em] uppercase px-3 py-1"
                style={{
                  background: product.inStock ? 'rgba(201,168,76,0.12)' : 'rgba(192,57,43,0.1)',
                  color: product.inStock ? '#c9a84c' : '#c0392b',
                  fontFamily: 'Jost, Inter, sans-serif',
                  border: `1px solid ${product.inStock ? 'rgba(201,168,76,0.3)' : 'rgba(192,57,43,0.3)'}`,
                }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-lg leading-relaxed mb-8"
              style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
              {product.description}
            </p>

            {/* WhatsApp Order */}
            <div className="mb-10">
              <a href={`https://wa.me/919158882111?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  disabled={!product.inStock}
                  className="w-full flex items-center justify-center gap-3 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300"
                  style={{
                    background: product.inStock ? '#25D366' : '#ccc',
                    color: '#fff', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500,
                    cursor: product.inStock ? 'pointer' : 'not-allowed',
                    border: 'none',
                  }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {product.inStock ? 'Order on WhatsApp' : 'Out of Stock'}
                </motion.button>
              </a>
            </div>

            {/* Details */}
            {product.details && (
              <div className="p-6 mb-8" style={{ border: '1px solid #e2d4c1', background: '#fffaf6' }}>
                <h3 className="text-xs tracking-[0.25em] uppercase mb-4"
                  style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}>
                  Details
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
                  {product.details}
                </p>
              </div>
            )}

            {/* Guarantees */}
            <div className="space-y-3">
              {[
                'Genuine branded product — 100% authentic',
                'Available in-store at Bhagya Nager T point, Nanded',
                'Perfect for gifting — gift wrap available',
                'Open daily until 10:00 PM for last-minute buys',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span style={{ color: '#c9a84c', marginTop: 2 }}>✦</span>
                  <span className="text-sm"
                    style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <Link href="/products"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#c9a84c]"
          style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Collection
        </Link>
      </div>
    </div>
  )
}
