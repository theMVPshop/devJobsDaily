DROP TABLE IF EXISTS User, search, JobData;

CREATE TABLE User (
  email VARCHAR(255) UNIQUE,
  ModifiedDate DATE DEFAULT CURRENT_DATE,
  CreatedDate DATE DEFAULT CURRENT_DATE,
  Slug VARCHAR(255)
);

CREATE TABLE search (
  experience VARCHAR(255),
  location VARCHAR(255),
  remote ENUM('yes','no') DEFAULT 'no',
  searchID INT,
  term VARCHAR(255)
);

CREATE TABLE JobData (
  jobValue INT,
  searchDate DATE DEFAULT CURRENT_DATE,
  searchID INT,
  Creator VARCHAR(255),
  ModifiedDate DATE DEFAULT CURRENT_DATE,
  CreatedDate DATE DEFAULT CURRENT_DATE,
  Slug VARCHAR(255)
);

ALTER TABLE JobData
ADD Creator VARCHAR(255),
ADD FOREIGN Key (Creator) REFERENCES User(email);