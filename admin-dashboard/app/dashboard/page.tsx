'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: string; name: string; price: number; categoryId: string
  featured: boolean; bestseller: boolean; inStock: boolean
  image?: string; description: string; details?: string
}
interface Category { id: string; name: string; description?: string }
type Tab = 'overview' | 'products' | 'categories'

const inp: React.CSSProperties = {
  width: '100%', padding: '12px 14px', background: '#1e1208',
  border: '1px solid rgba(201,168,76,0.2)', color: '#f8f4ef',
  fontFamily: 'Jost, Inter, sans-serif', fontSize: 15, outline: 'none',
  WebkitAppearance: 'none', borderRadius: 0,
}
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
  color: 'rgba(248,244,239,0.5)', fontFamily: 'Jost, Inter, sans-serif', marginBottom: 6,
}
const goldBtn: React.CSSProperties = {
  background: '#c9a84c', color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif',
  fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
  cursor: 'pointer', border: 'none', borderRadius: 0,
}
const ghostBtn: React.CSSProperties = {
  background: 'none', border: '1px solid rgba(248,244,239,0.15)', color: 'rgba(248,244,239,0.6)',
  fontFamily: 'Jost, Inter, sans-serif', fontSize: 12, cursor: 'pointer', borderRadius: 0,
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState({
    name: '', description: '', details: '', price: '',
    categoryId: '', image: '', featured: false, bestseller: false, inStock: true,
  })
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const [showCatForm, setShowCatForm] = useState(false)
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [catForm, setCatForm] = useState({ name: '', description: '' })
  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/me').then(r => { if (!r.ok) router.push('/login') }).catch(() => router.push('/login'))
    fetchAll()
  }, [router])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [pRes, cRes] = await Promise.all([fetch('/api/products'), fetch('/api/categories')])
      const [p, c] = await Promise.all([pRes.json(), cRes.json()])
      setProducts(Array.isArray(p) ? p : [])
      setCategories(Array.isArray(c) ? c : [])
    } finally { setLoading(false) }
  }

  const notify = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3500) }

  const handleImageFile = async (file: File) => {
    if (!file) return
    const valid = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!valid.includes(file.type)) { notify('Invalid type. Use JPG, PNG, or WebP.'); return }
    if (file.size > 5 * 1024 * 1024) { notify('File too large. Max 5MB.'); return }
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) { setProductForm(f => ({ ...f, image: data.url })); notify('✓ Image uploaded!') }
      else { notify('✗ ' + (data.error || 'Upload failed')) }
    } catch { notify('✗ Network error — upload failed') }
    finally { setUploading(false) }
  }

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleImageFile(file)
  }

  const openNewProduct = () => {
    setEditingProduct(null)
    setProductForm({ name: '', description: '', details: '', price: '', categoryId: categories[0]?.id || '', image: '', featured: false, bestseller: false, inStock: true })
    setImagePreview(''); setShowProductForm(true)
  }
  const openEditProduct = (p: Product) => {
    setEditingProduct(p)
    setProductForm({ name: p.name, description: p.description, details: p.details || '', price: String(p.price), categoryId: p.categoryId, image: p.image || '', featured: p.featured, bestseller: p.bestseller, inStock: p.inStock })
    setImagePreview(p.image || ''); setShowProductForm(true)
  }
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    try {
      const body = { ...productForm, price: parseFloat(productForm.price) }
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const res = await fetch(url, { method: editingProduct ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (res.ok) { setShowProductForm(false); await fetchAll(); notify(editingProduct ? '✓ Product updated' : '✓ Product created') }
      else { const d = await res.json(); notify(d.error || 'Error saving') }
    } finally { setSaving(false) }
  }
  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' }); await fetchAll(); notify('✓ Deleted')
  }
  const openNewCat = () => { setEditingCat(null); setCatForm({ name: '', description: '' }); setShowCatForm(true) }
  const openEditCat = (c: Category) => { setEditingCat(c); setCatForm({ name: c.name, description: c.description || '' }); setShowCatForm(true) }
  const saveCat = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingCat ? `/api/categories/${editingCat.id}` : '/api/categories'
    const res = await fetch(url, { method: editingCat ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(catForm) })
    if (res.ok) { setShowCatForm(false); await fetchAll(); notify(editingCat ? '✓ Updated' : '✓ Created') }
    else notify('Error saving category')
  }
  const deleteCat = async (id: string) => {
    if (!confirm('Delete this category?')) return
    await fetch(`/api/categories/${id}`, { method: 'DELETE' }); await fetchAll(); notify('✓ Deleted')
  }
  const handleLogout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/login') }

  const tabItems: { key: Tab; icon: string; label: string }[] = [
    { key: 'overview', icon: '📊', label: 'Overview' },
    { key: 'products', icon: '🍫', label: 'Products' },
    { key: 'categories', icon: '🗂', label: 'Categories' },
  ]

  return (
    <div style={{ background: '#0e0905', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TOP BAR */}
      <header style={{ background: '#160c06', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '0 16px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, color: '#c9a84c', fontWeight: 600, whiteSpace: 'nowrap' }}>
          Chocolate Shopee <span style={{ fontFamily: 'Jost', fontSize: 9, color: 'rgba(248,244,239,0.3)', letterSpacing: '0.25em', marginLeft: 6 }}>ADMIN</span>
        </span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={handleLogout} style={{ ...ghostBtn, padding: '7px 12px', fontSize: 11 }}>Logout</button>
        </div>
      </header>

      {/* LAYOUT */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Desktop Sidebar */}
        <nav className="admin-sidebar" style={{ width: 180, background: '#130a05', borderRight: '1px solid rgba(201,168,76,0.1)', padding: '20px 0', flexShrink: 0 }}>
          {tabItems.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '13px 18px',
                fontFamily: 'Jost', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: tab === t.key ? '#c9a84c' : 'rgba(248,244,239,0.45)',
                background: tab === t.key ? 'rgba(201,168,76,0.08)' : 'transparent',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                borderLeft: tab === t.key ? '2px solid #c9a84c' : '2px solid transparent',
                cursor: 'pointer',
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>

        {/* Main scroll area */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 100px', minWidth: 0 }}>
          {/* Toast */}
          <AnimatePresence>
            {msg && (
              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ position: 'fixed', top: 64, left: '50%', transform: 'translateX(-50%)', background: '#c9a84c', color: '#1c0f08', padding: '11px 20px', fontFamily: 'Jost', fontSize: 13, fontWeight: 700, zIndex: 400, whiteSpace: 'nowrap', maxWidth: '90vw' }}>
                {msg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: '#f8f4ef', marginBottom: 20, fontWeight: 600 }}>Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                {[
                  { label: 'Products', value: products.length },
                  { label: 'Categories', value: categories.length },
                  { label: 'Featured', value: products.filter(p => p.featured).length },
                  { label: 'Best Sellers', value: products.filter(p => p.bestseller).length },
                  { label: 'In Stock', value: products.filter(p => p.inStock).length },
                  { label: 'Out of Stock', value: products.filter(p => !p.inStock).length },
                ].map(s => (
                  <div key={s.label} style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)', padding: '16px 12px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, color: '#c9a84c', fontWeight: 600, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'Jost', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.4)', marginTop: 5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)', padding: '16px' }}>
                <div style={{ fontFamily: 'Jost', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>Recent Products</div>
                {loading ? <div style={{ color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost', fontSize: 13 }}>Loading…</div> :
                  products.slice(0, 5).map((p, i) => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(201,168,76,0.07)' : 'none', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        {p.image && <img src={p.image} alt={p.name} style={{ width: 34, height: 34, objectFit: 'cover', flexShrink: 0 }} />}
                        <span style={{ color: '#f8f4ef', fontFamily: 'Jost', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                      </div>
                      <span style={{ color: '#c9a84c', fontFamily: "'Cormorant Garamond'", fontSize: 17, flexShrink: 0 }}>₹{p.price.toFixed(0)}</span>
                    </div>
                  ))
                }
              </div>
            </motion.div>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: '#f8f4ef', fontWeight: 600 }}>
                  Products <span style={{ fontFamily: 'Jost', fontSize: 12, color: 'rgba(248,244,239,0.3)', fontWeight: 400 }}>({products.length})</span>
                </h2>
                <button onClick={openNewProduct} style={{ ...goldBtn, padding: '11px 18px', whiteSpace: 'nowrap' }}>+ Add</button>
              </div>

              {/* PRODUCT FORM MODAL */}
              <AnimatePresence>
                {showProductForm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 0 }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowProductForm(false) }}>
                    <motion.div
                      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                      style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.25)', borderBottom: 'none', padding: '24px 20px', width: '100%', maxWidth: 640, maxHeight: '95vh', overflowY: 'auto', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                      <div style={{ width: 36, height: 4, background: 'rgba(201,168,76,0.3)', borderRadius: 2, margin: '0 auto 20px' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, color: '#f8f4ef', fontWeight: 600 }}>
                          {editingProduct ? 'Edit Product' : 'New Product'}
                        </h3>
                        <button onClick={() => setShowProductForm(false)} style={{ background: 'none', border: 'none', color: 'rgba(248,244,239,0.4)', fontSize: 22, cursor: 'pointer', padding: '4px 8px', lineHeight: 1 }}>✕</button>
                      </div>
                      <form onSubmit={saveProduct}>
                        <div style={{ marginBottom: 18 }}>
                          <label style={lbl}>Product Image</label>
                          <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleFilePick} style={{ display: 'none' }} />
                          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFilePick} style={{ display: 'none' }} />
                          <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => galleryInputRef.current?.click()}
                            style={{ border: '2px dashed rgba(201,168,76,0.3)', padding: '20px 12px', textAlign: 'center', cursor: 'pointer', background: 'rgba(201,168,76,0.03)', position: 'relative', marginBottom: 10 }}>
                            {imagePreview ? (
                              <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src={imagePreview} alt="Preview" style={{ maxHeight: 150, maxWidth: '100%', objectFit: 'contain' }} />
                                {uploading && (
                                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: '#c9a84c', fontFamily: 'Jost', fontSize: 12 }}>Uploading…</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <div style={{ fontSize: 28, marginBottom: 6 }}>🖼️</div>
                                <div style={{ fontFamily: 'Jost', fontSize: 13, color: 'rgba(248,244,239,0.5)' }}>Tap to choose from gallery</div>
                                <div style={{ fontFamily: 'Jost', fontSize: 11, color: 'rgba(248,244,239,0.3)', marginTop: 3 }}>JPG, PNG, WebP · Max 5MB</div>
                              </div>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button type="button" onClick={() => galleryInputRef.current?.click()} style={{ flex: 1, padding: '12px 8px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>📁 Gallery</button>
                            <button type="button" onClick={() => cameraInputRef.current?.click()} style={{ flex: 1, padding: '12px 8px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>📸 Camera</button>
                            {imagePreview && (
                              <button type="button" onClick={() => { setImagePreview(''); setProductForm(f => ({ ...f, image: '' })) }} style={{ padding: '12px 14px', background: 'none', border: '1px solid rgba(239,83,80,0.3)', color: '#ef5350', fontFamily: 'Jost', fontSize: 12, cursor: 'pointer' }}>✕</button>
                            )}
                          </div>
                          <input style={{ ...inp, fontSize: 13, marginTop: 8 }} placeholder="Or paste image URL…" value={productForm.image.startsWith('http') && !uploading ? productForm.image : ''} onChange={e => { setProductForm(f => ({ ...f, image: e.target.value })); setImagePreview(e.target.value) }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                          <div>
                            <label style={lbl}>Name *</label>
                            <input style={inp} value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} required placeholder="Cadbury Dairy Milk 200g" />
                          </div>
                          <div>
                            <label style={lbl}>Price (₹) *</label>
                            <input style={inp} type="number" step="0.01" min="0" inputMode="decimal" value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} required placeholder="0" />
                          </div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <label style={lbl}>Description *</label>
                          <input style={inp} value={productForm.description} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} required placeholder="Brief product description" />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <label style={lbl}>Details (optional)</label>
                          <textarea style={{ ...inp, height: 64, resize: 'vertical' } as React.CSSProperties} value={productForm.details} onChange={e => setProductForm(f => ({ ...f, details: e.target.value }))} placeholder="Weight, flavour, ingredients…" />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                          <label style={lbl}>Category *</label>
                          <select style={{ ...inp }} value={productForm.categoryId} onChange={e => setProductForm(f => ({ ...f, categoryId: e.target.value }))} required>
                            <option value="">Select category</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderTop: '1px solid rgba(201,168,76,0.1)', borderLeft: '1px solid rgba(201,168,76,0.1)' }}>
                          {[{ key: 'featured', label: '⭐ Featured' }, { key: 'bestseller', label: '🔥 Best Seller' }, { key: 'inStock', label: '✅ In Stock' }].map(opt => (
                            <label key={opt.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', fontFamily: 'Jost', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: (productForm as any)[opt.key] ? '#c9a84c' : 'rgba(248,244,239,0.4)', background: (productForm as any)[opt.key] ? 'rgba(201,168,76,0.1)' : 'transparent', padding: '12px 4px', borderRight: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center', transition: 'all 0.15s' }}>
                              <input type="checkbox" checked={(productForm as any)[opt.key]} onChange={e => setProductForm(f => ({ ...f, [opt.key]: e.target.checked }))} style={{ display: 'none' }} />
                              <span style={{ fontSize: 18 }}>{(productForm as any)[opt.key] ? '☑' : '☐'}</span>
                              <span>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button type="submit" disabled={saving || uploading} style={{ ...goldBtn, flex: 1, padding: '14px 0', fontSize: 13 }}>
                            {saving ? 'Saving…' : editingProduct ? 'Update' : 'Create Product'}
                          </button>
                          <button type="button" onClick={() => setShowProductForm(false)} style={{ ...ghostBtn, padding: '14px 18px' }}>Cancel</button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Products list */}
              {loading ? (
                <div style={{ color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost', padding: 20, textAlign: 'center' }}>Loading…</div>
              ) : (
                <div style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)' }}>
                  {products.length === 0 ? (
                    <div style={{ padding: 40, textAlign: 'center', color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost', fontSize: 14 }}>
                      No products yet.<br /><span style={{ color: '#c9a84c', cursor: 'pointer' }} onClick={openNewProduct}>+ Add your first product</span>
                    </div>
                  ) : products.map((p, i) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: i < products.length - 1 ? '1px solid rgba(201,168,76,0.07)' : 'none' }}>
                      <div style={{ width: 46, height: 46, flexShrink: 0, background: '#2a1509', overflow: 'hidden' }}>
                        {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🍫</div>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: '#f8f4ef', fontFamily: 'Jost', fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                        <div style={{ display: 'flex', gap: 5, marginTop: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ color: '#c9a84c', fontFamily: "'Cormorant Garamond'", fontSize: 16 }}>₹{p.price.toFixed(0)}</span>
                          {p.featured && <span style={{ fontSize: 9, padding: '1px 5px', background: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontFamily: 'Jost' }}>Featured</span>}
                          {p.bestseller && <span style={{ fontSize: 9, padding: '1px 5px', background: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontFamily: 'Jost' }}>Best</span>}
                          {!p.inStock && <span style={{ fontSize: 9, padding: '1px 5px', background: 'rgba(239,83,80,0.15)', color: '#ef5350', fontFamily: 'Jost' }}>Out</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button onClick={() => openEditProduct(p)} style={{ padding: '8px 14px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteProduct(p.id)} style={{ padding: '8px 14px', background: 'none', border: '1px solid rgba(239,83,80,0.3)', color: '#ef5350', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Del</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* CATEGORIES */}
          {tab === 'categories' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: '#f8f4ef', fontWeight: 600 }}>Categories</h2>
                <button onClick={openNewCat} style={{ ...goldBtn, padding: '11px 18px' }}>+ Add</button>
              </div>

              <AnimatePresence>
                {showCatForm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowCatForm(false) }}>
                    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                      style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.25)', borderBottom: 'none', padding: '24px 20px', width: '100%', maxWidth: 480, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                      <div style={{ width: 36, height: 4, background: 'rgba(201,168,76,0.3)', borderRadius: 2, margin: '0 auto 20px' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, color: '#f8f4ef', fontWeight: 600 }}>
                          {editingCat ? 'Edit Category' : 'New Category'}
                        </h3>
                        <button onClick={() => setShowCatForm(false)} style={{ background: 'none', border: 'none', color: 'rgba(248,244,239,0.4)', fontSize: 22, cursor: 'pointer', padding: '4px 8px' }}>✕</button>
                      </div>
                      <form onSubmit={saveCat}>
                        <div style={{ marginBottom: 12 }}>
                          <label style={lbl}>Name *</label>
                          <input style={inp} value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Dark Chocolate" />
                        </div>
                        <div style={{ marginBottom: 22 }}>
                          <label style={lbl}>Description</label>
                          <input style={inp} value={catForm.description} onChange={e => setCatForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional" />
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button type="submit" style={{ ...goldBtn, flex: 1, padding: '14px 0', fontSize: 13 }}>{editingCat ? 'Update' : 'Create'}</button>
                          <button type="button" onClick={() => setShowCatForm(false)} style={{ ...ghostBtn, padding: '14px 18px' }}>Cancel</button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ background: '#160c06', border: '1px solid rgba(201,168,76,0.15)' }}>
                {categories.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost', fontSize: 14 }}>
                    No categories yet.<br /><span style={{ color: '#c9a84c', cursor: 'pointer' }} onClick={openNewCat}>+ Add first category</span>
                  </div>
                ) : categories.map((c, i) => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', borderBottom: i < categories.length - 1 ? '1px solid rgba(201,168,76,0.07)' : 'none', gap: 10 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: '#f8f4ef', fontFamily: 'Jost', fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                      <div style={{ color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost', fontSize: 11, marginTop: 2 }}>
                        {products.filter(p => p.categoryId === c.id).length} products
                        {c.description && <span style={{ marginLeft: 8, color: 'rgba(248,244,239,0.2)' }}>· {c.description}</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <button onClick={() => openEditCat(c)} style={{ padding: '8px 14px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => deleteCat(c.id)} style={{ padding: '8px 14px', background: 'none', border: '1px solid rgba(239,83,80,0.3)', color: '#ef5350', fontFamily: 'Jost', fontSize: 11, cursor: 'pointer' }}>Del</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="admin-bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#130a05', borderTop: '1px solid rgba(201,168,76,0.2)', display: 'flex', zIndex: 100, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {tabItems.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              flex: 1, padding: '10px 4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: tab === t.key ? 'rgba(201,168,76,0.1)' : 'transparent',
              borderTop: tab === t.key ? '2px solid #c9a84c' : '2px solid transparent',
              borderRight: 'none', borderBottom: 'none', borderLeft: 'none',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ fontFamily: 'Jost', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: tab === t.key ? '#c9a84c' : 'rgba(248,244,239,0.4)' }}>{t.label}</span>
          </button>
        ))}
        <button onClick={handleLogout}
          style={{ flex: 1, padding: '10px 4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent', border: 'none', borderTop: '2px solid transparent', cursor: 'pointer' }}>
          <span style={{ fontSize: 20 }}>🚪</span>
          <span style={{ fontFamily: 'Jost', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.4)' }}>Logout</span>
        </button>
      </nav>

      {/* Responsive CSS */}
      <style>{`
        .admin-sidebar { display: none; }
        .admin-bottom-nav { display: flex; }
        main { padding-bottom: 80px !important; }
        @media (min-width: 768px) {
          .admin-sidebar { display: flex !important; flex-direction: column; }
          .admin-bottom-nav { display: none !important; }
          main { padding-bottom: 32px !important; }
        }
      `}</style>
    </div>
  )
}