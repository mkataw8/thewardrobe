import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
export const itemRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        link: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      const { name, link, price } = input;
      return ctx.db.item.create({
        data: {
          name: name,
          link: link,
          price: Number(price),
          type: "hats",
        },
      });
    }),
});
