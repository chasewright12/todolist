const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = ""; // limpa a lista antes de re-renderizar

  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", () => {
      toggleTask(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Clear";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

function addTask(text) {
  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);

  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed,
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    return;
  }

  addTask(text);

  input.value = "";
  input.focus();
});

renderTasks();
