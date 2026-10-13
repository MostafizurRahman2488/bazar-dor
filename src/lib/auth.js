
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing from .env.local");
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is missing from .env.local"
  );
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

const githubClientId =
  process.env.BETTER_AUTH_GITHUB_CLIENT_ID;

const githubClientSecret =
  process.env.BETTER_AUTH_GITHUB_SECRET;

const googleClientId =
  process.env.BETTER_AUTH_GOOGLE_CLIENT_ID;

const googleClientSecret =
  process.env.BETTER_AUTH_GOOGLE_SECRET;

export const auth = betterAuth({
  appName: "Bazar Dor",

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL,

  trustedOrigins: [
    baseURL,
    process.env.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean),

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    ...(githubClientId && githubClientSecret
      ? {
        github: {
          clientId: githubClientId,
          clientSecret: githubClientSecret,
        },
      }
      : {}),

    ...(googleClientId && googleClientSecret
      ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
      : {}),
  },


  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      allowDifferentEmails: false,
      requireLocalEmailVerified: false,
      disableImplicitLinking: false,
    },
  },
});

export { client, connectPromise };
