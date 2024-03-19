// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Assigning employeesArray with a blank empty array so that we can add data to it
let employeesArray = [];

// Creating a function that lets gather the information from the prompts and collect it as an object to be put in our array.
function createEmployee(firstName, lastName, salary){
  return {firstName, lastName, salary}
}


// Collect employee data
const collectEmployees = function() {
  
  // This variable lets us set the condition for cancelPrompt. while this is false, our while loop will continue to run.
  let cancelPrompt = false;

  // This while loop is how we will manage when pressing the button to collect employee data
  while (!cancelPrompt) {
    // This will prompt the user to enter the desired first name for their employee
    let first = prompt(`Enter first name:`);

    // This check is to see if the user either cancels the prompt or enters a blank prompt.
    if (first === null || first.trim() === ''){
      // This will ask if the user is sure they want to cancel the prompt to enter data
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      // This checks if they did confirm to cancel, if so, it sets cancelPrompt to true so that the while loop ends and does not repeat
      // Break is used to exit out of the while loop so that the rest of the prompts aren't used if the user wishes to cancel.
      if (confirmation){
        cancelPrompt = true;
        break;  
      }
      else{
        // Continue is used if the user decides not to cancel, restarting at the beginning of the while loop
        continue;
      }
    }

    // This will prompt the user to enter the desired last name for their employee
    let last = prompt(`Enter last name:`);
    
    // This check is the exact same for first name
    if (last === null || last.trim() === ''){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        cancelPrompt = true;
        break;  
      }
      else{
        continue;
      }
    }    
  
    // This prompt will let the user enter the desired amount for the salary for their employee
    let sal = prompt(`Enter salary amount:`);

    // This check is the same for the previous 2 checks, checking to see if the user inputs nothing/just spaces or cancels the prompt
    if (sal === null || sal.trim() === ''){
      const confirmation = confirm(`Are you sure you would like to cancel?`);
      if (confirmation){
        cancelPrompt = true;
        break;  
      }
      else{
        continue;
      }
    }

    // This if check is checking to see if the value of sal is isNan (which means is not a number), if it is true and the user has entered anything besides just numbers
    // It will set the default value to 0
    if (isNaN(sal)) {
      sal = 0;
    }
    else {
      // This else statement is when the user has entered a number, and will convert the string into an intiger so that we can later use maths to add together and divide.
      sal = parseFloat(sal)
    }  

    // This create a new variable called newEmployee which will be equal to the results of the fuction we created earlier.
    // In this case, it will make a new object with {firstName, lastName, salary} with the given information we got from the prompts
    let newEmployee = createEmployee(first, last, sal);
    employeesArray.push(newEmployee);

    // This check is to see if the user wishes to add more employees or to finish entering data
    let addMore = confirm(`Would you like to add another employee?`)

    // If the user wishes not to add more employees, this if check will set cancelPrompt to true so that the while loop is finished
    if (!addMore) {
      cancelPrompt = true;
    }
  }

  // Once everything is finished running through, this returns the data collected to the employeesArray so that the information is saved.
  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {

  // This check is to see if the user has not entered any data as it will cause an error if the array length is 0
  if (employeesArray.length === 0) {
    // This is the message that will display instead of the average salary. This can occur if the user cancels without entering the first employee yet.
    console.log(`Unable to display average salary as there is no data`)
  }
  else {
    // First we declare the variable averageSal so that we can calculate the final results later  
    let averageSal = 0;
    // This for loop will cycle as long as i is less than the length of the array. this way it will always cycle through the entire array.
    for (let i = 0; i < employeesArray.length; i++) {
      // here we are getting the value of averageSal and adding the salary amount from the employee that the array is up to
      averageSal += employeesArray[i].salary
      // This way each time it loops through, averageSal will keep adding all the values together
    }
    // once averageSal has all the values added together, it will then divide the total amount added by the total length of the array
    // giving us the average amount from all employees
    averageSal /= employeesArray.length;
    // This outputs the message of how many employees they have and the average salary amount, rounded to 2 decimal places as money cannot have more than 2 decimal places.
    console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${averageSal.toFixed(2)}`);
  }
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {

  // This check is to see if the user has not entered any data as it will cause an error if the array length is 0
  if (employeesArray.length === 0) {
    // This is the message that will display instead of picking a random employee. This can occur if the user cancels without entering the first employee yet.
    console.log(`Unable to display a random employee as there is no data`)
  }
  else {
    // This creates a number generated at random to be used to select a random employee to be the winner.
    const randomNumber = Math.floor(Math.random() * employeesArray.length);
    // We then use this random number to have it so we can select out the first name and last name from the array with that index number.
    const randomEmployee = employeesArray[randomNumber];
    // This then displays the winner to the console with their first and last name in the message.
    console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winnder!`)
  }
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
