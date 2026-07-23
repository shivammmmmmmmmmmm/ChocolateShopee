'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed'); return }
      router.push('/dashboard')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#1e1208',
    border: '1px solid rgba(201,168,76,0.2)',
    color: '#f8f4ef',
    fontFamily: 'Jost, Inter, sans-serif',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0e0905',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 28,
              color: '#c9a84c',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Chocolate
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'Jost, Inter, sans-serif',
              fontSize: 10,
              color: 'rgba(248,244,239,0.5)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              marginTop: -2,
            }}
          >
            Shopee · Admin
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#160c06',
            border: '1px solid rgba(201,168,76,0.2)',
            padding: '40px 36px',
          }}
        >
          {/* Gold top line */}
          <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)', marginBottom: 32 }} />

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 28,
              color: '#f8f4ef',
              fontWeight: 600,
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            Admin Portal
          </h1>
          <p
            style={{
              fontFamily: 'Jost, Inter, sans-serif',
              fontSize: 13,
              color: 'rgba(248,244,239,0.4)',
              textAlign: 'center',
              marginBottom: 32,
              fontWeight: 300,
            }}
          >
            Chocolate Shopee · Nanded · Authorised access only
          </p>

          {error && (
            <div
              style={{
                background: 'rgba(192,57,43,0.12)',
                border: '1px solid rgba(192,57,43,0.3)',
                padding: '12px 16px',
                marginBottom: 24,
                fontFamily: 'Jost, Inter, sans-serif',
                fontSize: 13,
                color: '#ef5350',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'Jost, Inter, sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,244,239,0.5)',
                  marginBottom: 8,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={loading}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'Jost, Inter, sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,244,239,0.5)',
                  marginBottom: 8,
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                style={inputStyle}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                width: '100%',
                padding: '14px 0',
                background: loading ? 'rgba(201,168,76,0.5)' : '#c9a84c',
                color: '#1c0f08',
                fontFamily: 'Jost, Inter, sans-serif',
                fontSize: 11,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 700,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </motion.button>
          </form>
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: 24,
            fontFamily: 'Jost, Inter, sans-serif',
            fontSize: 11,
            color: 'rgba(248,244,239,0.2)',
            letterSpacing: '0.1em',
          }}
        >
          Restricted access · Authorized personnel only
        </p>
      </motion.div>
    </div>
  )
}