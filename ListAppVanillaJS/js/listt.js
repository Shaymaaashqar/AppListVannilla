const addForm = document.getElementById("addForm");
const taskCon = document.querySelector(".addDeleteTaskItems");
const search = document.getElementById("search");
const deleteSch = document.getElementById("close-icon");

const task = addForm["Task"];
const assignee = addForm["Assignee"];

// Form submit event
addForm.addEventListener("submit", addTask);
// Delete event
taskCon.addEventListener("click", removeTask);
//Done event
taskCon.addEventListener("click", doneTask);
// Search event
search.addEventListener("keyup", searchTask);
//delete searchText
deleteSch.addEventListener("click", deleteSearch);

const Task = JSON.parse(localStorage.getItem("Tasks")) || [];
var counterToDo = localStorage.getItem("counterToDo") || 0;
var counterDone = localStorage.getItem("counterDone") || 0;
//alert(counterToDo);

const AddTask = (task, assignee) => {
  Task.push({
    task,
    assignee,
  });
  localStorage.setItem("Tasks", JSON.stringify(Task));
  return { task, assignee };
};

const RemoveTask = (t, a) => {
  // alert(a);
  const index = Task.findIndex(
    (elem) => elem.task === t && elem.assignee === a
  );
  // alert(index);
  if (index != -1) {
    Task.splice(index, 1);
    // alert(Task);
  }
  localStorage.setItem("Tasks", JSON.stringify(Task));
};

const creatTaskElement = ({ task, assignee }) => {
  const li = document.createElement("li");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const label1 = document.createElement("label");
  const label2 = document.createElement("label");
  const icon1 = document.createElement("i");
  const icon2 = document.createElement("i");

  li.className = "addDeleteTask";
  div1.className = "addDeleteLabels";
  div2.className = "addDeleteIcons";
  label1.className = "label1";
  label2.className = "label2";
  icon1.className = "fa-solid fa-trash trash";
  icon2.className = "fa fa-circle-thin check";

  label1.innerText = task;
  label2.innerText = assignee;

  div1.append(label1, label2);
  div2.append(icon1, icon2);
  li.append(div1, div2);
  taskCon.appendChild(li);
};

Task.forEach(creatTaskElement);

function addTask(e) {
  e.preventDefault();
  const newTask = AddTask(task.value, assignee.value);
  creatTaskElement(newTask);
  localStorage.setItem("counterToDo", (counterToDo += 1));
  document.getElementById("do2").innerText =
    localStorage.getItem("counterToDo");

  task.value = "";
  assignee.value = "";
}

function removeTask(e) {
  if (e.target.classList.contains("trash")) {
    if (confirm("are you sure Delete this task?")) {
      var li = e.target.parentNode;
      // alert(li);
      // alert(li.parentNode.childNodes[0].childNodes[0].innerText);

      RemoveTask(
        li.parentNode.childNodes[0].childNodes[0].innerText,
        li.parentNode.childNodes[0].childNodes[1].innerText
      );

      taskCon.removeChild(li.parentNode);
      //  Decrease Todo Tasks

      localStorage.setItem("counterToDo", (counterToDo -= 1));
      document.getElementById("do2").innerText =
        localStorage.getItem("counterToDo");
    }
  }
}

function deleteSearch(e) {
  if (e.target.classList.contains("fa-times")) {
    search.value = "";
  }
}

function doneTask(e) {
  if (e.target.classList.contains("check")) {
    // alert(e.target.classList);
    e.target.classList = "fa-solid fa-circle-check";
    //increase Done Tasks

    localStorage.setItem("counterDone", (counterDone += 1));
    document.getElementById("done2").innerText =
      localStorage.getItem("counterDone");
  } else if (e.target.classList.contains("fa-circle-check")) {
    e.target.classList = "fa fa-circle-thin check";
    //decrease Done Tasks

    localStorage.setItem("counterDone", (counterDone -= 1));
    document.getElementById("done2").innerText =
      localStorage.getItem("counterDone");
  }
}

function searchTask(e) {
  var text = e.target.value;
  var tasks = taskCon.getElementsByTagName("li");
  Array.from(tasks).forEach(function (task) {
    var taskName = task.textContent;

    if (taskName.indexOf(text) == -1) {
      task.style.display = "none";
    } else {
      task.style.display = "inherit";
    }
  });
}
