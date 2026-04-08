let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

let tasks = [];

window.onload = function () {

    loadTasks();

    taskInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            addTask();

        }

    });

};

function addTask() {

    let text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({

        id: Date.now(),

        text: text,

        completed: false

    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filtered = tasks.filter(task => {

        if (filter === "completed")
            return task.completed;

        if (filter === "pending")
            return !task.completed;

        return true;

    });

    filtered.forEach(task => {

        let li = document.createElement("li");

        if (task.completed)
            li.classList.add("completed");

        let span = document.createElement("span");

        span.textContent = task.text;

        span.onclick = () => {

            toggleComplete(task.id);

        };

        let actions = document.createElement("div");

        actions.classList.add("actions");

        let editBtn = document.createElement("button");

        editBtn.textContent = "Edit";

        editBtn.classList.add("edit");

        editBtn.onclick = () => {

            editTask(task.id);

        };

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = () => {

            deleteTask(task.id);

        };

        actions.appendChild(editBtn);

        actions.appendChild(deleteBtn);

        li.appendChild(span);

        li.appendChild(actions);

        taskList.appendChild(li);

    });

}

function toggleComplete(id) {

    tasks = tasks.map(task => {

        if (task.id === id)

            task.completed = !task.completed;

        return task;

    });

    saveTasks();

    renderTasks();

}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

}

function editTask(id) {

    let newText = prompt("Edit task:");

    if (newText === null) return;

    tasks = tasks.map(task => {

        if (task.id === id)

            task.text = newText;

        return task;

    });

    saveTasks();

    renderTasks();

}

function filterTasks(type) {

    renderTasks(type);

}

function saveTasks() {

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}

function loadTasks() {

    let stored = localStorage.getItem("tasks");

    if (stored) {

        tasks = JSON.parse(stored);

    }
    renderTasks();
}



function toggleDarkMode() {

    document.body.classList.toggle("dark");

}