import { RpcGroup } from "@effect/rpc";
import { HomeRpcEndpoint } from "./home/definition";

export class RootRpc extends RpcGroup.make(HomeRpcEndpoint) {}
