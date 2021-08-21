const addTasksBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todoWrapper = document.querySelector('.todos-wrapper');

let tasks;
/* eslint-disable */
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); 
/* eslint-anable */

let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
  this.index = tasks.length + 1;
}
/* eslint-disable */
const createTemplate = (task, index) => {
  return `
    <li class="todo-item ${task.completed ? 'checked' : ''} draggable" draggable='true'>
      
      <input onclick="completeTask(${index})" class="btn-competed checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
      <div class="elmar">
        <div class="description">${task.description}</div>
        <div class="buttons">
          <button onclick="editTask(${index})" type="button" class="btn-delete">Edit</button>
          <button onclick="deleteTask(${index})" type="button" class="btn-delete">Delete</button>
          </div>
      </div>   
    </li>
  `;

};
/* eslint-anable */
const addToHTML = () => { 
  todoWrapper.innerHTML = '';
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      todoWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll('.todo-item');
  }
};

addToHTML();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
/* eslint-disable */
const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }
  updateLocal();
  addToHTML();
};
/* eslint-anable */
addTasksBtn.addEventListener('click', () => { 
  tasks.push(new Task(deskTaskInput.value));
  updateLocal(); 
  addToHTML(); 
  deskTaskInput.value = ''; 

});

const deleteTask = index => {
  todoItemElems[index].classList.add('deletion');
  setTimeout(() => { 
    tasks.splice(index, 1);
    updateLocal();
    addToHTML();
  }, 500);
};
class DND {
  constructor() {
    this.prevRow;
  }

  setEventListeners() {
    let listItems = document.querySelectorAll('li');
  
    listItems.forEach((listItem) => {
  
      listItem.addEventListener('dragstart', (e) => this.start(e));
      listItem.addEventListener('dragover', (e) => this.over(e));
      listItem.addEventListener('drop', (e) => this.drop(e));  
    });
  }

  start(e) {
    this.prevRow = e.target;

    let HTMLContent = e.target.innerHTML;
    let checkboxStatus = e.target.querySelector('input').checked;

    e.dataTransfer.setData('html-content', HTMLContent);
    e.dataTransfer.setData('checkbox-status', checkboxStatus);
  }

  over(e) {
    let currRow;

    if (e.target.parentNode.tagName === 'LI') currRow = e.target.parentNode;
    else if (e.target.parentNode.tagName === 'DIV') currRow = e.target.parentNode.parentNode;
    else currRow = e.target;

    e.preventDefault();

    if (this.prevRow !== currRow) {
      this.prevRow.innerHTML = currRow.innerHTML;
      this.prevRow.querySelector('input').checked = currRow.querySelector('input').checked;
      currRow.innerHTML = '';
      this.prevRow = currRow;
    }
  }

  drop(e) {
    const HTMLContent = e.dataTransfer.getData('html-content');
    const checkboxStatus = e.dataTransfer.getData('checkbox-status');

    e.target.innerHTML = HTMLContent;
    e.target.querySelector('input').checked = (checkboxStatus === 'true');
  }

}

init = () => {
  let dnd = new DND(); 
  dnd.setEventListeners();  
}

let windowLoad = new Promise(function(resolve) {
  window.addEventListener('load', resolve);
});

windowLoad.then(
  function(result) {
    init();
  }
);

const checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach((chbox) => {
  chbox.addEventListener('change', (event) => {
    const updatedTodo = updateStatus(event, updateLocal());
    saveToStorage('TodoList', updatedTodo);
  });
});

const editTask = index => {
  todoItemElems[index].contentEditable = true;
};

const cleanCompleted = () => {
  const oldList = JSON.parse(localStorage.getItem('tasks'));
  oldList.forEach((element) => {
    if (element.completed) {
      element.index = 0;
    }
  });
  const newList = oldList.filter((ind) => ind.index !== 0);
  if (newList.length > 0) {
    let i = 1;
    newList.forEach((element) => {
      element.index = i;
      i += 1;
    });
  }
  localStorage.setItem('tasks', JSON.stringify(newList));
  const allCheckboxes = Array.from(
    document.querySelectorAll('input[type="checkbox"]'),
  );
  allCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.parentNode.remove();
    }
  });
};

document.querySelector('#clear').addEventListener('click', () => {
  cleanCompleted();
});