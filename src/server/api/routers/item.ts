import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ItemType } from "@prisma/client";
import { z } from "zod";

export const itemRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        link: z.string().min(1),
        img: z.string().min(1),
        userId: z.string().min(1),
        type: z.enum(["hats", "jackets", "shirts", "pants", "shoes"]), // Add type here
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      const { name, link, price, userId, img, type } = input; // Destructure type from input
      return ctx.db.item.create({
        data: {
          name: name,
          link: link,
          img: img,
          userId: userId,
          price: Number(price),
          type: type, // Save the type in the database
        },
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        type: z.nativeEnum(ItemType),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.item.findMany({
        where: {
          // userId: ctx.session?.user.id,
          userId: input.userId,
          type: input.type,
        },
      });

      return result;
    }),
});
