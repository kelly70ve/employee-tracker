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
  password: "",
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
          return addEmployee(); // Not Complete
        case ("Remove Employee"):
          return deleteEmployee(); 
        case ("Update Employee Role"):
          return updateRole(); // Not Complete
        case ("Update Employee Manager"):
          return updateManager(); // Not Complete
        case ("View All Roles"):
          return viewRoles();
        case ("EXIT"):
          return connection.end(); // if end() then program breaks
      }
    })
}

//***************
// VIEW
//***************
function view(where) {
  connection.query(
  `SELECT
  employee.id,
  CONCAT(first_name, ' ', last_name) AS name,
  manager_id,
  title,
  role_id,
  salary,
  department.name AS department
  FROM employee
  INNER JOIN role ON role.id = employee.role_id
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
  connection.query( // Pull dept names
    `SELECT name FROM department`
    ,function (err, res) {
      if (err) throw err;
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
  connection.query( // pull manager names
    `SELECT
    CONCAT(first_name, ' ', last_name) AS name 
    FROM employee
    WHERE manager = TRUE`
    , function (err, res) {
      if (err) throw err;
      inquirer
      .prompt({
        name: "manager",
        type: "list",
        message: "Which manager wpuld you like to view employees for?",
        choices: res
      }).then(answer => {
        return view(`WHERE manager_name = '${answer.manager}'`);
      })
    });
}

// view roles

function viewRoles() {
  connection.query(
    `SELECT * FROM role;`
  , function(err, res){
    if (err) throw err;
    console.log("\n")
    console.table(res);
    console.log("\n")
    console.log("\n")
    start();
  });
}


//***************
// INSERT
//***************
async function addEmployee(){ // Not complete
  try {
    var managers = await getManagers();
    var roles = await getRoles();

    console.log(managers); // This works
    console.log(roles); // This works

    inquirer
    .prompt([
      {name: "firstName",
      type: "input",
      message: "What is the employee's first name?"},
      {name: "lastName",
      type: "input",
      message: "What is the employee's last name?"},
      {name: "role",
      type: "list",
      message: "What role will this employee be fufilling?",
      choices: roles}, // This returns an array of the same length as the managers array but says undefinied 
      {name: "manager",
      type: "list",
      message: "Who is the employee's manager?",
      choices: [managers, "This employee is the manager"]} 
    ]).then(answers => {
      console.log("\n");
      console.log(answers);
      console.log("\n");
      console.log("\n");
      start();
    })
  } catch(error) {
    console.error(error);
  }

}

function getManagers() {
  var managers;

  return new Promise(function(resolve, reject) {
    connection.query(
      `SELECT
      CONCAT(first_name, ' ', last_name) AS name
      FROM employee
      WHERE manager = TRUE;`, 
      function(err, res) {
        managers = res
        resolve(managers);
      }
    );
  })
}

function getRoles() {
  var roles;

  return new Promise(function(resolve, reject) {
    connection.query(
      `SELECT title FROM role;`
    , function(err, res){
      roles = res
      resolve(roles)
    });
  })
}

function getEmployees() {
  var employees;

  return new Promise(function(resolve, reject) {
    connection.query(
      `SELECT 
      CONCAT(first_name, ' ', last_name) AS name,
      id
      FROM employee;`
    , function(err, res){
      employees = res
      resolve(employees)
    });
  })
}


//***************
// DELETE
//***************
function deleteEmployee() {
  connection.query(
    ` SELECT 
    CONCAT(first_name, ' ', last_name) AS name,
    id 
    FROM employee;
    `
  , function(err, res) {
    if (err) throw err;
      inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: res
      }).then(answer => {
        var employee = res.filter((employees) => {
          return answer.employee === employees.name
        });
        connection.query(
          "DELETE FROM employee WHERE ?",
        {
          id: employee[0].id
        }, function(err, res) {
          if (err) throw err;
          console.log("\n");
          console.log(`Employee ${answer.employee} has been deleted`);
          console.log("\n");
          console.log("\n");
          start();
        })
      })
  });
}

//***************
// UPDATE
//***************
async function updateRole(){ // Not completed
  var employees = await getEmployees();
  var roles = await getRoles();

  inquirer
  .prompt([
    {name: "employee",
    type: "list",
    message: "Which employee would you like to update?",
    choices: employees},
    {name: "role",
    type: "list",
    message: "Which role would you like to put them in?",
    choices: roles}
  ]).then(answers => {
      console.log("\n");
      console.log(answers);
      console.log("\n");
      console.log("\n");
      start();
    });
}

async function updateManager(){ // Not Completed
  var employees = await getEmployees();
  var managers = await getManagers();

  inquirer
  .prompt([
    {name: "employee",
    type: "list",
    message: "Which employee would you like to update?",
    choices: employees},
    {name: "manager",
    type: "list",
    message: "Which manager would you like to assign to them?",
    choices: managers}
  ]).then(answers => {
      console.log("\n");
      console.log(answers);
      console.log("\n");
      console.log("\n");
      start();
    });
}


