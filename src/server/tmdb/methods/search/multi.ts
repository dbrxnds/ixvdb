import { Effect, Schema } from "effect";
import { TmdbHttpClient } from "../../http-client";
import { HttpClientRequest, HttpClientResponse } from "@effect/platform";

interface SearchMultiOptions {
  query: string;
  page?: number;
  includeAdult?: boolean;
}

const SearchMultiResponse = Schema.Struct({
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

export const TmdbSearchMultiMethod = Effect.fn("searchMulti")(function* (
  options: SearchMultiOptions
) {
  const httpClient = yield* TmdbHttpClient;

  const request = HttpClientRequest.get("/search/multi").pipe(
    HttpClientRequest.appendUrlParams({
      include_adult: options.includeAdult,
      page: options.page ?? 1,
      query: options.query,
    })
  );

  const response = yield* httpClient
    .execute(request)
    .pipe(
      Effect.flatMap(HttpClientResponse.filterStatusOk),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(SearchMultiResponse))
    );

  return response;
});
