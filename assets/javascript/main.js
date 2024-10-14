
import { MyList } from "./my_list.js";

/**
 * Show popup window for creating a new list;
 * Close button;
 * Submit button that will create and store list on the server, hide the list creation popup
 * and show the create items form;
 */
function setupCreateListButtons() {
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

    /**
     * when submit button is clicked: submit list to localStorage, hides the popup,
     * and show the create item form;
     */
    submitButton.addEventListener("click", () => {

        const listName = document.getElementById("list-name").value;
        const category = document.getElementById("category").value;
        const date = new Date().toISOString();
        const list = document.getElementById("list");
        const listTitle = document.getElementById("list-title");

        createList.style.display = "none";
        listTitle.innerHTML = listName;
        list.style.display = "block";

        //will setup the buttons for the new list and create an instance of MyList
        setupListButtons();
    });
};

/**
 * Creates new item with unique ID and insert them in the HTML; 
 * Add event listener to delete and savebutton;
 */
function setupListButtons() {
    const addItem = document.getElementById("add-item");
    const newList = new MyList();
    let id = 0;

    addItem.addEventListener("click", () => {
        const itemName = document.getElementById("item-name").value;
        const itemPrice = document.getElementById("item-price").value;
        const itemPlace = document.getElementById("item-place").value;
        const listOfItems = document.getElementById("display-items");
        
        listOfItems.innerHTML += `<div class="list-items" id=${id}>
            <div>${itemName}</div>
            <div class="item-price">${itemPrice}</div>
            <div class="item-price">${itemPlace}</div>
            <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
        </div>
    `
        newList.onAddButtonClicked(itemName, itemPrice, itemPlace, id);
        setupDeleteItemButton(newList);
        id++;
    });

    setupSaveButton(newList);
}

/**
 * Save list button event listener;
 */
function setupSaveButton(newList) {
    const listName = document.getElementById("list-title").innerText
    const saveListButton = document.getElementById("save-list");
    const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
    const emptyDropDown = document.getElementById("no-list-to-display");

    saveListButton.addEventListener("click", () => {
        
        if(emptyDropDown){
            dropdownMenu.innerHTML = `<div id="${listName}">
            ${listName}
            </div>
            `
        }
        else{
            dropdownMenu.innerHTML += `<div id="${listName}">
            ${listName}
            </div>
            `
        }      
        newList.onSaveButtonClicked(listName);
        setupDropdownMenuDivs(listName);
    });
    
}

/**
 * Open list when clicked on the name in the dropdown menu;
 */
function setupDropdownMenuDivs(listName) {
    const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
    const list = document.getElementById(listName);

    list.addEventListener("click", () => {
        //retrieve info from storage

        dropdownMenu.style.display = "none";
    })
}

/**
 * Set up My Lists button to show dropdown menu with created lists name;
 */
function setupMyListsButton() {
    const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
    const myListsButton = document.getElementById("my-lists");

    myListsButton.addEventListener("click", () => {
        dropdownMenu.style.display = "block";
    })
}

/**
 * Delete item from the HTML
 */
function setupDeleteItemButton(newList) {
    let deleteButtons = document.getElementsByClassName("delete-item");

    for(let button of deleteButtons) {
        button.addEventListener("click", (event) => {
            const itemDiv = event.target.closest(".list-items");
            const itemId = itemDiv.id;
            itemDiv.remove();
            newList.deleteItemFromStoredItems(itemId);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {   
    setupCreateListButtons();
    setupMyListsButton();
});






