import '@testing-library/jest-dom';
import { PrismaClient } from '@prisma/client';

// TODO: Use this to run integration tests
// import 'whatwg-fetch';
// import { execSync } from 'child_process';
// import { loadEnvConfig } from '@next/env';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

jest.mock('@prisma/client', () => {
  const prismaFunctionMocks = {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mPrismaClient = {
    goal: prismaFunctionMocks,
    spendingLimit: prismaFunctionMocks,
    incomeDistribution: prismaFunctionMocks,
    monthlyIncome: prismaFunctionMocks,
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

export const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>;

// TODO: Use this to run integration tests
// export default async (): Promise<void> => {
//   const projectDir = process.cwd();
//   loadEnvConfig(projectDir);

//   try {
//     console.info('Starting test environment set up...');
//     console.info('Docker container starting...');
//     execSync('docker-compose up -d', { stdio: 'inherit' });
//     console.info('Docker container is up.');

//     console.info('Running migrations...');
//     execSync('pnpm dlx prisma migrate deploy', { stdio: 'inherit' });
//     console.info('Migrations complete.');

//     console.info('Seed data...');
//     execSync(
//       'pnpm dlx ts-node --compiler-options \'{"module":"CommonJS"}\' prisma/seed.ts',
//       { stdio: 'inherit' },
//     );

//     console.info('Test environment set up complete.');
//   } catch (error) {
//     console.error('Test environment set up error:', error);
//     throw error;
//   }
// };
