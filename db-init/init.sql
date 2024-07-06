DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT
        FROM   pg_catalog.pg_roles
        WHERE  rolname = 'anurag') THEN

        CREATE ROLE anurag WITH LOGIN PASSWORD 'anurag123';
    END IF;
END
$$;

DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT
        FROM   pg_database
        WHERE  datname = 'contactDB') THEN

        CREATE DATABASE contactDB OWNER anurag;
    END IF;
END
$$;

\c contactDB;

CREATE TABLE IF NOT EXISTS Contact (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NULL,
    phoneNumber VARCHAR(20) NULL,
    linkedId INT NULL,
    linkPrecedence VARCHAR(10) NOT NULL CHECK (linkPrecedence IN ('primary', 'secondary')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);