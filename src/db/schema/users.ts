import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("Users", {
  id: varchar("Id", { length: 70 }).notNull().primaryKey(),
  name: varchar("Name", { length: 100 }),
  email: varchar("Email", { length: 100 }).notNull(),
  passwordHash: varchar("PasswordHash", { length: 256 }).notNull(),
  phoneNumber: varchar("PhoneNumber", { length: 100 }),
  questions: int("Questions").notNull(),
});
export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
