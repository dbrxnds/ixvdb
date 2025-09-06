import { Effect, Schema } from "effect";
import { TmdbHttpClient } from "../../http-client";
import { HttpClientRequest, HttpClientResponse } from "@effect/platform";

interface DiscoverMovieOptions {
  page?: number;
}

export const DiscoverMovieResponse = Schema.Struct({
  page: Schema.Number,
  results: Schema.Array(
    Schema.Struct({
      id: Schema.Number,
      title: Schema.String,
      poster_path: Schema.String,
      release_date: Schema.String,
    })
  ),
  total_pages: Schema.Number,
  total_results: Schema.Number,
});

export const TmdbDiscoverMovieMethod = Effect.fn("discoverMovie")(function* (
  options?: DiscoverMovieOptions
) {
  const httpClient = yield* TmdbHttpClient;

  const request = HttpClientRequest.get("/discover/movie").pipe(
    HttpClientRequest.appendUrlParams({
      page: options?.page ?? 1,
    })
  );

  const response = yield* httpClient
    .execute(request)
    .pipe
    //   Effect.flatMap(HttpClientResponse.schemaBodyJson(DiscoverMovieResponse))
    ();

  console.log(yield* response.json);

  return response;
});
