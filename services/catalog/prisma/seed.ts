import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { code: 'p1', name: 'T-Shirt', price: 199000 },
        { code: 'p2', name: 'Jeans',   price: 399000 },
      ],
    });
  }
}

main().finally(() => prisma.$disconnect());
