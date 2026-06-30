'use client'

import { Suspense } from 'react'
import { ProductsClient } from './ProductsClient'

export default function ProductsPage() {
  return (
    <div style={{ background: '#f8f4ef', minHeight: '100vh' }}>
      {/* Page Header */}
      <div
        className="pt-40 pb-20 px-6 lg:px-12 text-center"
        style={{ background: '#1c0f08' }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif' }}
          >
            Artisanal Selection
          </span>
          <div style={{ width: 40, height: 1, background: '#c9a84c' }} />
        </div>
        <h1
          className="text-6xl md:text-7xl font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f8f4ef' }}
        >
          Our <em>Collection</em>
        </h1>
        <p
          className="text-lg mt-4 max-w-xl mx-auto"
          style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
        >
          Explore our complete range of handcrafted luxury chocolates
        </p>
      </div>

      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ height: 380, background: '#ede5da' }} />
            ))}
          </div>
        </div>
      }>
        <ProductsClient />
      </Suspense>
    </div>
  )
}
