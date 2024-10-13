// Import the functions from the SDKs 
import { db } from "./firebase_config.js";
import { MyItem } from "./my_item.js";
import { MyList } from "./my_list.js";
import { ListManager } from "./my_list_manager.js";


/**
 * Show popup window for creating a new list;
 * Close button;
 * Submit button that will create and store list on the server, hide the list creation popup
 * and show the create items form;
 */
function setupCreateListButtons(listManager) {
    const newButton = document.getElementById("popup"); //New (list) button
    const closeCreateList = document.getElementById("close-button");//close button
    const createList = document.getElementById("create-list"); //get the aside element that contains the create new list form;
    const submitButton = document.getElementById("submit-list"); //get the submit button

    newButton.addEventListener("click", () => {
        createList.style.display = "block";
    });

    closeCreateList.addEventListener("click", () => {
        createList.style.display = "none";
    });

    // when submit button is clicked: submit list to Firebase, hides the popup,
    // and show the create item form.
    submitButton.addEventListener("click", (event) => {

        const listName = document.getElementById("list-name").value;
        const category = document.getElementById("category").value;
        const date = new Date().toISOString();
        const list = document.getElementById("list");
        const listTitle = document.getElementById("list-title");

        listManager.onCreateListButtonClicked(db, listName, category, date);
        createList.style.display = "none";
        listTitle.innerHTML = listName;
        list.style.display = "block";
    });
};

/**
 * Creates new item with unique ID and insert them in the HTML. Add event listener to delete button.
 */
function setupAddItemButton() {
    const addItem = document.getElementById("add-item");

    addItem.addEventListener("click", () => {
        const itemName = document.getElementById("item-name").value;
        const itemPrice = document.getElementById("item-price").value;
        const itemPlace = document.getElementById("item-place").value;
        const listOfItems = document.getElementById("display-items");
        
        listOfItems.innerHTML += `<div class="list-items">
            <div>${itemName}</div>
            <div class="item-price">${itemPrice}</div>
            <div class="item-price">${itemPlace}</div>
            <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
        </div>
    `

        deleteItem();
    });
}

/**
 * Delete item from the HTML
 */
function deleteItem() {
    let deleteButtons = document.getElementsByClassName("delete-item");

    for(let button of deleteButtons) {
        button.addEventListener("click", (event) => {
            let itemDiv = event.target.closest(".list-items");
            itemDiv.remove();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {   
    let listManager = new ListManager();
    
    setupCreateListButtons(listManager);
    createItem();
});






