import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
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
});

onValue(projectListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        clearprojectListEl();
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];

            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            appendItemToprojectListEl(currentItem);
        }
    } else {
        projectListEl.innerHTML = "No Projects here... yet";
    }
});

function clearprojectListEl() {
    projectListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToprojectListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `projectList/${itemID}`);

        remove(exactLocationOfItemInDB);
    });

    projectListEl.append(newEl);
}
