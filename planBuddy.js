const addbtn = document.getElementById("add");
const dialog_box = document.getElementById("dialog-box");
const closebtn = document.getElementById("close");
const addTask = document.getElementById("addtask");
const content = document.getElementById("content");

const editDialog = document.getElementById("edit-dialog");
const editClose = document.getElementById("edit-close");
const saveEdit = document.getElementById("save-edit");
const editTitleInput = document.getElementById("edit-title");
const editDescInput = document.getElementById("edit-description");

addbtn.addEventListener("click", () => {
  dialog_box.showModal();
});

closebtn.addEventListener("click", () => {
  dialog_box.close();
});

addTask.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (title.trim() === "" || description.trim() === "") {
    alert("Please add task details.");
    return;
  }

  const placeholder = document.getElementById("placeholder");
  if (placeholder) {
    placeholder.remove();
  }

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.borderRadius = "10%";
  card.innerHTML = `
    <button class="delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
    <div class="task-header">
      <input type="checkbox" class="task-check">
      <h2>${title}</h2>
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
  } else {
    titleEl.classList.remove("task-done");
  }
});


  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  dialog_box.close();

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
    };
  });

  editClose.addEventListener("click", () => {
    editDialog.close();
  });

  const deletebtn = card.querySelector(".delete-btn");
  deletebtn.addEventListener("click", () => {
    const confirmBox = document.getElementById("confirm-box");
    confirmBox.showModal();
    const yesbtn = document.getElementById("yesbtn");
    const nobtn = document.getElementById("nobtn");
    yesbtn.onclick = () => {
      card.remove();
      confirmBox.close();
      if (content.querySelectorAll(".card").length === 0) {
        const placeholder = document.createElement("div");
        placeholder.id = "placeholder";
        placeholder.innerHTML = `
          <h3>✨ Your task galaxy is empty!</h3>
          <p>Plant your first star by clicking <b>+ Add</b>.</p>
        `;
        content.appendChild(placeholder);
      }
    };
    nobtn.onclick = () => {
      confirmBox.close();
    };
  });
});
