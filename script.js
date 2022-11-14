"use strict"

const $ = (selector) => document.querySelector(selector);

let listTask = localStorage.getItem("task-list") ? JSON.parse(localStorage.getItem("task-list")) : []; // JSON.parse - возвращает нам объект из строки, если в localStorage есть "task-list", то мы парсим строки в массив объектов или объекта иначе просто создаем пустой массив

const form = $("#form");
const task = $("#task");
const taskReady = $("#ready");
const inputTask = $("#form input"); // обращение к единственному инпуту на странице по правилам css

const checkTask =(name) => listTask.find((item) => name.toLowerCase() == item.name.toLowerCase()); // проверяет повторение задачи уже в имеющимся массиве задач и приводит новую задачу к нижнему регистру, чтобы не повторялись если указать с Большой или маленькой буквы

form.onsubmit = (event) => {
    event.preventDefault(); // указав event в параметрах и написав эту строку, мы отключаем обновление страницы при отправке формы, те очищаем действие по умолчанию 
    /* task.innerHTML += "<li>"+inputTask.value+"</li>"; - как вариант  */
    /* task.innerHTML += `<li>${inputTask.value}</li>`; */ // экранирующая конструкиця
    
    if(inputTask.value == "" || checkTask(inputTask.value)) return; // если значение инпута пустое, то функция просто возращает и дальнейший код не срабатывает
    
    listTask.push({ // создает объект в листТаске
        id: Math.floor(Math.random() * 10000000),
        name: inputTask.value,
        ready: false 
    });
    
    inputTask.value = ""; // очищает инпут во время отправки задачи

    renderTasks();
};

const setReady = (id) =>{ // функция переносящая задачу в выполненные
  const item = listTask.find((itemFind) => id == itemFind.id);
  const index = listTask.indexOf(item);
  listTask[index].ready = true;
  renderTasks();
};

const removeTask = (id) =>{  // функция удаляющая задачу
  const item = listTask.find((itemFind) => id == itemFind.id);
  const index = listTask.indexOf(item);
  listTask.splice(index, 1);
  renderTasks();
};

const renderTasks =() =>{   // создает задачу
    task.innerHTML = "";
    taskReady.innerHTML = "";
    listTask.forEach((item) => {
        if (item.ready)
          taskReady.innerHTML += `<li onclick="removeTask('${item.id}')">${item.name}</li>`; // создает задачу в html и вешает на неё функцию при клике
        else
          task.innerHTML += `<li onclick="setReady('${item.id}')">${item.name}</li>`; // создает задачу в html и вешает на неё функцию при клике

    });

    localStorage.setItem("task-list", JSON.stringify(listTask)); // добавляет объект в локальное хранилище браузера через ключ "task-list" в localStorage можно хранить только строки, поэтому приводим данные из объекта с помощью JSON к строке
};

renderTasks();