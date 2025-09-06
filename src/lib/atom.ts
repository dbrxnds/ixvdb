import { AtomRpc } from "@effect-atom/atom-react";
import { FetchHttpClient } from "@effect/platform";
import { RpcClient as EffectRpcClient, RpcSerialization } from "@effect/rpc";
import { Layer } from "effect";
import { RootRpc } from "~/server/rpc/definition";

const ProtocolLive = EffectRpcClient.layerProtocolHttp({
  url: "/api/rpc",
}).pipe(
  Layer.provide(
    Layer.mergeAll(FetchHttpClient.layer, RpcSerialization.layerJson)
  )
);

export class RpcClient extends AtomRpc.Tag<RpcClient>()("app/RpcClient", {
  group: RootRpc,
  protocol: ProtocolLive,
}) {}
