CREATE DATABASE minappdb CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'minappman' IDENTIFIED BY 'minappman';

GRANT ALL ON minapp.* TO 'minappman'@'%' IDENTIFIED BY 'minappman';
GRANT ALL ON minapp.* TO 'minappman'@'localhost' IDENTIFIED BY 'minappman';

flush privileges;
