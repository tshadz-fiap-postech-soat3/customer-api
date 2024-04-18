import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.customer.deleteMany();

    await prisma.customer.createMany({
        data: [
            {
                id: 'cust-1',
                name: 'Customer-1',
                cpf: '12345678901'
            },
            {
                id: 'cust-2',
                name: 'Customer-2',
                cpf: '12345678902'
            },
            {
                id: 'cust-3',
                name: 'Customer-3',
                cpf: '12345678903'
            },
        ]
    });
}

main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e)=> {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
