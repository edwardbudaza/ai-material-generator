import {
  boolean,
  pgTable,
  serial,
  text,
  json,
  varchar,
  index,
  unique,
} from 'drizzle-orm/pg-core';

export const USER_TABLE = pgTable(
  'users',
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    isMember: boolean().default(false),
  },
  (table) => ({
    uniqueEmail: unique().on(table.email),
    emailIndex: index().on(table.email),
  })
);

export const STUDY_MATERIAL_TABLE = pgTable(
  'studyMaterial',
  {
    id: serial().primaryKey(),
    courseId: text().notNull(),
    courseType: text().notNull(),
    topic: text().notNull(),
    difficultyLevel: text().default('Easy'),
    courseLayout: json(),
    createdBy: text().notNull(),
    status: varchar().default('Generating'),
  },
  (table) => ({
    courseIdIndex: index().on(table.courseId),
    createdByIndex: index().on(table.createdBy),
    difficultyLevelIndex: index().on(table.difficultyLevel),
  })
);
