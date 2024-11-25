import { faker } from '@faker-js/faker';
import { genSaltSync, hashSync } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create user
  const passwordSalt = genSaltSync(10);
  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: hashSync('123456', passwordSalt),
    },
  });

  // Create monthly income for user
  await prisma.monthlyIncome.create({
    data: {
      income: 5000,
      user_id: user.id,
      distributions: {
        create: [
          { category: 'Rent', percentage: 30, amount: 1500 },
          { category: 'Food', percentage: 20, amount: 1000 },
        ],
      },
    },
  });

  // Create a spending limit for user
  await prisma.spendingLimit.create({
    data: {
      name: 'Hobbies',
      icon: '🎨',
      limit_value: 200,
      user_id: user.id,
    },
  });

  // Create a goal for user
  await prisma.goal.create({
    data: {
      name: 'New car',
      icon: '🚗',
      target_value: 20000,
      user_id: user.id,
      deadline: new Date('2030-12-31'),
    },
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
