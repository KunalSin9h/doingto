'use strict';

const mainCenter = document.querySelector(`.sec`),
    footer = document.querySelector(`footer`),
    createWork = document.querySelector(`.create--btn`),
    deleteWork = document.querySelector(`.delete--work`),
    textArea = document.querySelector(`.textarea--1`),
    workTitle = document.querySelector(`.work--title`),
    pageTitle = document.querySelector(`title`),
    lists = document.querySelector(`.list`),
    addTodo = document.querySelector(`.add-todo`),
    addDoing = document.querySelector(`.add-doing`),
    addDone = document.querySelector(`.add-done`);

setupPage();

createWork.addEventListener(`click`, () => {
    const workName = textArea.value;
    createWorkspace(workName);
})

deleteWork.addEventListener(`click`, () => {
    localStorage.setItem(`isWork`, `false`);
    localStorage.removeItem(`workName`);
    hideWorkspace();
    showStart();
    pageTitle.textContent = `doingto`; 
})

function setupPage() {
    const isWork = localStorage.getItem(`isWork`);
    if (isWork === `true`) {
        hideStart();
        showWorkspace();
        reloadWorkspace();
    }
    else {
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
