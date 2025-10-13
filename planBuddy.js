const addBtns = document.querySelectorAll(".add-btn");
const dialog_box = document.getElementById("dialog-box");
const closebtn = document.getElementById("close");
const addTask = document.getElementById("addtask");
const content = document.getElementById("content");

const editDialog = document.getElementById("edit-dialog");
const editClose = document.getElementById("edit-close");
const saveEdit = document.getElementById("save-edit");
const editTitleInput = document.getElementById("edit-title");
const editDescInput = document.getElementById("edit-description");

addBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    dialog_box.showModal();
  });
});

closebtn.addEventListener("click", () => {
  dialog_box.close();
});

function showMessage(message, type = "info", duration = 2000) {
  const msgBox = document.getElementById("congrats-message");
  msgBox.textContent = message;
  msgBox.style.background = "#a5c9e9";
  if (type === "success") msgBox.style.background = "#b3f0b8";
  if (type === "delete") msgBox.style.background = "#f8b4b4";
  if (type === "complete") msgBox.style.background = "#d4f8d4";
  msgBox.classList.add("show");
  setTimeout(() => {
    msgBox.classList.remove("show");
  }, duration);
}

function saveTask() {
  const task = [];
  document.querySelectorAll(".card").forEach(card => {
    const title = card.querySelector("h2").textContent;
    const description = card.querySelector("p").textContent;
    const isDone = card.querySelector(".task-check").checked;
    task.push({ title, description, checked: isDone });
  });
  localStorage.setItem("tasks", JSON.stringify(task));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.length === 0) return;
  const placeholder = document.getElementById("placeholder");
  if (placeholder) placeholder.remove();
  tasks.forEach(task => {
    createTaskCard(task.title, task.description, task.checked);
  });
}

function createTaskCard(title, description, checked = false) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.borderRadius = "10%";
  card.innerHTML = `
    <button class="delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
    <div class="task-header">
      <input type="checkbox" class="task-check" ${checked ? "checked" : ""}>
      <h2 class="${checked ? "task-done" : ""}">${title}</h2>
    </div>
    <hr>
    <p>${description}</p>
  `;
  content.appendChild(card);
  const checkbox = card.querySelector(".task-check");
  const titleEl = card.querySelector("h2");
  checkbox.addEventListener("change", (e) => {
    if (checkbox.checked) {
      titleEl.classList.add("task-done");
      showMessage("✅ Well done! You have completed a task!!!", "complete");
    } else {
      titleEl.classList.remove("task-done");
      showMessage("⏪ Task marked as incomplete!", "info");
    }
    saveTask();
  });
  card.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) return;
    if (e.target.closest(".task-check")) return;
    const cardTitle = card.querySelector("h2");
    const cardDesc = card.querySelector("p");
    editTitleInput.value = cardTitle.textContent;
    editDescInput.value = cardDesc.textContent;
    editDialog.showModal();
    saveEdit.onclick = () => {
      cardTitle.textContent = editTitleInput.value;
      cardDesc.textContent = editDescInput.value;
      editDialog.close();
      saveTask();
    };
  });
  editClose.addEventListener("click", () => {
    editDialog.close();
  });
  const deletebtn = card.querySelector(".delete-btn");
  deletebtn.addEventListener("click", () => {
    const taskTitle = card.querySelector("h2").textContent;
    const confirmBox = document.getElementById("confirm-box");
    confirmBox.showModal();
    const yesbtn = document.getElementById("yesbtn");
    const nobtn = document.getElementById("nobtn");
    yesbtn.onclick = () => {
      card.remove();
      confirmBox.close();
      showMessage(`🗑️ You deleted "${taskTitle}"!`, "delete");
      saveTask();
      if (content.querySelectorAll(".card").length === 0) {
        const placeholder = document.createElement("div");
        placeholder.id = "placeholder";
        placeholder.innerHTML = `
          <h3>✨ Your task galaxy is empty!</h3>
          <p>Plant your first star by clicking <b>+ Add</b>.</p>
        `;
        content.appendChild(placeholder);
        const newAddBtn = placeholder.querySelector(".add-btn");
        if (newAddBtn) {
          newAddBtn.addEventListener("click", () => {
            dialog_box.showModal();
          });
        }
      }
    };
    nobtn.onclick = () => {
      confirmBox.close();
    };
  });
  saveTask();
}

addTask.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  if (title.trim() === "" || description.trim() === "") {
    alert("Please add task details.");
    return;
  }
  const placeholder = document.getElementById("placeholder");
  if (placeholder) placeholder.remove();
  createTaskCard(title, description);
  showMessage("🎉 Congratulations! You have added a new task!!!", "success");
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  dialog_box.close();
});

window.addEventListener("load", loadTasks);
