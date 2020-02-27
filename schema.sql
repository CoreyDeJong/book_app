DROP TABLE IF EXISTS myfavorites;

CREATE TABLE myfavorites(
  id SERIAL PRIMARY KEY,
  booktitle VARCHAR(255),
  authorname VARCHAR(255),
  bookdescription VARCHAR(255),
  image VARCHAR(2550)
);