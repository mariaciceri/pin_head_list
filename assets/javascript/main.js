
import { MyList } from "./my_list.js";

/**
 * Show popup window for creating a new list;
 * Close button;
 * Create button that will create list, hide the list creation popup
 * and show the create items form;
 */
function setupCreateListButtons() {
    const newButton = document.getElementById("popup"); //New (list) button
    const closeCreateList = document.getElementById("close-button");//close button
    const createList = document.getElementById("create-list"); //get the aside element that contains the create new list form;
    const createButton = document.getElementById("create-list-button"); //get the create button


    newButton.addEventListener("click", () => {
        createList.style.display = "block";
    });

    closeCreateList.addEventListener("click", () => {
        createList.style.display = "none";
    });

    /**
     * when create button is clicked: hides the popup,
     * and show the create item form with list name on top;
     */
    createButton.addEventListener("click", () => {
        const listName = document.getElementById("list-name").value;
        const category = document.getElementById("category").value;

        //retrieve or create shopping lists object
        const lists = JSON.parse(localStorage.getItem("shoppingLists")) || {};

        //create list to be stored in localStorage
        lists[listName] = {
            storedItems: {},
            listVisible: true
        }

        //save newly created list in localStorage
        localStorage.setItem("shoppingLists", JSON.stringify(lists));

        //reload the page to refresh event listeners
        location.reload();
    });
    
};

//works when creating new list, if list name already exists, it doesnt go there
(() => {
    const lists = JSON.parse(localStorage.getItem("shoppingLists"));
    for(const listName in lists) {
        const list = document.getElementById("list");
        const listTitle = document.getElementById("list-title")
        const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
        const emptyDropDown = document.getElementById("no-list-to-display");

        if (lists[listName].listVisible) {
            listTitle.innerHTML = listName;
            list.style.display = "block";

            if (emptyDropDown) {
                dropdownMenu.innerHTML = `<div id="${listName}" class="lists-on-dropdown">
            ${listName}
            </div>
            `
            }
            else {
                dropdownMenu.innerHTML += `<div id="${listName}" class="lists-on-dropdown"">
            ${listName}
            </div>
            `
            }      
        }
    }
})();

/**
 * Creates new item with unique ID and insert them in the HTML; 
 * Add event listener to delete and savebutton;
 */
function setupListButtons() {
    const addItem = document.getElementById("add-item"); //getting the form for new item
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

    saveListButton.addEventListener("click", () => {
        newList.onSaveButtonClicked(listName);
        setupDropdownMenuDivs(listName);
    });
    
}

/**
 * Open list when clicked on the name in the dropdown menu;
 */
function setupDropdownMenuDivs() {
    const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
    const listNames = document.getElementsByClassName("lists-on-dropdown"); //getting all the div with list names that the user created

    for(let list of listNames) {
        list.addEventListener("click", () => {
            //retrieve info from storage

            dropdownMenu.style.display = "none";
        });
    }
}

/**
 * Set up My Lists button to show dropdown menu with created lists name;
 */
function setupMyListsButton() {
    const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
    const myListsButton = document.getElementById("my-lists");
    const body = document.getElementsByTagName("body")[0];

    myListsButton.addEventListener("click", () => {
        dropdownMenu.style.display = "block";
    })

    body.addEventListener("click", (event) => {
        if(event.target !== myListsButton && !myListsButton.contains(event.target)) 
        {
            dropdownMenu.style.display = "none";
        }
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
    //will setup the buttons for the new list and create an instance of MyList
    setupListButtons(); 
});






