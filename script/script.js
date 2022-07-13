window.onload = function() {
    if (JSON.parse(localStorage.getItem('todo-elements')) != null) {
        elements = JSON.parse(localStorage.getItem('todo-elements'));
        displayTask();
        updateTasksStatus()
    }
}


// get reference to elements
const inputField = document.querySelector('#input-field');
const listOfTasks = document.querySelector('.list-of-tasks');
const addTaskBtn = document.querySelector('.add-task');
const clearClistBtn = document.querySelector('.clear-list');
const tasksLeft = document.getElementById('task-left');
const tasksFinish = document.getElementById('task-finish');

// initiate variables
let isToggleDone = false;
let isToggleRemaing = false
let remaining = 0;
let complete = 0;
let total = 0;
let elements = [];

// display current dayName dayNumber and month
function displayTime() {
    const currentDate = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let month = months[currentDate.getMonth()];
    let dayName = days[currentDate.getDay()];
    let day = currentDate.getDate()

    const displayCurrentTime = document.querySelector('h1');
    displayCurrentTime.innerHTML = `${dayName} ${day} ${month} `;
}

displayTime()


// update tasks info status
const updateTasksStatus = () => {
    const tasksLeftScore = document.getElementById('task-left-score');
    const tasksFinishScore = document.getElementById('task-finish-score');

    total = elements.length;
    complete = elements.filter(task => task.includes('<del>')).length;
    remaining = elements.filter(task => !task.includes('<del>')).length;
    tasksLeftScore.innerHTML = `${remaining} / ${total}`;
    tasksFinishScore.innerHTML = `${complete} / ${total}`;
}

// add user input value to elements list, save localy and display tasks
const addEl = () => {
    if (inputField.value.trim() != '') {
        elements.push(inputField.value)
        inputField.value = ''
        inputField.focus()
        updateTasksStatus()
        localStorage.setItem('todo-elements', JSON.stringify(elements))
        displayTask()
    } else {
        alert('you must write a task before')
    }
}

// iterate thru elements list and create a task for each value.
const displayTask = () => {
    listOfTasks.innerHTML = '';
    for (let i = 0; i < elements.length; i++) {

        listOfTasks.innerHTML +=
            `
        <div  class='element'>
            <img src="./assets/delete.png" alt=" delete" width="30px" height="25px" onclick="delTask(${i})">
            <span onclick="checkTask(${i})">${elements[i]}</span>
            <img src="./assets/check.png" alt="check" width="30px" height="25px" onclick="checkTask(${i})">
        </div>

        `

    }
}


// delete element 
const delTask = i => {
    elements.splice(i, 1);
    localStorage.setItem('todo-elements', JSON.stringify(elements))
    displayTask()
    updateTasksStatus()

}

// check/uncheck a task 
const checkTask = i => {
    if (elements[i].includes("<del>")) {
        elements[i] = elements[i].replace("<del>", "");
        elements[i] = elements[i].replace("</del>", "");
    } else {
        elements[i] = `<del>${elements[i]}</del>`
    }
    localStorage.setItem('todo-elements', JSON.stringify(elements))
    displayTask()
    updateTasksStatus()
}


// display remaining tasks in info status
const tasksComplete = () => {
    // display checked elements
    let taskleft = elements.filter(function(e) {
        return !e.includes("<del>")
    })

    // iterate thru taskleft and display element which are't checked
    listOfTasks.innerHTML = '';
    taskleft.forEach(element => {
        listOfTasks.innerHTML += `<li>${element} </li>`
    });

}

// display checked tasks in info status
const taskRemaning = () => {
    // display all checked tasks
    let taskleft = elements.filter(function(e) {
        return e.includes("<del>")
    })

    // iterate thru taskleft and display element which are checked
    listOfTasks.innerHTML = '';
    taskleft.forEach(el => {
        listOfTasks.innerHTML += `<li>${el} </li>`
    });

}

// toggle all task to complete tasks
const toggleCompleteTasks = () => {

    if (isToggleDone) {
        displayTask()
        isToggleDone = false
    } else {
        tasksComplete()
        isToggleDone = true
        isToggleRemaing = false
    }
}

// toggle all tasks to remaining tasks
const toggleRemaningTasks = () => {

    if (isToggleRemaing) {
        displayTask()
        isToggleRemaing = false
    } else {
        taskRemaning()
        isToggleRemaing = true
        isToggleDone = false
    }
}




// keybord ev 
addTaskBtn.addEventListener('click', addEl)
inputField.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        addEl()
    }
})


// click ev
tasksLeft.addEventListener('click', toggleCompleteTasks)
tasksFinish.addEventListener('click', toggleRemaningTasks)
clearClistBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the list?')) {
        listOfTasks.innerHTML = '';
        localStorage.clear()
        elements = [];
        updateTasksStatus()
    }
})