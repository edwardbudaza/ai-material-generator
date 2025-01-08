CREATE TABLE "chapterNotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"chapterId" integer NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "creditPackages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"credits" integer NOT NULL,
	"price" numeric NOT NULL,
	"isPopular" boolean DEFAULT false,
	"features" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "paymentTransactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"packageId" integer NOT NULL,
	"amount" numeric NOT NULL,
	"credits" integer NOT NULL,
	"status" varchar DEFAULT 'pending',
	"paystackReference" varchar,
	"metadata" json,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "studyMaterial" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" text NOT NULL,
	"courseType" text NOT NULL,
	"topic" text NOT NULL,
	"difficultyLevel" text DEFAULT 'Easy',
	"courseLayout" json,
	"createdBy" text NOT NULL,
	"status" varchar DEFAULT 'Generating',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "studyTypeContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"content" json,
	"type" varchar NOT NULL,
	"status" varchar DEFAULT 'Generating',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"isMember" boolean DEFAULT false,
	"credits" integer DEFAULT 0,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "chapterNotes_courseId_index" ON "chapterNotes" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "chapterNotes_chapterId_index" ON "chapterNotes" USING btree ("chapterId");--> statement-breakpoint
CREATE INDEX "paymentTransactions_userId_index" ON "paymentTransactions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "paymentTransactions_status_index" ON "paymentTransactions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "studyMaterial_courseId_index" ON "studyMaterial" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "studyMaterial_createdBy_index" ON "studyMaterial" USING btree ("createdBy");--> statement-breakpoint
CREATE INDEX "studyMaterial_difficultyLevel_index" ON "studyMaterial" USING btree ("difficultyLevel");--> statement-breakpoint
CREATE INDEX "studyTypeContent_courseId_index" ON "studyTypeContent" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "studyTypeContent_type_index" ON "studyTypeContent" USING btree ("type");--> statement-breakpoint
CREATE INDEX "users_email_index" ON "users" USING btree ("email");