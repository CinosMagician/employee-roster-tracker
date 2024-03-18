// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

let employeesArray = [];

let cancelPrompt = false;

// let loopCount = 0;

function createEmployee(firstName, lastName, salary){
  
  return {firstName, lastName, salary}
}


// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
  let cancelPrompt = false;
  console.log(`Start of loop`)
  while (!cancelPrompt) {
    let first = prompt(`Enter first name:`);

    if (first === null || first.trim() === ''){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        cancelPrompt = true;
        break;  
      }
      else{
        console.log(`Restarting Loop`)
        continue;
      }
    }

    let last = prompt(`Enter last name:`);
    
    if (last === null || last.trim() === ''){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        cancelPrompt = true;
        break;  
      }
      else{
        console.log(`Restarting Loop`)
        continue;
      }
    }    
  
    let sal = prompt(`Enter salary amount:`);

    if (sal === null){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        cancelPrompt = true;
        break;  
      }
      else{
        console.log(`Restarting Loop`)
        continue;
      }
    }

    if (isNaN(sal)) {
      sal = 0;
    }
    else {
      sal = parseInt(sal)
    }  

    let newEmployee = createEmployee(first, last, sal);
    employeesArray.push(newEmployee);

    let addMore = confirm(`Would you like to add another employee?`)

    if (!addMore) {
      cancelPrompt = true;
    }

    // console.log(employeesArray);
    // const currentEmployee = employeesArray[loopCount];
    // console.log(currentEmployee.firstName);
    // console.log(`Current loop count: ${loopCount}`);
    // loopCount++;
  }
  console.log(`end of loop`)
  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  let averageSal = 0;
  for (let i = 0; i < employeesArray.length; i++) {
    averageSal += employeesArray[i].salary
  }
  averageSal /= employeesArray.length;
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${averageSal.toFixed(2)}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
  const randomNumber = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomNumber];
  console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winnder!`)
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
