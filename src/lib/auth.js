// src/lib/auth.js
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing from .env.local");
}

const globalForMongo = globalThis;
const client =
  globalForMongo.mongoClient ?? new MongoClient(mongoUrl);

if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = client;
}

const connectPromise =
  globalForMongo.mongoConnectPromise ?? client.connect();

if (!globalForMongo.mongoConnectPromise) {
  globalForMongo.mongoConnectPromise = connectPromise;
}

const db = client.db(
  process.env.MONGODB_DATABASE || "bazar-dor"
);

const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is missing. Add a secure secret to .env.local."
  );
}


const googleConfigured = Boolean(
  process.env.BETTER_AUTH_GOOGLE_CLIENT_ID &&
  process.env.BETTER_AUTH_GOOGLE_SECRET
);

const githubConfigured = Boolean(
  process.env.BETTER_AUTH_GITHUB_CLIENT_ID &&
  process.env.BETTER_AUTH_GITHUB_SECRET
);

export const auth = betterAuth({
  appName: "Bazar Dor",
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,

  trustedOrigins: [
    baseURL,
    process.env.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean),

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    ...(googleConfigured && {
      google: {
        clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
      },
    }),

    ...(githubConfigured && {
      github: {
        clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET,
      },
    }),
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
});

export { client, connectPromise };