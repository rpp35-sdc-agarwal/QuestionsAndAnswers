CREATE TABLE "Questions" (
  "question_id" SERIAL UNIQUE PRIMARY KEY,
  "question_body" varchar(1000) NOT NULL,
  "question_date" varchar NOT NULL,
  "username" varchar(60) NOT NULL,
  "email" varchar(60) NOT NULL,
  "helpful" int,
  "reported" boolean
);

CREATE TABLE "Answers" (
  "answer_id" SERIAL PRIMARY KEY,
  "answer_body" varchar(1000) NOT NULL,
  "username" varchar(60) NOT NULL,
  "email" varchar(60) NOT NULL,
  "question_id" int
);

CREATE TABLE "Photos" (
  "photo_id" SERIAL PRIMARY KEY,
  "photo_url" varchar NOT NULL,
  "answer_id" int
);

ALTER TABLE "Answers" ADD FOREIGN KEY ("question_id") REFERENCES "Questions" ("question_id");

ALTER TABLE "Photos" ADD FOREIGN KEY ("answer_id") REFERENCES "Answers" ("answer_id");
