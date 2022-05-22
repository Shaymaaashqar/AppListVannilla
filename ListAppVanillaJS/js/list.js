const form = document.getElementById("addForm");
const tasksContainer = document.querySelector(".addDeleteTaskItems");
const search = document.getElementById("search");
const deleteSearchButton = document.getElementById("clear-search");
const markAsDone = document.querySelector(".markAsDone");
const markAsUndone = document.querySelector(".markAsUndone");
const deleteTask = document.querySelector(".deleteTask");

const renderNewTask = ({ id, task, assignee, isDone = false }) => {
  const li = document.createElement("li");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const label1 = document.createElement("label");
  const label2 = document.createElement("label");
  const icon1 = document.createElement("i");
  const icon2 = document.createElement("i");

  li.className = "addDeleteTask";
  li.dataset.taskId = +id || Math.random() * 10;
  div1.className = "addDeleteLabels";
  div2.className = "addDeleteIcons";
  label1.className = "label1";
  label2.className = "label2";
  icon1.className = "fa-solid fa-trash deleteTask";
  icon1.onclick = removeTask;
  icon2.className = `fa ${isDone ? "fa-circle-check markAsUndone" : "fa-circle-thin markAsDone"}`;
  icon2.onclick = isDone ? undoneTask : doneTask;

  label1.innerText = task;
  label2.innerText = assignee;

  div1.append(label1, label2);
  div2.append(icon1, icon2);
  li.append(div1, div2);
  tasksContainer.appendChild(li);
};

const taskName = form["Task"];
const assigneeName = form["Assignee"];

form.addEventListener("submit", addTask);
search.addEventListener("keyup", searchTask);
deleteSearchButton.addEventListener("click", deleteSearch);

let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

const refreshLocalStorage = () => {
  localStorage.setItem("Tasks", JSON.stringify(tasks || []));
};

const refreshCounters = () => {
  document.getElementById("do2").innerText = tasks.length;
  document.getElementById("done2").innerText = tasks.filter(task => task.isDone).length;
};

tasks.forEach(renderNewTask);
refreshCounters();

const addNewTask = (task, assignee) => {
  const id = tasks.length + 1;
  tasks.push({
    id,
    task,
    assignee,
    isDone: false,
  });
  refreshLocalStorage();
  return { id, task, assignee, isDone: false };
};

const removeExistingTask = taskId => {
  tasks = tasks.filter(({ id }) => id !== taskId);
  refreshLocalStorage();
};

function addTask(e) {
  e.preventDefault();
  const newTask = addNewTask(taskName.value, assigneeName.value);
  renderNewTask(newTask);

  taskName.value = "";
  assigneeName.value = "";
  refreshCounters();
}

function removeTask(e) {
  if (confirm("are you sure Delete this task?")) {
    var li = e.target.parentNode;

    removeExistingTask(+li.parentNode.dataset.taskId);

    tasksContainer.removeChild(li.parentNode);
    refreshCounters();
  }
}

function deleteSearch(e) {
  if (e.target.classList.contains("fa-times")) {
    search.value = "";
    searchTask();
  }
}

function doneTask(e) {
  e.target.classList = "fa-solid fa-circle-check markAsUndone";
  e.target.onclick = undoneTask;
  const taskId = +e.target.parentNode.parentNode.dataset.taskId;
  tasks.forEach(task => {
    if (task.id !== taskId) return;
    task.isDone = true;
  });
  refreshLocalStorage();
  refreshCounters();
}

function undoneTask(e) {
  e.target.classList = "fa fa-circle-thin markAsDone";
  e.target.onclick = doneTask;
  const taskId = +e.target.parentNode.parentNode.dataset.taskId;
  tasks.forEach(task => {
    if (task.id !== taskId) return;
    task.isDone = false;
  });
  refreshLocalStorage();
  refreshCounters();
}

function searchTask(e) {
  var text = e?.target?.value ?? "";
  var tasks = tasksContainer.getElementsByTagName("li");
  Array.from(tasks).forEach(function (task) {
    var taskName = task.textContent;

    if (taskName.indexOf(text) == -1) {
      task.style.display = "none";
    } else {
      task.style.display = "inherit";
    }
  });
}
