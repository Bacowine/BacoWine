CREATE USER 'user'@'%' IDENTIFIED BY 'bacowine';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
CREATE DATABASE bacowine;
use bacowine;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    correos VARCHAR(45) NOT NULL
);
