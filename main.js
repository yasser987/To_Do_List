let input = document.querySelector(".new-task-input");
let submit = document.querySelector(".new-task-submit");
let newTasks = document.querySelector(".new-tasks");
let form = document.querySelector(".new-task-form");

let arrayOfTasks = [];

getDataFromLocalStograge();
window.onload = function () {
  arrayOfTasks.forEach((task) => {
    task.save = false;
    task.edite = true;
    addArrayToLocalStorage(arrayOfTasks);
    addArrayToBody(arrayOfTasks);
  });
};
submit.onclick = function (e) {
  if (input.value) {
    e.preventDefault();
    addTaskToArray(input.value);
    input.value = "";
  }
};
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    complete: false,
    edite: true,
    save: false,
  };
  arrayOfTasks.push(task);
  addArrayToLocalStorage(arrayOfTasks);
  addArrayToBody(arrayOfTasks);
}
function addArrayToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
window.onload = function () {
  arrayOfTasks.forEach((task) => {
    task.save = false;
    task.edite = true;
    addArrayToLocalStorage(arrayOfTasks);
    addArrayToBody(arrayOfTasks);
  });
};
function addArrayToBody(arrayOfTasks) {
  newTasks.innerHTML = "";
  if (Array.isArray(arrayOfTasks)) {
    arrayOfTasks.forEach((task) => {
      // [1] Create New Task Container Element
      let newTask = document.createElement("div");
      newTask.setAttribute("data-id", task.id);
      newTask.classList.add("new-task");
      if (task.complete) {
        newTask.classList.add("new-task", "done");
      }
      // [2] Create Content Element
      let content = document.createElement("div");
      content.classList.add("content");
      // [3] Create Input Element That Is In Content
      let inputText = document.createElement("input");
      inputText.type = "text";
      inputText.setAttribute("value", task.title);
      inputText.setAttribute("readonly", true);
      // [4] Append The Input into Content Element
      content.appendChild(inputText);
      // [5] Append the Content Element Into New Task Container
      newTask.appendChild(content);
      // [6] Create The Actions Div
      let actions = document.createElement("div");
      actions.classList.add("actions");
      // [7] Create The Edit Button
      let edite = document.createElement("button");
      if (task.edite) {
        edite.classList.add("edite");
        let editText = document.createTextNode("Edite");
        edite.appendChild(editText);
      } else if (task.save) {
        edite.classList.add("save");
        let editText = document.createTextNode("Save");
        edite.appendChild(editText);
      }
      // [8] Create The Delete Button
      let del = document.createElement("button");
      del.classList.add("delete");
      let deleteText = document.createTextNode("Delete");
      del.appendChild(deleteText);
      // [9] Append edit Button, Delete Into Actions Container
      actions.appendChild(edite);
      actions.appendChild(del);
      // [10] Append the Actions Element Into New Tas Container
      newTask.appendChild(actions);
      newTasks.appendChild(newTask);
    });
  }
}
newTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("edite")) {
    // [1] Change The Readonly Attribute Value
    let editedElement =
      e.target.parentElement.parentElement.querySelector("input[type='text']");
    editedElement.removeAttribute("readonly");
    // [2] Change Edit To Save
    e.target.innerHTML = "Save";
    e.target.classList.toggle("edite");
    e.target.classList.toggle("save");
    e.target.parentElement.parentElement.querySelector(
      "input[type='text']"
    ).style.cursor = "unset";
    e.target.parentElement.parentElement.style.cursor = "unset";
    updateEditeAndSaveInTasks(e.target.parentElement.parentElement.dataset.id);
  } else if (e.target.classList.contains("save")) {
    let savedElement =
      e.target.parentElement.parentElement.querySelector("input[type='text']");
    savedElement.setAttribute("readonly", true);
    e.target.innerHTML = "Edite";
    e.target.classList.toggle("edite");
    e.target.classList.toggle("save");
    updateEditeAndSaveInTasks(e.target.parentElement.parentElement.dataset.id);
    let updatedValue = savedElement.value;
    updateSavedText(
      e.target.parentElement.parentElement.dataset.id,
      updatedValue
    );
  } else if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    deleteElement(e.target.parentElement.parentElement.dataset.id);
  }
});
function getDataFromLocalStograge() {
  if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
    addArrayToBody(arrayOfTasks);
  }
}
function updateEditeAndSaveInTasks(TaskId) {
  arrayOfTasks.forEach((task) => {
    if (task.id == TaskId) {
      task.edite == true ? (task.edite = false) : (task.edite = true);
      task.save == true ? (task.save = false) : (task.save = true);
      addArrayToLocalStorage(arrayOfTasks);
    }
  });
}
function updateSavedText(taskId, updatedValue) {
  arrayOfTasks.forEach((task) => {
    if (task.id == taskId) {
      task.title = updatedValue;
      addArrayToLocalStorage(arrayOfTasks);
      addArrayToBody(arrayOfTasks);
    }
  });
}
function deleteElement(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addArrayToLocalStorage(arrayOfTasks);
  addArrayToBody(arrayOfTasks);
}
