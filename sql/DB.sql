CREATE TABLE "Faculties"
(
  id serial NOT NULL,
  name character varying(255) NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Faculties_pkey" PRIMARY KEY (id)
);

CREATE TABLE "Councils"
(
  id serial NOT NULL,
  name character varying(255) NOT NULL,
  "facultyId" integer,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Councils_pkey" PRIMARY KEY (id, "facultyId"),
  CONSTRAINT "Councils_courseId_fkey" FOREIGN KEY ("facultyId")
      REFERENCES "Faculties" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO "Faculties" (id, name, "createdAt", "updatedAt") VALUES (1, 'Fakulteten för blabla', '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');
INSERT INTO "Faculties" (id, name, "createdAt", "updatedAt") VALUES (2, 'Fakulteten för ...' , '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');

INSERT INTO "Councils" (id, name, "facultyId", "createdAt", "updatedAt") VALUES (1, 'Rådet för ...' , 1, '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');
INSERT INTO "Councils" (id, name, "facultyId", "createdAt", "updatedAt") VALUES (2, 'Rådet för ...' , 1, '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');

INSERT INTO "Councils" (id, name, "facultyId", "createdAt", "updatedAt") VALUES (1, 'Rådet för ...' , 2, '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');
INSERT INTO "Councils" (id, name, "facultyId", "createdAt", "updatedAt") VALUES (2, 'Rådet för ...' , 2, '2017-03-30 17:19:09.507+02', '2017-04-10 21:54:55.142+02');
