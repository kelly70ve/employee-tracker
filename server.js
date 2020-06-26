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
connection.connect(function(err) {
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
      console.log(answer)
      switch (answer.action) {
        case ("View All Employees"):
          view('');
        case ("View All Employees by Department"):
          departments();
        case ("View All Employees by Manager"):
          console.log("View All Employees by Manager");
        case ("Add Employee"):
          console.log("Add Employee");
        case ("Remove Employee"):
          console.log("Remove Employee");
        case ("Update Employee Role"):
          console.log("Update Employee Role");
        case ("Update Employee Manager"):
          console.log("Update Employee Manager");
        case ("View All Roles"):
          console.log("View All Roles");
        case ("EXIT"):
          connection.end(); // if end() then program breaks
      }
    }).then(start);
}




// VIEW 

function view(where) {
  console.log(where);

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
  ${where}`, function(err, res) {
    if (err) throw err;
    console.log("\n")
    console.table(res);
  });
}



// by Department

function departments() {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which deparment would you like to view?",
      choices: [
      "Sales",
      "Accounting", 
      "Engineering", 
      "Legal",
      ]
    }).then(answer => {
      return view(`WHERE department.name = '${answer.department}'`);
    })
};


//  INSERT 