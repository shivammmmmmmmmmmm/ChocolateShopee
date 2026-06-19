import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create categories
  const darkChocolate = await prisma.category.upsert({
    where: { name: 'Dark Chocolate' },
    update: {},
    create: { name: 'Dark Chocolate' }
  })

  const milkChocolate = await prisma.category.upsert({
    where: { name: 'Milk Chocolate' },
    update: {},
    create: { name: 'Milk Chocolate' }
  })

  const specialty = await prisma.category.upsert({
    where: { name: 'Specialty' },
    update: {},
    create: { name: 'Specialty' }
  })

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
      categoryId: darkChocolate.id,
      featured: true,
      inStock: true
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
      categoryId: milkChocolate.id,
      featured: true,
      inStock: true
    }
  })

  await prisma.product.upsert({
    where: { name: 'Raspberry Truffle' },
    update: {},
    create: {
      name: 'Raspberry Truffle',
      description: 'Dark chocolate truffle filled with tart raspberry ganache',
      details: 'Handmade truffle with real raspberry puree. Box of 4.\nTasting notes: Dark chocolate shell, bright raspberry center\nPerfect for: Special occasions, gifts',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
      categoryId: specialty.id,
      featured: true,
      inStock: true
    }
  })

  await prisma.product.upsert({
    where: { name: 'Sea Salt Caramel' },
    update: {},
    create: {
      name: 'Sea Salt Caramel',
      description: 'Sweet caramel infused with sea salt crystals, wrapped in dark chocolate',
      details: 'Artisanal caramel with Maldon sea salt. Box of 6.\nTasting notes: Sweet, salty, luxurious\nPerfect for: Caramel and chocolate lovers',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1599599810404-eb0a0ad3629f?w=500&h=500&fit=crop',
      categoryId: specialty.id,
      featured: true,
      inStock: true
    }
  })

  await prisma.product.upsert({
    where: { name: 'Espresso Dark Chocolate' },
    update: {},
    create: {
      name: 'Espresso Dark Chocolate',
      description: 'Premium dark chocolate infused with single-origin espresso beans',
      details: 'Fair-trade dark chocolate with Ethiopian espresso. 100g bar.\nTasting notes: Rich coffee, dark chocolate depth\nPerfect for: Coffee and chocolate enthusiasts',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1599599810232-b0550ba96a95?w=500&h=500&fit=crop',
      categoryId: darkChocolate.id,
      featured: false,
      inStock: true
    }
  })

  await prisma.product.upsert({
    where: { name: 'Lavender Milk Chocolate' },
    update: {},
    create: {
      name: 'Lavender Milk Chocolate',
      description: 'Delicate milk chocolate with fragrant lavender flavor',
      details: 'Smooth milk chocolate with dried Provençal lavender. 100g bar.\nTasting notes: Floral, creamy, subtle\nPerfect for: Those seeking floral and flavorful experiences',
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1599599810344-d26e20d12d35?w=500&h=500&fit=crop',
      categoryId: milkChocolate.id,
      featured: false,
      inStock: true
    }
  })

  // Create default admin account
  const hashedPassword = await bcryptjs.hash('admin123', 10)
  
  await prisma.admin.upsert({
    where: { email: 'admin@luxe.com' },
    update: {},
    create: {
      email: 'admin@luxe.com',
      password: hashedPassword
    }
  })

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
