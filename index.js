const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Choice = require('inquirer/lib/objects/choice');

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
      "Add new department"
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

const addDept = () => {
  inquirer
  .prompt({
    name: 'deptName',
    type: 'input',
    message: "What is the departments name?",
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