import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Check token exists first — gives clear error instead of cryptic crash
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN is not set')
      return NextResponse.json(
        { error: 'Image storage is not configured. Please contact the admin.' },
        { status: 503 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Use JPG, PNG, or WebP.' },
        { status: 400 }
      )
    }

    // Validate size — 5MB max
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
    const safeName = `products/img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const blob = await put(safeName, file, {
      access: 'public',
      contentType: file.type,
      token,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error: any) {
    console.error('Upload error:', error?.message || error)

    // Surface token/store errors clearly
    const msg = error?.message || ''
    if (msg.includes('token') || msg.includes('unauthorized') || msg.includes('401')) {
      return NextResponse.json(
        { error: 'Upload token invalid. Check BLOB_READ_WRITE_TOKEN in Vercel env vars.' },
        { status: 401 }
      )
    }
    if (msg.includes('store') || msg.includes('not found') || msg.includes('404')) {
      return NextResponse.json(
        { error: 'Blob store not found. Make sure the Blob store is connected to this project.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
