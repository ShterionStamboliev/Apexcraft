CREATE DATABASE db_project34;

USE db_project34;

CREATE TABLE tbl_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_and_family VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status ENUM('active', 'inactive') NOT NULL
);