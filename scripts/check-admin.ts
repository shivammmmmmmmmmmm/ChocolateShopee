import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function run() {
  // Print DB host only (no secrets)
  const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL || ''
  const match = url.match(/@([^/]+)/)
  console.log('DB host:', match ? match[1] : 'unknown')

  const admins = await prisma.admin.findMany()
  console.log('Total admin records:', admins.length)
  for (const a of admins) {
    console.log('  Email:', a.email)
    console.log('  Hash (first 20 chars):', a.password.slice(0, 20))
    const testOld = await bcryptjs.compare('CS@123', a.password)
    const testNew = await bcryptjs.compare('PramodK@12', a.password)
    console.log('  CS@123 matches:', testOld)
    console.log('  PramodK@12 matches:', testNew)
  }
}

run()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
