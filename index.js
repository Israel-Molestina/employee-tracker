const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// questions for adding new role had to put into array because it wouldnt work within the prompt for some reason
const addRoleQuestions = [
  {
    name: 'roleName',
    type: 'input',
    message: "What is the new role?",
    validate: function validateRoleName(roleName){
      return roleName !== '';
    },
  },
  {
    name: 'roleSalary',
    type: 'input',
    message: "What is the salary for this new role?",
    validate: function validateRoleSalary(roleSalary){
      return roleSalary !== '';
    },
  },
  {
    name: 'roleDept',
    type: 'input',
    message: "What department does this role fall under?",
    validate: function validateRoleDept(roleDept){
      return roleDept !== '';
    },
  },
];

// questions for adding new employee had to put into array because it wouldnt work within the prompt for some reason
const addEmpQuestions = [
  {
    name: 'firstName',
    type: 'input',
    message: "What is the employees first name?",
    validate: function validateFirstName(FirstName){
      return FirstName !== '';
    },
  },
  {
    name: 'lastName',
    type: 'input',
    message: "What is the employees last name?",
    validate: function validateLastName(LastName){
      return LastName !== '';
    },
  },
  {
    name: 'empRole',
    type: 'input',
    message: "What role will this employee be performing?",
    validate: function validateEmpRole(EmpRole){
      return EmpRole !== '';
    },
  },
  {
    name: 'empManager',
    type: 'input',
    message: "Who is this employees manager?",
  },
];

// starts connection to mysql
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '1234',
  database: 'trackerDB',
});

connection.connect((err) => {
  if (err) throw err;
  runQuestions();
});

// prompts the user for an action to take
const runQuestions = () => {
  inquirer
  .prompt({
    name: 'action',
    type: 'list',
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add new department",
      "Add new role",
      "Add new employee",
    ],
  })
  //switch cases for every possible action
  .then((userChoice) => {
    switch (userChoice.action) {
      case "View all departments":
        showDepts();
        break;

      case "View all roles":
        showRoles();
        break;

      case "View all employees":
        showEmployees();
        break;

      case "Add new department":
        addDept();
        break;

      case "Add new role":
        addRole();
        break;

      case "Add new employee":
        addEmployee();
        break;
    }
  });
};

// prompts the user for information on the department they wish to add and adds it to the table departments
const addDept = () => {
  inquirer
  .prompt({
    name: 'deptName',
    type: 'input',
    message: "What is the departments name?",
    validate: function validateDeptName(DeptName){
      return DeptName !== '';
    },
  })
  .then((userAnswer) => {

    console.log('Inserting a new department...\n');
    const query = connection.query(
      'INSERT INTO department SET ?',
      {
        name: userAnswer.deptName,
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} department inserted!\n`);
        // Call runQuestions() AFTER the INSERT completes
        runQuestions();
      }
    );
    // logs the actual query being run
    console.log(query.sql);

  })
};

// prompts the user for information on the role they wish to add and adds it to the table role
const addRole = () => {
  inquirer.prompt(addRoleQuestions)
  .then((userAnswer) => {
    console.log('Inserting a new role...\n');
    const query = connection.query(
      'INSERT INTO role SET ?',
      {
        title: userAnswer.roleName,
        salary: userAnswer.roleSalary,
        department_id: userAnswer.roleDept,
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} department inserted!\n`);
        // Call runQuestions() AFTER the INSERT completes
        runQuestions();
      }
    );
    // logs the actual query being run
    console.log(query.sql);

  })
};

// prompts the user for information on the employee they wish to add and adds it to the table employee
const addEmployee = () => {
  inquirer.prompt(addEmpQuestions)
  .then((userAnswer) => {
    console.log('Inserting a new employee...\n');
    const query = connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: userAnswer.firstName,
        last_name: userAnswer.lastName,
        role_id: userAnswer.empRole,
        manager_id: userAnswer.empManager,
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} department inserted!\n`);
        // Call runQuestions() AFTER the INSERT completes
        runQuestions();
      }
    );
    // logs the actual query being run
    console.log(query.sql);

  })
};

// shows all the departments
const showDepts = () => {
  const query =
    'SELECT * FROM department';
  connection.query(query, (err, res) => {
    console.table(res);
    runQuestions();
  });
};

// shows all the roles
const showRoles = () => {
  const query =
    'SELECT * FROM role';
  connection.query(query, (err, res) => {
    console.table(res);
    runQuestions();
  });
};

// shows all the employees
const showEmployees = () => {
  const query =
    'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    console.table(res);
    runQuestions();
  });
};