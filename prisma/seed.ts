import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database started...');

  
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.rentalRequest.deleteMany();
  await prisma.property.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  
  const saltRounds = 10;
  const adminPassword = await bcrypt.hash('admin123', saltRounds);
  const landlordPassword = await bcrypt.hash('landlord123', saltRounds);
  const tenantPassword = await bcrypt.hash('tenant123', saltRounds);

 
  console.log('👤 Creating default users...');
  
  const admin = await prisma.user.create({
    data: {
      name: 'Main Admin',
      email: 'admin@rentnest.com',
      password: adminPassword,
      role: 'ADMIN', 
    },
  });

  const landlord = await prisma.user.create({
    data: {
      name: 'John Landlord',
      email: 'landlord@rentnest.com',
      password: landlordPassword,
      role: 'OWNER',
    },
  });

  const tenant = await prisma.user.create({
    data: {
      name: 'Alex Tenant',
      email: 'tenant@rentnest.com',
      password: tenantPassword,
      role: 'USER',
    },
  });

  
  console.log('🗂️ Creating property categories...');
  
  const apartment = await prisma.category.create({
    data: { name: 'Apartment', slug: 'apartment', description: 'Modern residential apartments' },
  });

  const house = await prisma.category.create({
    data: { name: 'Family House', slug: 'family-house', description: 'Spacious independent houses' },
  });

  const studio = await prisma.category.create({
    data: { name: 'Studio Room', slug: 'studio-room', description: 'Compact studio rooms for bachelors' },
  });

  
  console.log('🏠 Creating a sample property listing...');
  
  await prisma.property.create({
    data: {
      title: 'Luxury 3BR Apartment in City Center',
      description: 'Fully furnished luxury apartment with 3 bedrooms, 2 bathrooms, and a beautiful balcony view.',
      price: 1200.00,
      location: 'Dhaka, Bangladesh',
      isAvailable: true,
      ownerId: landlord.id,
      categoryId: apartment.id,
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log('--------------------------------------------------');
  console.log('👉 Admin Login Details:');
  console.log(`   Email: ${admin.email}`);
  console.log('   Password: admin123');
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });