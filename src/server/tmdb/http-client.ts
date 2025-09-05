import { Config, Effect, Redacted } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";

export class TmdbHttpClient extends Effect.Service<TmdbHttpClient>()(
  "app/TmdbHttpClient",
  {
    dependencies: [FetchHttpClient.layer],
    effect: Effect.gen(function* () {
      return (yield* HttpClient.HttpClient).pipe(
        HttpClient.mapRequest(
          HttpClientRequest.prependUrl("https://www.omdbapi.com/3")
        ),
        HttpClient.mapRequest(
          HttpClientRequest.appendUrlParam(
            "apiKey",
            Redacted.value(yield* Config.redacted("OMDB_API_KEY"))
          )
        )
      );
    }),
  }
) {}
