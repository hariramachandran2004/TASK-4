let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) taskElement.classList.add('completed');
    
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due: ${new Date(task.dueDate).toLocaleString()}</p>
      <button onclick="toggleComplete(${index})">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    
    taskList.appendChild(taskElement);
  });
}

function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;

  if (title === '' || dueDate === '') {
    alert('Please fill out the title and due date.');
    return;
  }
  
  const newTask = {
    title,
    description,
    dueDate,
    completed: false
  };
  
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('dueDate').value = '';
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const title = prompt('Edit task title:', tasks[index].title);
  const description = prompt('Edit task description:', tasks[index].description);
  const dueDate = prompt('Edit task due date (yyyy-mm-ddThh:mm):', tasks[index].dueDate);

  if (title !== null && dueDate !== null) {
    tasks[index].title = title;
    tasks[index].description = description;
    tasks[index].dueDate = dueDate;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Initial render
renderTasks();
