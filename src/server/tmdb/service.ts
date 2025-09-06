import { Effect } from "effect";
import { TmdbSearchMultiMethod } from "./methods/search/multi";
import { TmdbDiscoverMovieMethod } from "./methods/discover/movie";
import { TmdbHttpClient } from "./http-client";

export class TmdbApiService extends Effect.Service<TmdbApiService>()(
  "app/TmbdApiService",
  {
    dependencies: [TmdbHttpClient.Default],
    sync: () => ({
      discover: {
        movie: TmdbDiscoverMovieMethod,
      },
      search: {
        multi: TmdbSearchMultiMethod,
      },
    }),
  }
) {}
