import { YooCheckout } from "@a2seven/yoo-checkout";
import type { NextRequest } from "next/server";
import { env } from "~/env";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { payments, users } from "../db/schema";
import { addDays } from "date-fns";
import { pricingData } from "~/lib/shared/types/pricing";

export interface PaymentNotification {
  event: "payment.succeeded" | "payment.canceled";
  object: {
    id: string;
    paid: boolean;
  };
}

export class Yookassa {
  private yookassa: YooCheckout;

  constructor() {
    this.yookassa = new YooCheckout({
      shopId: env.YOOKASSA_SHOP_ID,
      secretKey: env.YOOKASSA_SECRET_KEY,
    });
  }

  async handlePurchase(req: NextRequest) {
    const notification: PaymentNotification = await req.json();

    if (!notification.object.paid || notification.event !== "payment.succeeded")
      return;

    const payment = await db.query.payments.findFirst({
      where: eq(payments.yookassaId, notification.object.id),
      with: {
        user: {
          columns: {
            id: true,
            pricingExpiresAt: true,
          },
        },
      },
    });

    if (!payment) return undefined;

    await db
      .update(payments)
      .set({
        isPaid: true,
      })
      .where(eq(payments.id, payment.id));

    await db
      .update(users)
      .set({
        activePricing: payment.pricingType,
        pricingExpiresAt: addDays(
          new Date(
            Math.max(
              new Date().getTime(),
              payment.user.pricingExpiresAt.getTime(),
            ),
          ),
          pricingData[payment.pricingType].days,
        ),
      })
      .where(eq(users.id, payment.userId));

    return payment;
  }

  async createPayment({
    amount,
    redirectPath,
  }: {
    amount: number;
    redirectPath: string;
  }) {
    const idempotencyKey = crypto.randomUUID();
    try {
      const yookassaPayment = await this.yookassa.createPayment(
        {
          amount: {
            value: amount.toFixed(0).toString(),
            currency: "RUB",
          },
          confirmation: {
            type: "redirect",
            return_url: `${env.NEXTAUTH_URL}${redirectPath}`,
          },
          capture: true,
        },
        idempotencyKey,
      );
      const confirmationUrl = yookassaPayment.confirmation.confirmation_url;
      if (!confirmationUrl) {
        throw new Error("Не удалось создать платеж");
      }

      return { yookassaPayment, idempotencyKey };
    } catch (error) {
      console.error(error);
      throw new Error("Не удалось создать платеж");
    }
  }
}

const globalForYookassa = globalThis as unknown as {
  yookassa: Yookassa;
};

export const yookassa = globalForYookassa.yookassa ?? new Yookassa();