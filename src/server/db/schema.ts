import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  decimal,
  integer,
  unique,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text().primaryKey(),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const media = pgTable("media", {
  id: text().primaryKey(),
  tmdbId: integer().unique(),
});

export const ratingCategories = pgTable("rating_categories", {
  id: text().primaryKey(),
  name: text().notNull().unique(),
  description: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userRatings = pgTable(
  "user_ratings",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    mediaId: text()
      .notNull()
      .references(() => media.id, { onDelete: "cascade" }),
    categoryId: text()
      .notNull()
      .references(() => ratingCategories.id, { onDelete: "cascade" }),
    rating: decimal({ precision: 3, scale: 1 }).notNull(), // 0.0 to 10.0 with 0.5 increments
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => ({
    uniqueUserMediaCategory: unique().on(
      table.userId,
      table.mediaId,
      table.categoryId
    ),
  })
);

export const userRatingsRelations = relations(userRatings, ({ one }) => ({
  user: one(user, {
    fields: [userRatings.userId],
    references: [user.id],
  }),
  media: one(media, {
    fields: [userRatings.mediaId],
    references: [media.id],
  }),
  category: one(ratingCategories, {
    fields: [userRatings.categoryId],
    references: [ratingCategories.id],
  }),
}));
