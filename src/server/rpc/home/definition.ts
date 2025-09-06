import { Rpc } from "@effect/rpc";
import { Schema } from "effect";

export const SuccessSchema = Schema.Struct({
  media: Schema.Array(
    Schema.Struct({
      id: Schema.Number,
    })
  ),
});

export const PayloadSchema = Schema.Struct({
  page: Schema.Number,
});

export const HomeRpcEndpoint = Rpc.make("home", {
  success: SuccessSchema,
  payload: PayloadSchema,
});
