import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Effect } from "effect";
import { PostgresService } from "~/server/db/service";
import { reactStartCookies } from "better-auth/react-start";

// const pg = postgres(process.env.DATABASE_URL!, { prepare: false });
// const db = drizzle({ client: pg });

export class AuthService extends Effect.Service<AuthService>()(
  "app/AuthService",
  {
    dependencies: [PostgresService.Default],
    effect: Effect.gen(function* () {
      const postgres = yield* PostgresService;

      return betterAuth({
        plugins: [reactStartCookies()],
        database: drizzleAdapter(postgres, {
          provider: "pg",
        }),
      });
    }),
  }
) {}
