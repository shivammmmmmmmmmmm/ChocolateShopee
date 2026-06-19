'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AdminNav() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <nav className="w-64 bg-primary text-primary-foreground p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm opacity-75">Chocolate Shopee</p>
      </div>

      <div className="space-y-2 flex-grow">
        <Link
          href="/admin/dashboard"
          className="block px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/dashboard"
          className="block px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
        >
          Products
        </Link>
        <Link
          href="/admin/dashboard"
          className="block px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
        >
          Categories
        </Link>
      </div>

      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full"
      >
        Logout
      </Button>
    </nav>
  )
}
