import { pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    status: varchar('status', { length: 50 }).notNull().default('en_charlas'),
    description: text('description'),
    url: varchar('url', { length: 500 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const kanbanTasks = pgTable('kanban_tasks', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    status: varchar('status', { length: 50 }).notNull().default('todo'),
    description: text('description'),
    projectId: uuid('project_id').references(() => projects.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
