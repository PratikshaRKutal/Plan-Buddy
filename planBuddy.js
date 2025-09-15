const addbtn = document.getElementById("add");
const dialog_box = document.getElementById("dialog-box");
const closebtn = document.getElementById("close");
const addTask = document.getElementById("addtask");
const content = document.getElementById("content");

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

  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  <button class="delete-btn">
    <i class="fa-solid fa-trash"></i>
    </button>
  <h2>${title}</h2><br>
  <p>${description}</p>
  `;

  content.appendChild(card);

  document.getElementById("title").value = " ";
  document.getElementById("description").value = " ";
  card.style.borderRadius = "10%";

  dialog_box.close();

  const deletebtn = card.querySelector(".delete-btn");
  deletebtn.addEventListener("click", () => {
    alert("Do you want to delete this task?");
    card.remove();
  });
});
