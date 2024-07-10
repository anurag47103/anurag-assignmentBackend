\c contactDB;

CREATE TABLE IF NOT EXISTS Contact (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "phoneNumber" VARCHAR(255) NULL,
    "email" VARCHAR(40) NULL,
    "linkedId" INT NULL,
    "linkPrecedence" VARCHAR(10) NOT NULL CHECK ("linkPrecedence" IN ('primary', 'secondary')),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP NULL DEFAULT NULL
);