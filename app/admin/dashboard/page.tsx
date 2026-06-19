'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  categoryId: string
  featured: boolean
  bestseller: boolean
  inStock: boolean
  image?: string
  description: string
  details?: string
}

interface Category {
  id: string
  name: string
  description?: string
}

type Tab = 'overview' | 'products' | 'categories'

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#1e1208', border: '1px solid rgba(201,168,76,0.2)',
  color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif', fontSize: 14, outline: 'none',
}
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'rgba(248,244,239,0.5)',
  fontFamily: 'Jost, Inter, sans-serif', marginBottom: 6,
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Product form
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState({
    name: '', description: '', details: '', price: '',
    categoryId: '', image: '', featured: false, bestseller: false, inStock: true,
  })
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Category form
  const [showCatForm, setShowCatForm] = useState(false)
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [catForm, setCatForm] = useState({ name: '', description: '' })

  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/me').then(r => { if (!r.ok) router.push('/admin/login') }).catch(() => router.push('/admin/login'))
    fetchAll()
  }, [router])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [pRes, cRes] = await Promise.all([fetch('/api/products'), fetch('/api/categories')])
      const [p, c] = await Promise.all([pRes.json(), cRes.json()])
      setProducts(Array.isArray(p) ? p : [])
      setCategories(Array.isArray(c) ? c : [])
    } finally {
      setLoading(false)
    }
  }

  const notify = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3500) }

  // Image upload handler
  const handleImageFile = async (file: File) => {
    if (!file) return
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) { notify('Invalid file type. Use JPG, PNG, or WebP.'); return }
    if (file.size > 5 * 1024 * 1024) { notify('File too large. Max 5MB.'); return }

    // Show local preview immediately
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)

    // Upload to server
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        setProductForm(f => ({ ...f, image: data.url }))
        notify('Image uploaded!')
      } else {
        notify(data.error || 'Upload failed')
      }
    } catch {
      notify('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleImageFile(file)
  }

  // Products CRUD
  const openNewProduct = () => {
    setEditingProduct(null)
    setProductForm({ name: '', description: '', details: '', price: '', categoryId: categories[0]?.id || '', image: '', featured: false, bestseller: false, inStock: true })
    setImagePreview('')
    setShowProductForm(true)
  }

  const openEditProduct = (p: Product) => {
    setEditingProduct(p)
    setProductForm({ name: p.name, description: p.description, details: p.details || '', price: String(p.price), categoryId: p.categoryId, image: p.image || '', featured: p.featured, bestseller: p.bestseller, inStock: p.inStock })
    setImagePreview(p.image || '')
    setShowProductForm(true)
  }

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const body = { ...productForm, price: parseFloat(productForm.price) }
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (res.ok) {
        setShowProductForm(false)
        await fetchAll()
        notify(editingProduct ? '✓ Product updated' : '✓ Product created')
      } else {
        const d = await res.json()
        notify(d.error || 'Error saving product')
      }
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    await fetchAll()
    notify('✓ Product deleted')
  }

  // Categories CRUD
  const openNewCat = () => { setEditingCat(null); setCatForm({ name: '', description: '' }); setShowCatForm(true) }
  const openEditCat = (c: Category) => { setEditingCat(c); setCatForm({ name: c.name, description: c.description || '' }); setShowCatForm(true) }

  const saveCat = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingCat ? `/api/categories/${editingCat.id}` : '/api/categories'
    const method = editingCat ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(catForm) })
    if (res.ok) { setShowCatForm(false); await fetchAll(); notify(editingCat ? '✓ Category updated' : '✓ Category created') }
    else notify('Error saving category')
  }

  const deleteCat = async (id: string) => {
    if (!confirm('Delete this category?')) return
    await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    await fetchAll()
    notify('✓ Category deleted')
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{ background: '#0e0905', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <header style={{ background: '#160c06', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: '#c9a84c', fontWeight: 600 }}>
          Chocolate Shopee <span style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 11, color: 'rgba(248,244,239,0.35)', letterSpacing: '0.2em', marginLeft: 8 }}>ADMIN</span>
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/" target="_blank" style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.4)', textDecoration: 'none' }}>View Site ↗</a>
          <button onClick={handleLogout} style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.5)', background: 'none', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: '1px solid rgba(248,244,239,0.15)', paddingLeft: 12, cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <nav style={{ width: 200, background: '#130a05', borderRight: '1px solid rgba(201,168,76,0.1)', padding: '24px 0', flexShrink: 0 }}>
          {(['overview', 'products', 'categories'] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '12px 20px',
                fontFamily: 'Jost, Inter, sans-serif', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: tab === t ? '#c9a84c' : 'rgba(248,244,239,0.45)',
                background: tab === t ? 'rgba(201,168,76,0.08)' : 'transparent',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                borderLeft: tab === t ? '2px solid #c9a84c' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              {t === 'overview' ? '📊 Overview' : t === 'products' ? '🍫 Products' : '🗂 Categories'}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '32px 28px', overflow: 'auto' }}>

          {/* Toast */}
          <AnimatePresence>
            {msg && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ position: 'fixed', top: 70, right: 20, background: '#c9a84c', color: '#1c0f08', padding: '12px 20px', fontFamily: 'Jost, Inter, sans-serif', fontSize: 13, fontWeight: 700, zIndex: 300, borderRadius: 2 }}>
                {msg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, color: '#f8f4ef', marginBottom: 24, fontWeight: 600 }}>Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
                {[
                  { label: 'Total Products', value: products.length },
                  { label: 'Categories', value: categories.length },
                  { label: 'Featured', value: products.filter(p => p.featured).length },
                  { label: 'Best Sellers', value: products.filter(p => p.bestseller).length },
                  { label: 'In Stock', value: products.filter(p => p.inStock).length },
                  { label: 'Out of Stock', value: products.filter(p => !p.inStock).length },
                ].map((s) => (
                  <div key={s.label} style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)', padding: '20px 16px' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, color: '#c9a84c', fontWeight: 600, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.4)', marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)', padding: 20 }}>
                <div style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>Recent Products</div>
                {products.slice(0, 6).map((p, i) => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 5 ? '1px solid rgba(201,168,76,0.07)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {p.image && <img src={p.image} alt={p.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 2 }} />}
                      <span style={{ color: '#f8f4ef', fontFamily: 'Jost, Inter, sans-serif', fontSize: 13 }}>{p.name}</span>
                    </div>
                    <span style={{ color: '#c9a84c', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18 }}>₹{p.price.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === 'products' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, color: '#f8f4ef', fontWeight: 600 }}>
                  Products <span style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 13, color: 'rgba(248,244,239,0.3)', fontWeight: 400 }}>({products.length})</span>
                </h2>
                <button onClick={openNewProduct}
                  style={{ background: '#c9a84c', color: '#1c0f08', padding: '10px 20px', fontFamily: 'Jost, Inter, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none' }}>
                  + Add Product
                </button>
              </div>

              {/* Product Form Modal */}
              <AnimatePresence>
                {showProductForm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowProductForm(false) }}
                  >
                    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                      style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.25)', padding: 28, width: '100%', maxWidth: 640, maxHeight: '92vh', overflow: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: '#f8f4ef', fontWeight: 600 }}>
                          {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <button onClick={() => setShowProductForm(false)} style={{ background: 'none', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none', color: 'rgba(248,244,239,0.4)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>✕</button>
                      </div>

                      <form onSubmit={saveProduct}>
                        {/* Image Upload */}
                        <div style={{ marginBottom: 16 }}>
                          <label style={lbl}>Product Image</label>
                          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFilePick} style={{ display: 'none' }} />

                          {/* Drop zone */}
                          <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                              border: '2px dashed rgba(201,168,76,0.3)', padding: 20, textAlign: 'center',
                              cursor: 'pointer', background: 'rgba(201,168,76,0.03)', position: 'relative', transition: 'border-color 0.2s',
                            }}
                          >
                            {imagePreview ? (
                              <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src={imagePreview} alt="Preview" style={{ maxHeight: 160, maxWidth: '100%', objectFit: 'contain' }} />
                                {uploading && (
                                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: '#c9a84c', fontFamily: 'Jost', fontSize: 12 }}>Uploading…</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                                <div style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 13, color: 'rgba(248,244,239,0.5)' }}>
                                  Tap to choose photo or drag & drop
                                </div>
                                <div style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 11, color: 'rgba(248,244,239,0.3)', marginTop: 4 }}>
                                  JPG, PNG, WebP · Max 5MB
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Buttons row */}
                          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            <button type="button" onClick={() => fileInputRef.current?.click()}
                              style={{ flex: 1, padding: '8px 0', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 11, letterSpacing: '0.15em', cursor: 'pointer' }}>
                              📁 Choose File
                            </button>
                            <button type="button" onClick={() => {
                              if (fileInputRef.current) { fileInputRef.current.setAttribute('capture', 'environment'); fileInputRef.current.click() }
                            }}
                              style={{ flex: 1, padding: '8px 0', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 11, letterSpacing: '0.15em', cursor: 'pointer' }}>
                              📸 Camera
                            </button>
                            {imagePreview && (
                              <button type="button" onClick={() => { setImagePreview(''); setProductForm(f => ({ ...f, image: '' })) }}
                                style={{ padding: '8px 12px', background: 'none', border: '1px solid rgba(239,83,80,0.3)', color: '#ef5350', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>
                                ✕ Remove
                              </button>
                            )}
                          </div>

                          {/* Or paste URL */}
                          <div style={{ marginTop: 8 }}>
                            <input style={{ ...inp, fontSize: 12 }} placeholder="Or paste image URL…" value={productForm.image.startsWith('/uploads/') ? '' : productForm.image}
                              onChange={e => { setProductForm(f => ({ ...f, image: e.target.value })); setImagePreview(e.target.value) }} />
                          </div>
                        </div>

                        {/* Name & Price */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                          <div>
                            <label style={lbl}>Product Name *</label>
                            <input style={inp} value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Cadbury Dairy Milk 200g" />
                          </div>
                          <div>
                            <label style={lbl}>Price (₹) *</label>
                            <input style={inp} type="number" step="0.01" min="0" value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} required placeholder="0.00" />
                          </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: 12 }}>
                          <label style={lbl}>Short Description *</label>
                          <input style={inp} value={productForm.description} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} required placeholder="Brief product description" />
                        </div>

                        {/* Details */}
                        <div style={{ marginBottom: 12 }}>
                          <label style={lbl}>Details (optional)</label>
                          <textarea style={{ ...inp, height: 70, resize: 'vertical' } as React.CSSProperties} value={productForm.details} onChange={e => setProductForm(f => ({ ...f, details: e.target.value }))} placeholder="Weight, flavour notes, ingredients…" />
                        </div>

                        {/* Category */}
                        <div style={{ marginBottom: 16 }}>
                          <label style={lbl}>Category *</label>
                          <select style={{ ...inp }} value={productForm.categoryId} onChange={e => setProductForm(f => ({ ...f, categoryId: e.target.value }))} required>
                            <option value="">Select category</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>

                        {/* Toggles */}
                        <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
                          {[
                            { key: 'featured', label: '⭐ Featured' },
                            { key: 'bestseller', label: '🔥 Best Seller' },
                            { key: 'inStock', label: '✅ In Stock' },
                          ].map(opt => (
                            <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'Jost, Inter, sans-serif', fontSize: 13, color: 'rgba(248,244,239,0.7)' }}>
                              <input type="checkbox" checked={(productForm as any)[opt.key]} onChange={e => setProductForm(f => ({ ...f, [opt.key]: e.target.checked }))}
                                style={{ width: 16, height: 16, accentColor: '#c9a84c' }} />
                              {opt.label}
                            </label>
                          ))}
                        </div>

                        <div style={{ display: 'flex', gap: 10 }}>
                          <button type="submit" disabled={saving || uploading}
                            style={{ flex: 1, background: saving ? 'rgba(201,168,76,0.5)' : '#c9a84c', color: '#1c0f08', padding: '13px 0', fontFamily: 'Jost, Inter, sans-serif', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none' }}>
                            {saving ? 'Saving…' : editingProduct ? 'Update Product' : 'Create Product'}
                          </button>
                          <button type="button" onClick={() => setShowProductForm(false)}
                            style={{ padding: '13px 20px', background: 'none', border: '1px solid rgba(248,244,239,0.15)', color: 'rgba(248,244,239,0.5)', fontFamily: 'Jost', fontSize: 12, cursor: 'pointer' }}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Products List */}
              {loading ? (
                <div style={{ color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost', padding: 20 }}>Loading…</div>
              ) : (
                <div style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)' }}>
                  {products.length === 0 ? (
                    <div style={{ padding: 48, textAlign: 'center', color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost' }}>
                      No products yet. Click <strong style={{ color: '#c9a84c' }}>+ Add Product</strong> to get started.
                    </div>
                  ) : products.map((p, i) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < products.length - 1 ? '1px solid rgba(201,168,76,0.07)' : 'none', flexWrap: 'wrap' }}>
                      {/* Thumbnail */}
                      <div style={{ width: 50, height: 50, flexShrink: 0, background: '#2a1509', overflow: 'hidden' }}>
                        {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🍫</div>}
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ color: '#f8f4ef', fontFamily: 'Jost', fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
                          {p.featured && <span style={{ fontSize: 10, padding: '1px 6px', background: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontFamily: 'Jost' }}>Featured</span>}
                          {p.bestseller && <span style={{ fontSize: 10, padding: '1px 6px', background: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontFamily: 'Jost' }}>Bestseller</span>}
                          {!p.inStock && <span style={{ fontSize: 10, padding: '1px 6px', background: 'rgba(239,83,80,0.15)', color: '#ef5350', fontFamily: 'Jost' }}>Out of Stock</span>}
                        </div>
                      </div>
                      <span style={{ color: '#c9a84c', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 600 }}>₹{p.price.toFixed(0)}</span>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => openEditProduct(p)} style={{ padding: '6px 14px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteProduct(p.id)} style={{ padding: '6px 14px', background: 'none', border: '1px solid rgba(239,83,80,0.3)', color: '#ef5350', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── CATEGORIES ── */}
          {tab === 'categories' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, color: '#f8f4ef', fontWeight: 600 }}>Categories</h2>
                <button onClick={openNewCat}
                  style={{ background: '#c9a84c', color: '#1c0f08', padding: '10px 20px', fontFamily: 'Jost', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none' }}>
                  + Add Category
                </button>
              </div>

              <AnimatePresence>
                {showCatForm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowCatForm(false) }}>
                    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                      style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.25)', padding: 28, width: '100%', maxWidth: 440 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: '#f8f4ef', fontWeight: 600 }}>
                          {editingCat ? 'Edit Category' : 'New Category'}
                        </h3>
                        <button onClick={() => setShowCatForm(false)} style={{ background: 'none', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none', color: 'rgba(248,244,239,0.4)', fontSize: 20, cursor: 'pointer' }}>✕</button>
                      </div>
                      <form onSubmit={saveCat}>
                        <div style={{ marginBottom: 14 }}>
                          <label style={lbl}>Category Name *</label>
                          <input style={inp} value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Dark Chocolate" />
                        </div>
                        <div style={{ marginBottom: 22 }}>
                          <label style={lbl}>Description</label>
                          <input style={inp} value={catForm.description} onChange={e => setCatForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description" />
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button type="submit" style={{ flex: 1, background: '#c9a84c', color: '#1c0f08', padding: '12px 0', fontFamily: 'Jost', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none' }}>
                            {editingCat ? 'Update' : 'Create'}
                          </button>
                          <button type="button" onClick={() => setShowCatForm(false)} style={{ padding: '12px 18px', background: 'none', border: '1px solid rgba(248,244,239,0.15)', color: 'rgba(248,244,239,0.5)', fontFamily: 'Jost', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)' }}>
                {categories.length === 0 ? (
                  <div style={{ padding: 48, textAlign: 'center', color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost' }}>
                    No categories yet. Add one to get started.
                  </div>
                ) : categories.map((c, i) => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < categories.length - 1 ? '1px solid rgba(201,168,76,0.07)' : 'none', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ color: '#f8f4ef', fontFamily: 'Jost', fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                      {c.description && <div style={{ color: 'rgba(248,244,239,0.35)', fontFamily: 'Jost', fontSize: 12, marginTop: 2 }}>{c.description}</div>}
                      <div style={{ color: 'rgba(248,244,239,0.25)', fontFamily: 'Jost', fontSize: 11, marginTop: 2 }}>
                        {products.filter(p => p.categoryId === c.id).length} products
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEditCat(c)} style={{ padding: '6px 14px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => deleteCat(c.id)} style={{ padding: '6px 14px', background: 'none', border: '1px solid rgba(239,83,80,0.3)', color: '#ef5350', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  )
}
