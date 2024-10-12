import { sql } from "drizzle-orm/sql";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const createTable = sqliteTableCreator(
  (name) => `turso-demo-app_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text("name", { length: 256 }).notNull(),
    content: text("content", { length: 1024 }).notNull(),
    userId: text("userId", { length: 256 }).notNull(),
    userName: text("userName", { length: 256 }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.title),
  }),
);

export const postLikesRelations = relations(posts, ({ many }) => ({
  likes: many(likes),
}));

export const likes = createTable("like", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  postId: int("postId", { mode: "number" }).notNull(),
  userId: text("userId", { length: 256 }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}));
