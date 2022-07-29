DROP TABLE IF EXISTS "questions";
DROP TABLE IF EXISTS "answers";
DROP TABLE IF EXISTS "photos";

CREATE TABLE "questions" (
  "question_id" SERIAL UNIQUE PRIMARY KEY,
  "product_id" int NOT NULL,
  "question_body" varchar(1000) NOT NULL,
  "question_date" varchar NOT NULL,
  "asker_name" varchar(60) NOT NULL,
  "email" varchar(60) NOT NULL,
  "question_helpfulness" int,
  "reported" boolean
);

CREATE TABLE "answers" (
  "id" SERIAL PRIMARY KEY,
  "body" varchar(1000) NOT NULL,
  "date" varchar NOT NULL,
  "answerer_name" varchar(60) NOT NULL,
  "answer_email" varchar(60) NOT NULL,
  "question_id" int,
  "answer_reported" boolean,
  "helpfulness" int
);

CREATE TABLE "photos" (
  "photo_id" SERIAL PRIMARY KEY,
  "url" varchar NOT NULL,
  "answer_id" int
);

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("question_id");

ALTER TABLE "photos" ADD FOREIGN KEY ("answer_id") REFERENCES "answers" ("answer_id");
