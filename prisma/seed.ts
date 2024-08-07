import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.deleteMany();

  await prisma.customer.createMany({
    data: [
      {
        name: 'Customer-1',
        cpf: '12345678901',
        email: 'customer-1@email.com',
        address: 'customer-1 address',
      },
      {
        name: 'Customer-2',
        cpf: '12345678902',
        email: 'customer-2@email.com',
        address: 'customer-2 address',
      },
      {
        name: 'Customer-3',
        cpf: '12345678903',
        email: 'customer-3@email.com',
        address: 'customer-3 address',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
