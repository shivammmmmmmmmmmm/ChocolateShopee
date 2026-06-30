import { prisma } from '@/lib/db'
import { verifyPassword, hashPassword } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_EMAIL = 'chocolateshopee@gmail.com'
const ADMIN_PASSWORD_PLAIN = 'CS@123'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Only allow the specific admin email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if admin exists
    let admin = await prisma.admin.findUnique({
      where: { email },
    })

    // If no admin exists, create one with the predefined password
    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          email,
          password: await hashPassword(ADMIN_PASSWORD_PLAIN),
        },
      })
    }

    // Verify password against the stored hash
    const isValid = await verifyPassword(password, admin.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email },
    })
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
