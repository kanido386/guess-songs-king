USE guess_songs_king;


CREATE TABLE host (
  id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(512) NOT NULL,
  
  UNIQUE (email)
);