'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { useSearchParams } from 'next/navigation'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string | null
  category?: { id: string; name: string } | null
  categoryId: string
  featured?: boolean
  bestseller?: boolean
}

interface Category {
  id: string
  name: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ])
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()
        setProducts(Array.isArray(productsData) ? productsData : [])
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } catch {
        setProducts([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Update selected category when URL parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.categoryId === selectedCategory
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ background: '#f8f4ef', minHeight: '100vh' }}>
      {/* Page Header */}
      <div
        className="pt-40 pb-20 px-6 lg:px-12 text-center"
        style={{ background: '#1c0f08' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
        </motion.div>
      </div>

      {/* Filters */}
      <div
        className="sticky top-20 z-30 px-6 lg:px-12 py-5 border-b"
        style={{ background: 'rgba(248,244,239,0.95)', backdropFilter: 'blur(12px)', borderColor: '#e2d4c1' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                fontFamily: 'Jost, Inter, sans-serif',
                fontWeight: selectedCategory === 'all' ? 600 : 400,
                background: selectedCategory === 'all' ? '#1c0f08' : 'transparent',
                color: selectedCategory === 'all' ? '#f8f4ef' : '#7a5c44',
                border: '1px solid',
                borderColor: selectedCategory === 'all' ? '#1c0f08' : '#e2d4c1',
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  fontFamily: 'Jost, Inter, sans-serif',
                  fontWeight: selectedCategory === cat.id ? 600 : 400,
                  background: selectedCategory === cat.id ? '#1c0f08' : 'transparent',
                  color: selectedCategory === cat.id ? '#f8f4ef' : '#7a5c44',
                  border: '1px solid',
                  borderColor: selectedCategory === cat.id ? '#1c0f08' : '#e2d4c1',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search chocolates…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2.5 text-sm outline-none border"
              style={{
                borderColor: '#e2d4c1',
                color: '#1c0f08',
                background: 'white',
                fontFamily: 'Jost, Inter, sans-serif',
                fontWeight: 300,
                width: 220,
              }}
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7a5c44"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ height: 380, background: '#ede5da' }} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p
                  className="text-5xl mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#c9a84c' }}
                >
                  🍫
                </p>
                <p
                  className="text-xl mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
                >
                  No chocolates found
                </p>
                <p
                  className="text-sm"
                  style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
                >
                  Try a different category or search term
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
