import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const chatLog = mysqlTable("ChatLog", {
  id: serial("Id").primaryKey(),
  userId: varchar("UserId", { length: 70 })
    .notNull()
    .references(() => users.id),
  individual: varchar("Individual", { length: 50 }).notNull(),
  question: varchar("Question", { length: 256 }).notNull(),
  answer: varchar("Answer", { length: 256 }).notNull(),
});
