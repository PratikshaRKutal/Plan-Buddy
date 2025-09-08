const addbtn=document.getElementById("add")
const dialog_box=document.getElementById("dialog-box")
const closebtn=document.getElementById("close")

addbtn.addEventListener("click", ()=>{
    dialog_box.showModal();
})

closebtn.addEventListener("click", ()=>{
    dialog_box.close();
})