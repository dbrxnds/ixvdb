import { RpcSerialization, RpcServer } from "@effect/rpc";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { Layer } from "effect";
import { RootRpc } from "~/server/rpc/definition";
import { RootRpcLive } from "~/server/rpc/implementation";
import { HttpServer } from "@effect/platform";
import { TmdbApiService } from "~/server/tmdb/service";
import { TmdbHttpClient } from "~/server/tmdb/http-client";

const { handler } = RpcServer.toWebHandler(RootRpc, {
  layer: Layer.mergeAll(
    RootRpcLive.pipe(
      Layer.provide(
        Layer.mergeAll(TmdbApiService.Default, TmdbHttpClient.Default)
      )
    ),
    RpcSerialization.layerJson,
    HttpServer.layerContext
  ),
});

export const ServerRoute = createServerFileRoute("/api/rpc/$").methods({
  DELETE({ request }) {
    return handler(request);
  },
  GET({ request }) {
    return handler(request);
  },
  PATCH({ request }) {
    return handler(request);
  },
  POST({ request }) {
    return handler(request);
  },
  PUT({ request }) {
    return handler(request);
  },
});
