// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

let employeesArray = [];

const cancelPrompt = false;

let loopCount = 0;

function createEmployee(firstName, lastName, salary){
  
  return {firstName, lastName, salary}
}


// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
  console.log(`Start of loop`)
  while (!cancelPrompt) {
    const first = prompt(`Enter first name:`);
      console.log(first);
    if (first === null){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        const cancelPrompt = true;
        break;  
      }
      else{
        console.log(`Restarting Loop`)
        continue;
      }
    }    
    const last = prompt(`Enter last name:`);
      console.log(last);
    
    if (last === null){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        const cancelPrompt = true;
        break;  
      }
      else{
        console.log(`Restarting Loop`)
        continue;
      }
    }    
  
    const sal = prompt(`Enter salary amount:`);
      console.log(sal);

    if (sal === null){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        const cancelPrompt = true;
        break;  
      }
      else{
        console.log(`Restarting Loop`)
        continue;
      }
    }    

    let newEmployee = createEmployee(first, last, sal);
    employeesArray.push(newEmployee);
    console.log(employeesArray);
    const currentEmployee = employeesArray[loopCount];
    console.log(currentEmployee.firstName);
    console.log(`Current loop count: ${loopCount}`);
    loopCount++;
  }
  console.log(`end of loop`)
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
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
