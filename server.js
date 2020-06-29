var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "*0penx2",
  database: "employee_db"
});
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "EXIT"
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case ("View All Employees"):
          return view('');
        case ("View All Employees by Department"):
          return departments();
        case ("View All Employees by Manager"):
          return manager();
        case ("Add Employee"):
          return console.log("Add Employee");
        case ("Remove Employee"):
          return console.log("Remove Employee");
        case ("Update Employee Role"):
          return console.log("Update Employee Role");
        case ("Update Employee Manager"):
          return console.log("Update Employee Manager");
        case ("View All Roles"):
          return console.log("View All Roles");
        case ("EXIT"):
          return connection.end(); // if end() then program breaks
      }
    })
}

// VIEW 
function view(where) {
  connection.query(
  `SELECT
  employee.id,
  CONCAT(first_name, ' ', last_name) AS name,
  manager_id,
  title,
  salary,
  department.name AS department
  FROM employee
  INNER JOIN role ON role.id = employee.id
  INNER JOIN department ON role.department_id = department.id 
  ${where}`, function (err, res) {
    if (err) throw err;
    console.log("\n")
    console.table(res);
    console.log("\n")
    console.log("\n")
    start();
  });
}

// by Department
function departments() {
  connection.query( 
    `SELECT name FROM department`
    ,function (err, res) {
      inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Which deparment would you like to view?",
        choices: res
      }).then(answer => {
        return view(`WHERE department.name = '${answer.department}'`);
      })
    });  
};

// by Manager 
function manager() {
  connection.query(
    `SELECT
    CONCAT(first_name, ' ', last_name) AS name 
    FROM employee
    WHERE manager = TRUE`
    , function (err, res) {
      inquirer
      .prompt({
        name: "manager",
        type: "list",
        message: "Which deparment would you like to view?",
        choices: res
      }).then(answer => {
        return view(`WHERE manager_name = '${answer.manager}'`);
      })
    })
}


//  INSERT