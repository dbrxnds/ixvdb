import { Effect } from "effect";
import { RootRpc } from "./definition";
import { TmdbApiService } from "../tmdb/service";

export const RootRpcLive = RootRpc.toLayer(
  Effect.gen(function* () {
    const tmdb = yield* TmdbApiService;

    return RootRpc.of({
      home: Effect.fn(function* ({}) {
        const response = yield* tmdb.discover.movie();

        return {
          media: [
            {
              id: 1,
            },
          ],
        };
      }, Effect.orDie),
    });
  })
);
