
import { auth, connectPromise } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

async function ensureConnection(request) {
  await connectPromise;

  if (request.method === "GET") {
    return handler.GET(request);
  }

  return handler.POST(request);
}

export async function GET(request) {
  return ensureConnection(request);
}

export async function POST(request) {
  return ensureConnection(request);
}
