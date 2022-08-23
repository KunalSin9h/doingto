'use strict';

const mainCenter = document.querySelector(`.sec`);
const footer = document.querySelector(`footer`);
const createWork = document.querySelector(`.create--btn`);
const textArea = document.querySelector(`textarea`);
const workTitle = document.querySelector(`.work--title`);
const pageTitle = document.querySelector(`title`);
const lists = document.querySelector(`.list`);
const addTodo = document.querySelector(`.add-todo`);
const addDoing = document.querySelector(`.add-doing`);

createWork.addEventListener(`click`, () => {
    mainCenter.classList.add(`hidden`);
    footer.classList.add(`hidden`);
    workTitle.classList.remove(`hidden`);
    lists.classList.remove(`hidden`);
    setupLists();
    let workTitleContent = textArea.value;
    if (!workTitleContent) workTitleContent = `Today's work`;
    workTitle.textContent = workTitleContent;
    pageTitle.textContent = workTitleContent + ` | doingto`;
})

textArea.addEventListener(`keypress`, (e) => {
    let workTitleContent = textArea.value;
    if (!workTitleContent) workTitleContent = `Today's work`;
    if (e.key == `Enter`) {
        workTitle.textContent = workTitleContent;
        pageTitle.textContent = workTitleContent + ` | doingto`;
        mainCenter.classList.add(`hidden`);
        footer.classList.add(`hidden`);
        workTitle.classList.remove(`hidden`);
        lists.classList.remove(`hidden`);
        setupLists();
    }
})

addTodo.addEventListener(`click`, () => {

})

function setupLists() {
    lists.style.display = `flex`;
    lists.style.justifyContent = `space-evenly`;
    lists.style.flexWrap = `wrap`;
}