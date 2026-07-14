import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create categories matching the home page sections
  const categories = [
    { name: 'Chocolates' },
    { name: 'Imported Chocolates' },
    { name: 'Gift Hampers' },
    { name: 'Beverages' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    })
  }

  // Create sample products
  await prisma.product.upsert({
    where: { name: 'Pure Cocoa Dark Chocolate' },
    update: {},
    create: {
      name: 'Pure Cocoa Dark Chocolate',
      description: 'Rich 72% pure dark chocolate with intense cocoa flavors',
      details: 'Our signature dark chocolate blend. Made with premium Venezuelan cacao. 100g bar.\nTasting notes: Deep cocoa, subtle fruit undertones\nPerfect for: Chocolate connoisseurs',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64856?w=500&h=500&fit=crop',
      categoryId: (await prisma.category.findUnique({ where: { name: 'Chocolates' } }))!.id,
      featured: true,
      bestseller: true,
      inStock: true,
    }
  })

  await prisma.product.upsert({
    where: { name: 'Silky Milk Chocolate' },
    update: {},
    create: {
      name: 'Silky Milk Chocolate',
      description: 'Smooth 45% milk chocolate with a creamy melt-in-mouth texture',
      details: 'Classic milk chocolate with Belgian cocoa butter. 100g bar.\nTasting notes: Creamy, sweet, buttery\nPerfect for: Everyone, especially chocolate lovers',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1585071429691-6a34715db3f0?w=500&h=500&fit=crop',
      categoryId: (await prisma.category.findUnique({ where: { name: 'Chocolates' } }))!.id,
      featured: true,
      bestseller: true,
      inStock: true,
    }
  })

  await prisma.product.upsert({
    where: { name: 'Ferrero Rocher 24pc' },
    update: {},
    create: {
      name: 'Ferrero Rocher 24pc',
      description: 'Premium imported Italian chocolates with hazelnut filling',
      details: 'Imported from Italy. 24 pieces in elegant packaging.\nPerfect for: Gifting and special occasions',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&h=500&fit=crop',
      categoryId: (await prisma.category.findUnique({ where: { name: 'Imported Chocolates' } }))!.id,
      featured: true,
      bestseller: true,
      inStock: true,
    }
  })

  await prisma.product.upsert({
    where: { name: 'Lindt Swiss Chocolate Box' },
    update: {},
    create: {
      name: 'Lindt Swiss Chocolate Box',
      description: 'Assorted Swiss luxury chocolates from Lindt',
      details: 'Premium Swiss chocolate assortment. 200g box.\nTasting notes: Smooth, creamy, world-class quality',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=500&h=500&fit=crop',
      categoryId: (await prisma.category.findUnique({ where: { name: 'Imported Chocolates' } }))!.id,
      featured: true,
      inStock: true,
    }
  })

  await prisma.product.upsert({
    where: { name: 'Luxury Gift Hamper' },
    update: {},
    create: {
      name: 'Luxury Gift Hamper',
      description: 'Curated gift box with assorted premium chocolates & treats',
      details: 'Beautifully wrapped hamper with Ferrero, Lindt, Cadbury & more.\nPerfect for: Birthdays, anniversaries, Diwali, weddings',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&h=500&fit=crop',
      categoryId: (await prisma.category.findUnique({ where: { name: 'Gift Hampers' } }))!.id,
      featured: true,
      bestseller: true,
      inStock: true,
    }
  })

  await prisma.product.upsert({
    where: { name: 'Red Bull Energy Drink 4x250ml' },
    update: {},
    create: {
      name: 'Red Bull Energy Drink 4x250ml',
      description: 'Original Red Bull energy drink, pack of 4 cans',
      details: 'The world-famous energy drink. 4 cans of 250ml each.\nPerfect for: Energy boost, parties, refreshment',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1622484212046-77b2c0834fbb?w=500&h=500&fit=crop',
      categoryId: (await prisma.category.findUnique({ where: { name: 'Beverages' } }))!.id,
      featured: true,
      bestseller: true,
      inStock: true,
    }
  })

  await prisma.product.upsert({
    where: { name: 'Cadbury Celebrations Pack' },
    update: {},
    create: {
      name: 'Cadbury Celebrations Pack',
      description: 'Assorted Cadbury chocolates for every celebration',
      details: 'Festive pack with Dairy Milk, Silk, 5 Star, Gems & more. 450g.\nPerfect for: Festivals, gifting, parties',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?w=500&h=500&fit=crop',
      categoryId: (await prisma.category.findUnique({ where: { name: 'Chocolates' } }))!.id,
      featured: false,
      bestseller: true,
      inStock: true,
    }
  })

  // Create admin account — credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin seed')
  } else {
    const hashedPassword = await bcryptjs.hash(adminPassword, 10)
    await prisma.admin.upsert({
      where: { email: adminEmail },
      update: { password: hashedPassword },
      create: { email: adminEmail, password: hashedPassword },
    })
    console.log(`Admin account ensured for: ${adminEmail}`)
  }

  // Create homepage content
  await prisma.homepageContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heroTitle: 'Indulge in Luxury',
      heroSubtitle: 'Experience the finest handcrafted chocolates, meticulously created with premium ingredients and passion.'
    }
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })