'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import Image from 'next/image'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, getWhatsAppMessage } = useCart()

  const waLink = `https://wa.me/919158882111?text=${getWhatsAppMessage()}`

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md shadow-2xl"
            style={{ background: '#f8f4ef' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid #e2d4c1' }}
            >
              <div>
                <h2
                  className="text-xl font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
                >
                  Your Cart
                </h2>
                <span
                  className="text-xs"
                  style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif' }}
                >
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 transition-colors hover:opacity-60"
                style={{ color: '#1c0f08' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto px-6 py-4" style={{ maxHeight: 'calc(100vh - 200px)', background: '#f8f4ef' }}>
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-5xl block mb-4">🛒</span>
                  <p
                    className="text-base"
                    style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
                  >
                    Your cart is empty
                  </p>
                  <p
                    className="text-sm mt-2"
                    style={{ color: 'rgba(122,92,68,0.5)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
                  >
                    Add some chocolates to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 p-4"
                      style={{ background: '#fffaf6', border: '1px solid #e2d4c1' }}
                    >
                      {/* Image */}
                      <div
                        className="w-16 h-16 flex-shrink-0 overflow-hidden"
                        style={{ background: '#ede5da' }}
                      >
                        {item.image ? (
                          <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🍫</div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-sm font-medium truncate"
                          style={{ color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif' }}
                        >
                          {item.name}
                        </h4>
                        <p
                          className="text-sm mt-1"
                          style={{ color: '#c9a84c', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                        >
                          ₹{item.price.toFixed(0)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-sm transition-colors"
                            style={{ border: '1px solid #e2d4c1', color: '#7a5c44', background: '#f8f4ef' }}
                          >
                            −
                          </button>
                          <span
                            className="text-sm font-medium"
                            style={{ color: '#1c0f08', fontFamily: 'Jost, Inter, sans-serif' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-sm transition-colors"
                            style={{ border: '1px solid #e2d4c1', color: '#7a5c44', background: '#f8f4ef' }}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs transition-colors hover:text-red-500"
                            style={{ color: 'rgba(122,92,68,0.5)', fontFamily: 'Jost, Inter, sans-serif' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5"
                style={{ borderTop: '1px solid #e2d4c1', background: '#f8f4ef' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-sm uppercase tracking-[0.15em]"
                    style={{ color: '#7a5c44', fontFamily: 'Jost, Inter, sans-serif' }}
                  >
                    Total
                  </span>
                  <span
                    className="text-2xl font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#1c0f08' }}
                  >
                    ₹{totalPrice.toFixed(0)}
                  </span>
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3"
                    style={{ background: '#25D366', color: '#fff', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order on WhatsApp
                  </motion.button>
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}