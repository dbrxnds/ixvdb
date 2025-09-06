import { Config, Effect, Redacted } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";

export class TmdbHttpClient extends Effect.Service<TmdbHttpClient>()(
  "app/TmdbHttpClient",
  {
    dependencies: [FetchHttpClient.layer],
    effect: Effect.gen(function* () {
      const apiKey = yield* Config.redacted("TMDB_API_KEY");

      return (yield* HttpClient.HttpClient).pipe(
        HttpClient.mapRequest((request) =>
          request.pipe(
            HttpClientRequest.prependUrl("https://api.themoviedb.org/3"),
            HttpClientRequest.setHeader(
              "Authorization",
              `Bearer ${Redacted.value(apiKey)}`
            )
          )
        ),
        HttpClient.retryTransient({
          times: 3,
        })
      );
    }),
  }
) {}
