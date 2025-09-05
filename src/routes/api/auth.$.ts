import { createServerFileRoute } from "@tanstack/react-start/server";
import { Effect } from "effect";
import { AuthService } from "~/lib/auth";

const AuthHandler = Effect.fn("authHandler")(function* (request: Request) {
  const auth = yield* AuthService;

  return auth.handler(request);
}, Effect.provide(AuthService.Default));

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
  POST: ({ request }) => AuthHandler(request).pipe(Effect.runPromise),
  GET: ({ request }) => AuthHandler(request).pipe(Effect.runPromise),
});
