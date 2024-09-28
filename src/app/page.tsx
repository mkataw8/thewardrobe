import { TooltipProvider } from "@/components/ui/tooltip";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Clothing } from "./_components/Clothing";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <TooltipProvider>
        <Clothing />
      </TooltipProvider>
    </HydrateClient>
  );
}
