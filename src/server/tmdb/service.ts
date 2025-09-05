import { Effect } from "effect";
import { TmdbSearchMultiMethod } from "./methods/search/multi";

export class TmdbApiService extends Effect.Service<TmdbApiService>()(
  "app/TmbdApiService",
  {
    effect: Effect.gen(function* () {
      return {
        search: {
          multi: TmdbSearchMultiMethod,
        },
      };
    }),
  }
) {}
