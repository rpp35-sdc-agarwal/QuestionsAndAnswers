DROP TABLE IF EXISTS "questions";
DROP TABLE IF EXISTS "answers";
DROP TABLE IF EXISTS "photos";

CREATE TABLE "questions" (
  "question_id" SERIAL UNIQUE PRIMARY KEY,
  "product_id" int NOT NULL,
  "question_body" varchar(1000) NOT NULL,
  "question_date" varchar NOT NULL,
  "username" varchar(60) NOT NULL,
  "email" varchar(60) NOT NULL,
  "helpful" int,
  "reported" boolean
);

CREATE TABLE "answers" (
  "answer_id" SERIAL PRIMARY KEY,
  "answer_body" varchar(1000) NOT NULL,
  "answer_date" varchar NOT NULL,
  "username" varchar(60) NOT NULL,
  "email" varchar(60) NOT NULL,
  "question_id" int,
  "reported" boolean,
  "helpful" int
);

CREATE TABLE "photos" (
  "photo_id" SERIAL PRIMARY KEY,
  "photo_url" varchar NOT NULL,
  "answer_id" int
);

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("question_id");

ALTER TABLE "photos" ADD FOREIGN KEY ("answer_id") REFERENCES "answers" ("answer_id");
