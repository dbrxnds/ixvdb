import { Config, Effect } from "effect";
import { PgClient } from "@effect/sql-pg";
import * as PgDrizzle from "@effect/sql-drizzle/Pg";
import * as schema from "./schema";

const PGLive = PgClient.layerConfig({
  url: Config.redacted("DATABASE_URL"),
});

export class PostgresService extends Effect.Service<PostgresService>()(
  "app/PostgresService",
  {
    dependencies: [PGLive],
    effect: Effect.gen(function* () {
      return yield* PgDrizzle.make({
        schema,
        casing: "snake_case",
      });
    }),
  }
) {}
