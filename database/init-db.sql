CREATE DATABASE minapp CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'minappman' IDENTIFIED BY 'minappman';

GRANT ALL ON minapp.* TO 'sonar'@'%' IDENTIFIED BY 'minappman';
GRANT ALL ON minapp.* TO 'sonar'@'localhost' IDENTIFIED BY 'minappman';

flush privileges;
