import {
  boolean,
  pgTable,
  serial,
  text,
  json,
  varchar,
  index,
  unique,
  integer,
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

export const CHAPTER_NOTES_TABLE = pgTable(
  'chapterNotes',
  {
    id: serial().primaryKey(),
    courseId: varchar().notNull(),
    chapterId: integer().notNull(),
    notes: text(),
  },
  (table) => ({
    courseIdIndex: index().on(table.courseId),
    chapterIdIndex: index().on(table.chapterId), // For faster lookups
  })
);

export const STUDY_TYPE_CONTENT_TABLE = pgTable(
  'studyTypeContent',
  {
    id: serial().primaryKey(),
    courseId: varchar().notNull(),
    content: json(),
    type: varchar().notNull(),
    status: varchar().default('Generating'),
  },
  (table) => ({
    courseIdIndex: index().on(table.courseId), // Index for faster lookups by courseId
    typeIndex: index().on(table.type), // Index for faster lookups by type
  })
);
