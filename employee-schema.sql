CREATE DATABASE trackerDB;

USE trackerDB;

CREATE TABLE department (
	department_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE role (
	role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
	salary DECIMAL(10,2) NOT NULL,
    department_id INT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department (department_id)
);

CREATE TABLE employee (
	employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL, 
    manager_id INT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES role (role_id),
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id) 
);

USE trackerDB;
--Creating departments
INSERT INTO department (name)
VALUES ("Human Resources"), ("Development"), ("Sales");


--Creating roles for departments
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 1), ("HR REPRESENTATIVE", 80000, 1), 
("Dev", 90000, 2), ("Lead Developer", 120000, 2), 
("Lead Sales Rep", 100000, 3), ("Sales Rep", 80000, 3);


--Creating employees
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Titus", "Molestina", 1), ("Grace", "Chamberlain", 2),
 ("Israel", "Molestina", 4), ("Sarah", "Chamberlain", 3), 
 ("Ian", "Hopkins", 5), ("Jaseth", "Fike", 6);

ALTER TABLE employee DROP FOREIGN KEY employee_ibfk_1;

ALTER TABLE employee ADD CONSTRAINT employee_ibfk_1 FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE SET NULL;