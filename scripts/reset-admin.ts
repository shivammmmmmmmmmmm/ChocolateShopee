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

  console.log(`🔐  Resetting admin credentials for: ${email}`)

  const hashedPassword = await bcryptjs.hash(password, 12)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword },
  })

  console.log(`✅  Admin account updated successfully.`)
  console.log(`    ID    : ${admin.id}`)
  console.log(`    Email : ${admin.email}`)
  console.log(`    Use the password from your ADMIN_PASSWORD env variable to log in.`)
}

resetAdmin()
  .catch((e) => {
    console.error('❌  Error resetting admin:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
