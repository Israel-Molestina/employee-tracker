const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Choice = require('inquirer/lib/objects/choice');

// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

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
  runSearch();
});

const runSearch = () => {
  inquirer
  .prompt({
    name: 'action',
    type: 'list',
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      
    ],
  })
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
    }
  });
};

const showDepts = () => {
  const query =
    'SELECT * FROM department';
  connection.query(query, (err, res) => {
    console.table(res);
    runSearch();
  });
};

const showRoles = () => {
  const query =
    'SELECT * FROM role';
  connection.query(query, (err, res) => {
    console.table(res);
    runSearch();
  });
};

const showEmployees = () => {
  const query =
    'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    console.table(res);
    runSearch();
  });
};