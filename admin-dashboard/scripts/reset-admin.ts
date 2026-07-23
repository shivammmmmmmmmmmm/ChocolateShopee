import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.')
    process.exit(1)
  }

  console.log('Resetting admin credentials...')
  console.log('Database URL:', process.env.DATABASE_URL)
  console.log(`Admin email: ${email}`)

  const hashedPassword = await bcrypt.hash(password, 10)
  
  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword },
  })

  // Verify the hash works
  const verified = await bcrypt.compare(password, admin.password)
  if (!verified) {
    console.error('Password verification failed!')
    process.exit(1)
  }

  console.log('Admin account updated successfully!')
  console.log(`  ID: ${admin.id}`)
  console.log(`  Email: ${admin.email}`)
  console.log(`  Password hash verified: ${verified}`)
}

resetAdmin()
  .catch((e) => {
    console.error('Error resetting admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })