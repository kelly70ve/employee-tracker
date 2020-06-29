DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- DEPARTMENT TABLE
CREATE TABLE department (
	id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);


--  ROLE TABLE 
CREATE TABLE role (
	id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4),
    department_id int,
    PRIMARY KEY (id)
);

-- EMPLOYEE TABLE
CREATE TABLE employee (
	id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int,
    manager_id int,
    manager BOOLEAN,
    manager_name VARCHAR(30),
    PRIMARY KEY (id)
);




