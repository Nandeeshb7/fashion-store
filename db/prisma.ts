import { PrismaClient } from '@/generated/prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Instantiates the Prisma adapter using the Neon connection string to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon({ connectionString });

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product: { price: { toString: () => string } }) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product: { rating: { toString: () => string } }) {
          return product.rating.toString();
        },
      },
    },
  },
});
