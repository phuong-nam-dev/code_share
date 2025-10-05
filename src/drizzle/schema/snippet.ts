import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user as UserTable } from "./auth-schema";
import { relations } from "drizzle-orm";

export const SnippetsTable = pgTable("snippets", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("title"),
  description: text("description"),
  code: text("name"),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const usersRelations = relations(UserTable, ({ many }) => ({
  snippets: many(SnippetsTable),
}));

export const snippetsRelations = relations(SnippetsTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SnippetsTable.userId],
    references: [UserTable.id],
  }),
}));
