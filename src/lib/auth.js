
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

// Reuse the connection promise during development.
const connectPromise =
  globalForMongo.mongoConnectPromise ??
  client.connect();

if (!globalForMongo.mongoConnectPromise) {
  globalForMongo.mongoConnectPromise = connectPromise;
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  database: mongodbAdapter(db, {
    client,
  }),


  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET,
    },
  },
});

export { client, connectPromise };
