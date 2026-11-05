// "use client";

import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.BETTER_AUTH_URL ||

  // "https://bazar-dor-blue-seven.vercel.app";
  "http://localhost:3000"

export const authClient = createAuthClient({
  baseURL,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;