const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");

const saveBtn = document.getElementById("saveBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

/* ADD TASK */

saveBtn.addEventListener("click", () => {

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (title === "" || description === "") {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    completed: false,
    createdAt: new Date().toLocaleString()
  };

  tasks.push(task);

  saveToLocalStorage();

  titleInput.value = "";
  descInput.value = "";

  renderTasks();
});

/* RENDER TASKS */

function renderTasks() {

  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  tasks.forEach(task => {

    const card = document.createElement("div");
    card.classList.add("task-card");

    if (task.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <div class="task-info">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <small>Created: ${task.createdAt}</small>
      </div>

      <div class="task-actions">

        ${
          !task.completed
          ? `<button class="complete-btn" onclick="completeTask(${task.id})">
              Complete
            </button>`
          : ""
        }

        <button class="edit-btn" onclick="editTask(${task.id})">
          Edit
        </button>

        <button class="delete-btn" onclick="deleteTask(${task.id})">
          X
        </button>

      </div>
    `;

    if (task.completed) {
      completedTasks.appendChild(card);
    } else {
      pendingTasks.appendChild(card);
    }

  });
}

/* COMPLETE TASK */

function completeTask(id) {

  tasks = tasks.map(task => {

    if (task.id === id) {
      return {
        ...task,
        completed: true,
        completedAt: new Date().toLocaleString()
      };
    }

    return task;
  });

  saveToLocalStorage();
  renderTasks();
}

/* DELETE TASK */

function deleteTask(id) {

  tasks = tasks.filter(task => task.id !== id);

  saveToLocalStorage();
  renderTasks();
}

/* EDIT TASK */

function editTask(id) {

  const task = tasks.find(task => task.id === id);

  const newTitle = prompt("Edit title", task.title);
  const newDesc = prompt("Edit description", task.description);

  if (newTitle === null || newDesc === null) {
    return;
  }

  task.title = newTitle;
  task.description = newDesc;

  saveToLocalStorage();
  renderTasks();
}

/* LOCAL STORAGE */

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}