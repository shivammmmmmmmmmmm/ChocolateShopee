import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin account — credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin seed')
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.admin.upsert({
      where: { email: adminEmail },
      update: { password: hashedPassword },
      create: { email: adminEmail, password: hashedPassword },
    })
    console.log(`Admin account ensured for: ${adminEmail}`)
  }

  // Seed sample categories
  const categories = [
    { name: 'Dark Chocolate', description: 'Rich and intense dark chocolate bars' },
    { name: 'Milk Chocolate', description: 'Smooth and creamy milk chocolate' },
    { name: 'White Chocolate', description: 'Creamy white chocolate treats' },
    { name: 'Gift Hampers', description: 'Premium chocolate gift collections' },
    { name: 'Imported Brands', description: 'International chocolate brands' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    })
  }
  console.log('Sample categories seeded')

  // Seed sample products
  const sampleProducts = [
    {
      name: 'Cadbury Dairy Milk 200g',
      description: 'Classic Cadbury Dairy Milk chocolate bar',
      details: '200g bar, smooth and creamy milk chocolate',
      price: 120,
      categoryId: 'milk-chocolate',
      featured: true,
      bestseller: true,
      inStock: true,
    },
    {
      name: 'Ferrero Rocher 24 Pieces',
      description: 'Premium Italian chocolate hazelnut confection',
      details: '24 pieces in a gift box',
      price: 450,
      categoryId: 'gift-hampers',
      featured: true,
      bestseller: true,
      inStock: true,
    },
    {
      name: 'Lindt Excellence 70% Cocoa',
      description: 'Swiss dark chocolate with 70% cocoa',
      details: '100g bar, intense dark chocolate',
      price: 280,
      categoryId: 'dark-chocolate',
      featured: true,
      bestseller: false,
      inStock: true,
    },
  ]

  for (const product of sampleProducts) {
    const category = await prisma.category.findFirst({
      where: { name: product.categoryId },
    })

    if (category) {
      await prisma.product.create({
        data: {
          ...product,
          categoryId: category.id,
        },
      })
    }
  }
  console.log('Sample products seeded')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })