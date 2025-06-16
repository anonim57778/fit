import { pricingTypeEnum } from "~/server/db/schema";

export type Pricing = (typeof pricingTypeEnum.enumValues)[number];

export const pricingData: Record<
  Pricing,
  {
    name: string;
    price: number;
    discountPrice?: number;
    days: number;
    description: string;
    postfix: string;
    advantages: string[];
  }
> = {
  FREE: {
    name: "Старт",
    price: 0,
    days: 0,
    postfix: "/3 дня",
    description:
      "Попробуй все функции без ограничений.\nОтличный способ для знакомства.",
    advantages: [
      "Доступ на 3 дня",
      "Абсолютно бесплатно",
      "Управление питанием и тренировками",
    ],
  },
  WEEKLY: {
    name: "Базовый",
    price: 200,
    days: 7,
    postfix: "/неделя",
    description: "Для тех, кто хочет оценить результат за неделю.",
    advantages: ["Доступ на 7 дней", "Доступная цена", "Доступ к статистике"],
  },
  MONTHLY: {
    name: "Продвинутый",
    price: 600,
    discountPrice: 800,
    days: 30,
    postfix: "/месяц",
    description:
      "Максимум возможностей без ограничений: питание, тренировки, прогресс, всё под контролем.",
    advantages: ["Доступ на месяц", "Полный функционал", "Самый выгодный"],
  },
};