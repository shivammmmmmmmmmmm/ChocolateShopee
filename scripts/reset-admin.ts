/**
 * reset-admin.ts
 * Upserts the admin user in the database using ADMIN_EMAIL and ADMIN_PASSWORD
 * from environment variables. Run with: npm run reset-admin
 */
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function resetAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('❌  ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.')
    process.exit(1)
  }

  // Print DB host only — never print secrets
  const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL || ''
  const match = url.match(/@([^/]+)/)
  console.log('🗄️   Database host:', match ? match[1] : 'unknown')
  console.log(`🔐  Resetting admin credentials for: ${email}`)

  const hashedPassword = await bcryptjs.hash(password, 12)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword },
  })

  // Verify the hash works
  const verified = await bcryptjs.compare(password, admin.password)
  if (!verified) {
    console.error('❌  Hash verification failed after update.')
    process.exit(1)
  }

  console.log(`✅  Admin account updated and verified.`)
  console.log(`    ID    : ${admin.id}`)
  console.log(`    Email : ${admin.email}`)
}

resetAdmin()
  .catch((e) => {
    console.error('❌  Error resetting admin:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
