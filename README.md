# Project Setup and Installation Guide

## Prerequisites
- **Alpha Vantage API Key** (you can get yours for free here: https://www.alphavantage.co/support/#api-key)
- **Node.js** (version 18.x or later)
- **Docker** (to run Postgres)
- **Git** (to clone the repository)
- **PnpM** (package manager)
> You can use `yarn` and `npm` too, but the project package manager is set to`pnpm`

## 1️⃣ Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/my-finance-manager.git
cd my-finance-manager
```

## 2️⃣ Step 2: Install Dependencies
```bash
pnpm install
```
> Alt.: `yarn install` | `npm install`

## 3️⃣ Step 3: Set Up Docker with Postgres

1. Ensure Docker is installed and running on your machine.
2. Run the following command to start the Postgres container:

```bash
docker-compose up -d
```

This will pull the Postgres image (if not already available) and set up a new Postgres database inside a Docker container.
This happens because there is a  `docker-compose.yml` file in the root folder.

## 4️⃣ Step 4: Set Up Environment Variables

1. Create a `.env` file in the root of your project. Add the following environment variables to connect to the database:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/finance_manager
FINANCE_MARKET_API_KEY=<ADD ALPHA VANTAGE API KEY HERE>
```

## 5️⃣ Step 5: Database Migration (using Prisma)

The project uses Prisma as the ORM to manage database migrations.
1. Run the following command to initialize the database and apply any migrations:

```bash
pnpm dlx prisma migrate dev
```
> Alt.: `npx prisma migrate dev`

This will apply the migrations and generate the Prisma Client for your project.
1. Optionally, if you want to explore the database using Prisma Studio, you can run:

```bash
pnpm dlx prisma studio
```
> Alt.: `npx prisma studio`

## 6️⃣ Step 6: Running the Application Locally

Now, you’re ready to run the project. You can start the Next.js app by running:

```bash
pnpm dev
```
> Alt.: `yarn dev` | `npm run dev`

This will start the development server, and you can access the application by navigating to http://localhost:3000.

## 7️⃣ Step 7: Stopping the Postgres Container

When you're done, you can stop the Postgres container by running:

```bash
docker-compose down
```

This will stop and remove the running container, but the database data will persist because it is stored in the db-data Docker volume.
