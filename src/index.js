
document.addEventListener("DOMContentLoaded", () => {
  let tasksArray = [];
  
  document.getElementById('create-task-form').addEventListener('submit', function(event) {
      event.preventDefault();  // Suppress the page default method

      const taskDescription = document.getElementById('new-task-description').value.trim(); // Get task description  .trim is to remove extra spaces in the begining and end of inputs
       


      if (taskDescription !== "") {  // Ensure task description is not empty
          const newTask = document.createElement('li'); // Create a new list item
          newTask.textContent = taskDescription; // Set task description

          const priority = document.getElementById('priority').value; // Get priority value
          const dueDate = document.getElementById('due-date').value; // Get the due date
          const dueTime = document.getElementById('due-time').value;
          
          // Check if a due date and time are provided
          const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString() : "No due date";
          const formattedDueTime = dueTime ? dueTime : "No time";

          let priorityValue;//checks priority values  to enable sorting
          if (priority === 'high') {
              priorityValue = 3;
          } else if (priority === 'medium') {
              priorityValue = 2;
          } else {
              priorityValue = 1;
          }

          
          tasksArray.push({// Add the task to the tasksArray
              description: taskDescription,
              priority: priority,
              priorityValue: priorityValue,
              dueDate: dueDate, 
              dueTime:dueTime,
          });

          
          tasksArray.sort((a, b) => b.priorityValue - a.priorityValue);// Sort tasksArray by priorityValue (highest first)

          
          renderTasks();// Render the sorted tasks
          
          
          document.getElementById('new-task-description').value = "";// Clear the input field after the task is added
      }
  });

  function renderTasks() {
      const tasksList = document.getElementById('tasks');
      tasksList.innerHTML = "";  // Clear the current list of tasks

      // Loop through the sorted tasksArray and create DOM elements for each task
      tasksArray.forEach(task => {
          const newTask = document.createElement('li'); // Create a new list item for the task
          newTask.textContent = task.description; // Set task description

          
          const priorityLabel = document.createElement('span');  // Create a span to hold the priority label
          priorityLabel.classList.add('priority-label');  // Add class for styling
          priorityLabel.textContent = ` [${task.priority.toUpperCase()}]`; // Set priority label text

         // Create a span to hold the due date
         const dueDateLabel = document.createElement('span');
         dueDateLabel.classList.add('due-date-label'); // Add class for styling
         dueDateLabel.textContent = ` (Due: ${task.dueDate})`; // Set due date text

           // Create a span to hold the due date
         const dueTimeLabel=document.createElement('span');
         dueTimeLabel.classList.add('due-time-label')//Add class for styling
         dueTimeLabel.textContent=`(Due: ${task.dueTime})`;//set due time to tex

          
          // Add a class to style the priority based on the selected value
          if (task.priority === 'high') {
              priorityLabel.classList.add('priority-high');
          } else if (task.priority === 'medium') {
              priorityLabel.classList.add('priority-medium');
          } else {
              priorityLabel.classList.add('priority-low');
          }
          
          
          newTask.appendChild(priorityLabel);// Append the priority label to the newTask
          newTask.appendChild(dueDateLabel);// adding due date to the priority label
          newTask.appendChild(dueTimeLabel);// adding due time to the priority label

          const button = document.createElement('button');// Create a remove button
          
          button.textContent = "Remove";
          button.classList.add('remove-btn'); // Add class for styling

          
          button.addEventListener('click', function() {// Event listener for the remove button
              tasksArray = tasksArray.filter(taskItem => taskItem.description !== task.description); // Remove task from array
              renderTasks(); // Re-render the tasks
          });

          // Append the button to the newTask
          newTask.appendChild(button); 

          // Append the new task to the tasks list
          tasksList.appendChild(newTask);
      });
  }
});


