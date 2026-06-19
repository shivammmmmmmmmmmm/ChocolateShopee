'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    // Only guard non-login admin pages
    if (pathname === '/admin/login') {
      setChecked(true)
      return
    }
    fetch('/api/admin/me')
      .then((r) => {
        if (!r.ok) router.push('/admin/login')
        else setChecked(true)
      })
      .catch(() => router.push('/admin/login'))
  }, [pathname, router])

  if (!checked) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0e0905',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontFamily: 'Jost, Inter, sans-serif', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>
          Loading…
        </div>
      </div>
    )
  }

  return <>{children}</>
}
