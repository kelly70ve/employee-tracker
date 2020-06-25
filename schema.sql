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
    PRIMARY KEY (id)
);

-- test data
INSERT INTO department (name) 
VALUES ('Sales'),
('Accounting'),
('Engineering'),
('Legal');

SELECT * FROM department;

INSERT INTO role (title,salary, department_id) 
VALUES ('Sales Lead', 100000, 1),
('Sales Person', 80000, 1),
('Account Manager', 100000, 2),
('Accountant', 80000, 2),
('Lead Engineer', 120000, 3),
('Software Engineer', 90000, 3),
('Legal Team Lead', 150000, 4),
('Legal Advisor', 100000, 4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Jane', 'Doe', 1, null),
('John', 'Doe', 2, 1);

SELECT * FROM employee;
