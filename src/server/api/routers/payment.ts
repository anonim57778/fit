import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { payments, PricingTypeSchema, users } from "~/server/db/schema";
import { pricingData } from "~/lib/shared/types/pricing";
import { addDays } from "date-fns";
import { eq } from "drizzle-orm";

export const paymentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(PricingTypeSchema)
    .mutation(async ({ ctx, input }) => {
      const price = pricingData[input].price;
      const { yookassaPayment, idempotencyKey } =
        await ctx.yookassa.createPayment({
          amount: price,
          redirectPath: "/dashboard/pricings",
        });

      await ctx.db.insert(payments).values({
        yookassaId: yookassaPayment.id,
        confirmationUrl: yookassaPayment.confirmation.confirmation_url!,
        amount: price,
        userId: ctx.session!.user.id,
        pricingType: input,
        idempotencyKey,
      });

      await ctx.db.update(users).set({
        activePricing: input,
        pricingExpiresAt: addDays(
          new Date(),
          pricingData[input].days,
        ),
      }).where(eq(users.id, ctx.session!.user.id));

      return { url: yookassaPayment.confirmation.confirmation_url! };
    }),
});