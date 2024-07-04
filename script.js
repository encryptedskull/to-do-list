const inputBox = document.querySelector(".task-input");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn-add");
const clearBtn = document.querySelector(".clear-btn");
const today = new Date();

const day = today.toLocaleString("en-us", {
    weekday: "long",
});
const date = today.toLocaleString("en-us", {
    day: "2-digit",
});
const month = today.toLocaleString("en-us", {
    month: "short",
});
const years = today.toLocaleString("en-us", {
    year: "2-digit",
});
const formattedDate = `${date} - ${month} - ${years}`;
document.querySelector(".day").textContent = day;
document.querySelector(".date").textContent = formattedDate;

let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

function renderTasks() {
    result.innerHTML = "";
    tasks.forEach((element, i) => {
        const resultContainer = document.createElement("div");
        const taskDiv = document.createElement("div");
        const doneBtn = document.createElement("button");
        resultContainer.setAttribute("class", "result-container");
        taskDiv.setAttribute("class", "task-div");
        doneBtn.setAttribute("class", "done-btn");
        taskDiv.setAttribute("data-id", i);
        taskDiv.textContent = `${i + 1}.  ${element.task}`;
        doneBtn.textContent = "❌";

        if (element.done) {
            taskDiv.classList.add("task-done");
            doneBtn.textContent = "✔";
            const deleteText = document.createElement("del");
            deleteText.textContent = taskDiv.textContent;
            taskDiv.textContent = "";
            taskDiv.appendChild(deleteText);
            taskDiv.style.color = "gray";
        }

        resultContainer.appendChild(taskDiv);
        resultContainer.appendChild(doneBtn);
        result.appendChild(resultContainer);

        doneBtn.addEventListener("click", function () {
            tasks[i].done = !tasks[i].done;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });
    });
}

renderTasks();

btn.addEventListener("click", function () {
    const task = inputBox.value;
    if (!task) return;
    tasks.push({ task: task, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputBox.value = "";
    renderTasks();
});

clearBtn.addEventListener("click", function () {
    if (tasks.length === 0) {
        return;
    }
    if (confirm("Do you want to clear your tasks?")) {
        localStorage.clear();
        tasks = [];
        renderTasks();
    }
});
