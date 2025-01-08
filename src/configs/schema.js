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
  timestamp,
  decimal,
} from 'drizzle-orm/pg-core';

export const USER_TABLE = pgTable(
  'users',
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    isMember: boolean().default(false),
    credits: integer().default(5),
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
    createdAt: timestamp().defaultNow(), // Add the createdAt field
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
    createdAt: timestamp().defaultNow(), // Add the createdAt field
  },
  (table) => ({
    courseIdIndex: index().on(table.courseId), // Index for faster lookups by courseId
    typeIndex: index().on(table.type), // Index for faster lookups by type
  })
);

export const CREDIT_PACKAGES_TABLE = pgTable('creditPackages', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  credits: integer().notNull(),
  price: decimal().notNull(),
  isPopular: boolean().default(false),
  features: json(), // Array of features included in this package
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const PAYMENT_TRANSACTIONS_TABLE = pgTable(
  'paymentTransactions',
  {
    id: serial().primaryKey(),
    userId: varchar().notNull(),
    packageId: integer().notNull(),
    amount: decimal().notNull(),
    credits: integer().notNull(),
    status: varchar().default('pending'),
    paystackReference: varchar(),
    metadata: json(),
    createdAt: timestamp().defaultNow(),
  },
  (table) => ({
    userIdIndex: index().on(table.userId),
    statusIndex: index().on(table.status),
  })
);
