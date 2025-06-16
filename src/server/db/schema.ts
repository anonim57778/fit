import { addDays } from "date-fns";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fit_${name}`);

export const files = createTable("files", {
  id: varchar("id", { length: 255 })
  .notNull()
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
	fileName: varchar("file_name", { length: 255 }).notNull(),
	fileSize: integer("file_size").notNull(),
	contentType: varchar("content_type", { length: 255 }).notNull(),
	objectId: varchar("object_id", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const genderUserEnum = pgEnum("gender_user_enum", ["MALE", "FEMALE"]);
export const GenderUserSchema = z.enum(genderUserEnum.enumValues);
export type GenderUser = z.infer<typeof GenderUserSchema>;

export const roleUserEnum = pgEnum("role_user_enum", ["USER", "ADMIN"]);
export const RoleUserSchema = z.enum(roleUserEnum.enumValues);
export type RoleUser = z.infer<typeof RoleUserSchema>;

export const activityUserEnum = pgEnum("activity_user_enum", ["LIGHT", "AVERAGE", "HIGH"]);
export const ActivityUserSchema = z.enum(activityUserEnum.enumValues);
export type ActivityUser = z.infer<typeof ActivityUserSchema>;

export const pricingTypeEnum = pgEnum("pricing_type_enum", ["FREE", "WEEKLY", "MONTHLY"]);
export const PricingTypeSchema = z.enum(pricingTypeEnum.enumValues);
export type PricingType = z.infer<typeof PricingTypeSchema>;

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  gender: genderUserEnum("gender").notNull(),
  role: roleUserEnum("role").notNull(),
  age: integer("age").notNull(),
  weight: integer("weight").notNull(),
  height: integer("height").notNull(),
  activity: activityUserEnum("activity").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  activePricing: pricingTypeEnum("active_pricing").notNull().default("FREE"),
  pricingExpiresAt: timestamp("pricing_expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull().default(addDays(new Date(), 3)),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const workouts = createTable("workouts", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const workoutsRelations = relations(workouts, ({ many, one }) => ({
  user: one(users, { fields: [workouts.userId], references: [users.id] }),
  exercises: many(workoutsExercises),
}))

export const workoutsExercises = createTable("workouts_exercises", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  setRepeatWeight: varchar("set_repeat_weight").notNull(),
  workoutId: varchar("workout_id").references(() => workouts.id).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const workoutsExercisesRelations = relations(workoutsExercises, ({ one }) => ({
  workout: one(workouts, { fields: [workoutsExercises.workoutId], references: [workouts.id] }),
}))

export const mealEnum = pgEnum("meal_enum", ["BREAKFAST", "LUNCH", "DINNER", "SNACK"]);
export const MealSchema = z.enum(mealEnum.enumValues);
export type Meal = z.infer<typeof MealSchema>;

export const foods = createTable("foods", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  fats: integer("fats").notNull(),
  сarbohydrates: integer("сarbohydrates").notNull(),
  squirrels: integer("squirrels").notNull(),
  calories: integer("calories").notNull(),
  grams: integer("grams").notNull(),
  meal: mealEnum("meal").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  userId: varchar("user_id").references(() => users.id).notNull(),
})

export const foodsRelations = relations(foods, ({ one }) => ({
  user: one(users, { fields: [foods.userId], references: [users.id] }),
}))

export const statusesEnum = pgEnum("statuses_enum", ["PENDING", "WAITING", "SUCCESS", "CANCEL"]);
export const StatusesSchema = z.enum(statusesEnum.enumValues);
export type Status = z.infer<typeof StatusesSchema>;

export const payments = createTable("payments", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  idempotencyKey: text("idempotency_key").notNull().unique(),
  yookassaId: text("yookassa_id").notNull().unique(),
  confirmationUrl: text("confirmation_url").notNull(),
  status: statusesEnum("status").notNull().default("PENDING"),
  pricingType: pricingTypeEnum("pricing_type").notNull(),
  amount: integer("amount").notNull(),
  incomeAmount: integer("income_amount"),
  isPaid: boolean("is_paid").notNull().default(false),
  userId: varchar("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {fields: [payments.userId], references: [users.id]}),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
