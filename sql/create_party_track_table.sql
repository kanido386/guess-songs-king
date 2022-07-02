USE guess_songs_king;


CREATE TABLE party (
  id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  host_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(128) NOT NULL,
  questions VARCHAR(128) NOT NULL,

  FOREIGN KEY(host_id) REFERENCES host(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE track (
  id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  party_id BIGINT UNSIGNED NOT NULL,
  artist VARCHAR(128) NOT NULL,
  name VARCHAR(128) NOT NULL,
  q_type BIGINT UNSIGNED NOT NULL,

  FOREIGN KEY(party_id) REFERENCES party(id) ON DELETE CASCADE ON UPDATE CASCADE
);