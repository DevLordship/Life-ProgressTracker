import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL:
        "https://mytodoapp-6ebee-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const projectListInDB = ref(database, "projectList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const projectListEl = document.getElementById("project-list");

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;
    push(projectListInDB, inputValue);
    clearInputFieldEl();

    appendItemToprojectListEl(inputValue);
});

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToprojectListEl(itemValue) {
    projectListEl.innerHTML += `<li>${itemValue}</li>`;
}
