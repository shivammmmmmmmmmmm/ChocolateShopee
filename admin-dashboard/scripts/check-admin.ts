import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkAdmin() {
  const admins = await prisma.admin.findMany()
  
  console.log('Total admin records:', admins.length)
  
  for (const a of admins) {
    console.log('  Email:', a.email)
    console.log('  Created:', a.createdAt)
    console.log('  Updated:', a.updatedAt)
  }
  
  await prisma.$disconnect()
}

checkAdmin()