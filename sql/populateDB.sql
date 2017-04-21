CREATE TABLE "Faculties"
(
  id serial NOT NULL,
  description character varying(255) NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Faculties_pkey" PRIMARY KEY (id)
);


-- Table: "Councils"

CREATE TABLE "Councils"
(
  id serial NOT NULL,
  description character varying(255) NOT NULL,
  "facultyId" integer,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Councils_pkey" PRIMARY KEY (id),
  CONSTRAINT "Councils_courseId_fkey" FOREIGN KEY ("facultyId")
      REFERENCES "Faculties" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Index: "sortByUrl"

-- DROP INDEX "sortByUrl";

--CREATE UNIQUE INDEX "sortByUrl"
--  ON "Councils"
--  USING btree
--  (url COLLATE pg_catalog."default");

INSERT INTO "Faculties" (id, description, "createdAt", "updatedAt") VALUES (1, 'Fakulteten för blabla', '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');
INSERT INTO "Faculties" (id, description, "createdAt", "updatedAt") VALUES (2, 'Fakulteten för ...' , '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');
