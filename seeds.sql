-- test data
INSERT INTO department (name) 
VALUES ('Sales'),
('Accounting'),
('Engineering'),
('Legal');


INSERT INTO role (title,salary, department_id) 
VALUES ('Sales Lead', 100000, 1),
('Sales Person', 80000, 1),
('Account Manager', 100000, 2),
('Accountant', 80000, 2),
('Lead Engineer', 120000, 3),
('Software Engineer', 90000, 3),
('Legal Team Lead', 150000, 4),
('Legal Advisor', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id, manager, manager_name) 
VALUES ('Jane', 'Doe', 1, null, TRUE, null),
('John', 'Doe', 2, 1, FALSE, 'Jane Doe');
