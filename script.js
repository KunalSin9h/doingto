'use strict';

let taskType = `todo`;

const mainCenter = document.querySelector(`.sec`),
    footer = document.querySelector(`footer`),
    createWork = document.querySelector(`.create--btn`),
    deleteWork = document.querySelector(`.delete--work`),
    textArea = document.querySelector(`.textarea--1`),
    taskTextArea = document.querySelector(`.textarea--2`),
    workTitle = document.querySelector(`.work--title`),
    pageTitle = document.querySelector(`title`),
    lists = document.querySelector(`.list`),
    modalAddTasks = document.querySelector(`.add--tasks`),
    cancelBtn = document.querySelector(`.cancel`),
    overlay = document.querySelector(`.overlay`),
    addTodo = document.querySelector(`.add-todo`),
    addDoing = document.querySelector(`.add-doing`),
    addDone = document.querySelector(`.add-done`),
    addButton = document.querySelector(`.add`),
    todoTasks = document.querySelector(`.todo-tasks`),
    doingTasks = document.querySelector(`.doing-tasks`),
    doneTasks = document.querySelector(`.done-tasks`),
    warning = document.querySelector(`.no-text-warning`);


setupPage();

createWork.addEventListener(`click`, () => {
    const workName = textArea.value;
    createWorkspace(workName);
})

deleteWork.addEventListener(`click`, () => {
    localStorage.clear();
    hideWorkspace();
    removeOldTasks();
    showStart();
    pageTitle.textContent = `doingto`; 
})

textArea.addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const workName = textArea.value;
        createWorkspace(workName);       
    } 
})

addTodo.addEventListener(`click`, () => {
    showModal();
    taskType = `todo`;
})

addDoing.addEventListener(`click`, () => {
    showModal();
    taskType = `doing`;
})

addDone.addEventListener(`click`, () => {
    showModal();
    taskType = `done`;
})

cancelBtn.addEventListener(`click`, () => {
    hideModal();
    hideWarning();
})

overlay.addEventListener(`click`, () => {
    hideModal();
    hideWarning();
})

addButton.addEventListener(`click`, () => {
    const input = taskTextArea.value; 
    taskTextArea.value = ``;
    const taskInput = makeTask(input, taskType);
    
    if (input === ``) {
        showWarning();
    } else {
        hideModal();
        hideWarning();
        saveTaskToStorage(taskInput);
        createTodo(taskInput);
    }
})

taskTextArea.addEventListener(`keypress`, (e) => {
    hideWarning();
    if (e.key === `Enter`){
        const input = taskTextArea.value; 
        taskTextArea.value = ``;
        const taskInput = makeTask(input, taskType);
        hideModal();
        saveTaskToStorage(taskInput);
        createTodo(taskInput);
    }
})

function setupPage() {
    const isWork = localStorage.getItem(`isWork`);
    if (isWork === `true`) {
        hideStart();
        showWorkspace();
        reloadWorkspace();
        
        const savedTasks = JSON.parse(localStorage.getItem(`tasks`)) || [];
    
        savedTasks.forEach(task => {
            createTodo(task); 
        }) 
    } else {
        showStart();
        hideWorkspace();
    }
}

function hideStart() {
    mainCenter.classList.add(`hidden`);
    footer.classList.add(`hidden`);
}

function showStart() {
    mainCenter.classList.remove(`hidden`);
    footer.classList.remove(`hidden`);
}

function hideWorkspace() {
    workTitle.classList.add(`hidden`);
    lists.classList.add(`hidden`);
    hideLists();
    deleteWork.classList.add(`hidden`);
}

function showWorkspace() {
    workTitle.classList.remove(`hidden`);
    lists.classList.remove(`hidden`);
    deleteWork.classList.remove(`hidden`);
}

function createWorkspace(workName) {
    if (!workName) workName = `Today's work`;
    workTitle.textContent = workName;
    localStorage.setItem(`isWork`, `true`);
    localStorage.setItem(`workName`, workName);
    showWorkspace();
    hideStart();
    setupLists();
    updateDocumentTitle();
    textArea.value = ``;
}

function reloadWorkspace() {
    const workName = localStorage.getItem(`workName`);
    workTitle.textContent = workName;
    setupLists();
    updateDocumentTitle();
}

function updateDocumentTitle() {
    const workName = localStorage.getItem(`workName`);
    pageTitle.textContent = `${workName} | doingto`;
}

function setupLists() {
    lists.style.display = `flex`;
    lists.style.justifyContent = `space-evenly`;
    lists.style.flexWrap = `wrap`;
}

function hideLists() {
    lists.style.display = `none`;
}

function showModal() {
    overlay.classList.remove(`hidden`);
    modalAddTasks.classList.remove(`hidden`);
}

function hideModal() {
    overlay.classList.add(`hidden`);
    modalAddTasks.classList.add(`hidden`);   
}

function showWarning() {
    warning.classList.remove(`hidden`);
}

function hideWarning() {
    warning.classList.add(`hidden`);
}

function removeOldTasks() {
    todoTasks.innerHTML = ``;
    doingTasks.innerHTML = ``;
    doneTasks.innerHTML = ``;
}

function saveTaskToStorage(task) {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks`)) || [];
    savedTasks.push(task);         
    localStorage.setItem(`tasks`, JSON.stringify(savedTasks));
}

function makeTask(taskTitle, toList) {
    return {
        title: taskTitle,
        list: toList,
    };
}

function createTodo(task) {

    const taskListElement = document.createElement(`li`);
    taskListElement.innerHTML = `${task.title}`;
    taskListElement.classList.add(`tasks-list-items`);
    
    if (task.list === `todo`) {
        todoTasks.appendChild(taskListElement);
    } else if (task.list === `doing`) {
        doingTasks.appendChild(taskListElement);
    } else if (task.list === `done`) {
        doneTasks.appendChild(taskListElement);
    }
}

