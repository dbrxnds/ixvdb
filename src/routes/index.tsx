import { useAtomValue } from "@effect-atom/atom-react";
import { createFileRoute } from "@tanstack/react-router";
import { RpcClient } from "~/lib/atom";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const value = useAtomValue(RpcClient.query("home", { page: 1 }));

  return (
    <div>
      Hello "/"! <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
