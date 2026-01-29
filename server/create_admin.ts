import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'superadmin@example.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Ensure admin role exists
  let adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'admin',
        description: 'Super Administrator',
        permissions: JSON.stringify(['*']),
      },
    });
  }

  // Create or update admin user
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      roleId: adminRole.id,
    },
    create: {
      email,
      name: 'Super Admin',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log(`Admin user created/updated: ${user.email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
