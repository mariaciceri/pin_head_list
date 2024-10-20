
import { MyListManager } from "./my_list_manager.js";


function main() {
    let myListManager = new MyListManager();
    
    // Set up event listeners for when the page is reloaded
    document.addEventListener("DOMContentLoaded", () => {
        myListManager.loadFromStorage();
        const lists = myListManager.getMyLists();
        //get all the keys (list names) from MyListManager;
        const listKeys = Object.keys(lists);
        //get the aside element that contains the create new list form;
        const createListPopup = document.getElementById("create-list");
        const overlay = document.getElementById("overlay"); 

        //check if there are created lists already;
        if (listKeys.length) {
            const lastListName = listKeys[listKeys.length - 1];
            const lastList = myListManager.getMyList(lastListName);
            showList(lastList);
            setupAddItemButton(lastList, myListManager); // Setup add button for the last list;
            setupSaveButton(lastList, myListManager); // Setup save button for the last list;
            populateDropdown(lists);
        } else {
            // If no lists, show the popup for creating a new list;
            createListPopup.style.display = "block";
            overlay.style.display = "block";
        }

        setupNewButton(createListPopup, overlay);//create new list button;
        setupClosePopupButton(createListPopup, overlay);//close create list popup button;
        setupCreateListButton(myListManager);//create new list button;
        setupMyListsButton();//show dropdown menu with created lists name;
        setupDeleteListButton(overlay);//when delete list button is clicked, show the popup;
        setupDeleteListNoButton(overlay);//when NO is clicked, close the popup;
        setupDeleteListYesButton(myListManager);//when YES is clicked, delete the list;
        setupDropdownMenuDivs(lists, myListManager);//set up event listeners for the dropdown menu divs;
    });
}

// App entry point
main();

/**
 * Populate the body with `myList` and set up the delete item buttons for 
 * each item in the list.
 * @param {MyList} myList 
 */
function showList(myList) {
    const listTitle = document.getElementById("list-title");
    const listCategory = document.getElementById("list-category");
    const listOfItems = document.getElementById("display-items");

    listTitle.innerHTML = myList.getName();
    listCategory.innerHTML = `(${myList.getCategory()})`;
    listOfItems.innerHTML = "";

    // Populate the items
    for (const itemId in myList.getStoredItems()) {
        const item = myList.getItem(itemId);
        listOfItems.innerHTML += `<div class="list-items" id=${itemId}>
            <div>${item.name}</div>
            <div class="item-price">${item.price}</div>
            <div class="item-place">${item.place}</div>
            <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
        </div>`;
    }
    
    setupDeleteItemButton(myList); // Setup delete buttons for each item;
}


/**
 * Populate the dropdown menu with the list names;
 * @param { object } lists 
 */
function populateDropdown(lists){
    
    for (const listName in lists) {
        //aside element with list title and add item form inside;
        const list = document.getElementById("list"); 
        const listTitle = document.getElementById("list-title");
        const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
        const emptyDropDown = document.getElementById("no-list-to-display");

        if (lists[listName]) {
            listTitle.innerHTML = listName;
            list.style.display = "block";

            //if first list being created, empty the element and add the list name;
            if (emptyDropDown) {
                dropdownMenu.innerHTML = `<div id="${listName}" class="lists-on-dropdown">
                &rarr;${listName}
                </div>
                `;
            }
            //if there is a list name already, just add more;
            else {
                dropdownMenu.innerHTML += `<div id="${listName}" class="lists-on-dropdown"">
                &rarr;${listName}
                </div>
                `
            }
        }
    }
}

/**
 * Set up New button to open the create list popup;
 * @param {HTMLElement} createList
 */
function setupNewButton(createList, overlay) {
    const newButton = document.getElementById("popup"); //New (list) button;

    newButton.addEventListener("click", () => {
        createList.style.display = "block";
        overlay.style.display = "block";
    });
}

/**
 * Set up the delete list button to show the delete list popup;
 */
function setupDeleteListButton(overlay) {
    const deleteListButton = document.getElementById("delete-list");
    const deleteListPopup = document.getElementById("delete-list-popup");

    deleteListButton.addEventListener("click", () => {
        deleteListPopup.style.display = "block";
        overlay.style.display = "block";
    });
}

/**
 * Set up the Yes button to delete the list;
 * @param {MyListManager} myListManager
 */
function setupDeleteListYesButton(myListManager) {
    const deleteListYesButton = document.getElementById("delete-list-yes");

    deleteListYesButton.addEventListener("click", () => {
        const listTitle = document.getElementById("list-title").innerHTML;
        myListManager.deleteList(listTitle);
        location.reload();
    });
}

/**
 * Set up the No button to close the delete list popup;
 */
function setupDeleteListNoButton(overlay) {
    const deleteListNoButton = document.getElementById("delete-list-no");
    const deleteListPopup = document.getElementById("delete-list-popup");

    deleteListNoButton.addEventListener("click", () => {
        deleteListPopup.style.display = "none";
        overlay.style.display = "none";
    });
}

/**
 * Set up the Close button for the create list popup;
 */
function setupClosePopupButton(createList, overlay) {
    //close button;
    const closeCreateList = document.getElementById("close-button"); 

    closeCreateList.addEventListener("click", () => {
        createList.style.display = "none";
        overlay.style.display = "none";
    });
}

/**
 * Check if the input field for the list name is not empty;
 */
function checkCreateListInputs() {
    const listName = document.getElementById("list-name").value.trim();
    const createButton = document.getElementById("create-list-button");
    const createButtonDisable = document.getElementById("create-list-button-disable");

    if (listName) {
        createButton.disabled = false;
        createButton.style.display = "block";
        createButtonDisable.style.display = "none";
    } else {
        createButton.disabled = true;
        createButton.style.display = "none";
        createButtonDisable.style.display = "block";
    }
}

/**
 * Set up the create (new list) button in the popup window;
 * @param {MyListManager} myListManager
 */
function setupCreateListButton(myListManager) {

    const tooltip = document.getElementById("tooltip");
    const listNameInput = document.getElementById("list-name");
    const createButton = document.getElementById("create-list-button");
    const createButtonDisable = document.getElementById("create-list-button-disable");

    createButton.disabled = true;
    createButton.style.display = "none";
    createButtonDisable.style.display = "block";

    listNameInput.addEventListener("input", checkCreateListInputs);
    
    createButton.addEventListener("click", () => {
        const existingList = myListManager.getMyList(listNameInput.value); 
        
        if (existingList) {
            // Show the tooltip
            tooltip.parentElement.classList.add("show"); 
            // Hide after 3 seconds
            setTimeout(() => {
                tooltip.parentElement.classList.remove("show"); 
            }, 3000);
        } 
        else {
            createButton.disabled = true;
            const listName = document.getElementById("list-name").value;
            const category = document.getElementById("category").value;
            myListManager.addToStorage(listName, category);
            //reload the page to refresh event listeners
            location.reload();
            }
    });
}

/**
 * Check if the input fields for the item name is not empty;
 */
function checkInputs() {
    const itemName = document.getElementById("item-name").value.trim();
    const addItemButton = document.getElementById("add-item");

    // Enable the button if item name has a value
    if (itemName) {
        addItemButton.disabled = false;
    } else {
        addItemButton.disabled = true; // Disable if item name is empty
    }
}

/**
 * Set up the event listener for the add button;
 * @param {MyList} myList
 * @param {MyListManager} myListManager
 */
function setupAddItemButton(myList, myListManager) {
    const addItem = document.getElementById("add-item");//get the add button;
    const itemNameInput = document.getElementById("item-name");// get the input field

    itemNameInput.addEventListener("input", checkInputs);

    //clone the save button to remove the old event listener
    const newAddButton = addItem.cloneNode(true);
    //replace the old button with the new one
    addItem.parentNode.replaceChild(newAddButton, addItem);

    newAddButton.disabled = true;

    newAddButton.addEventListener("click", () => {
        newAddButton.disabled = true;
        addButtonOnClick(myList, myListManager);
        itemNameInput.focus();
    });
}

/**
 * Add item to the list and display it;
 * @param {MyList} myList 
 * @param {MyListManager} myListManager
 */
function addButtonOnClick(myList, myListManager) {
    let id = localStorage.getItem('lastItemId') ? parseInt(localStorage.getItem('lastItemId')) : 0;
    
    const itemName = document.getElementById("item-name").value;
    const itemPrice = document.getElementById("item-price").value;
    const itemPlace = document.getElementById("item-place").value;
    //get the element that will display the items;
    const listOfItems = document.getElementById("display-items");

    listOfItems.innerHTML += `<div class="list-items" id=${id}>
                <div>${itemName}</div>
                <div class="item-price">${itemPrice}</div>
                <div class="item-price">${itemPlace}</div>
                <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
            </div>
            `;

    myListManager.onAddItemButtonClicked(myList.getName(), itemName, itemPrice, itemPlace, id);
    setupDeleteItemButton(myList);
    id++;
    //storing the last item id in localStorage in a separate key;
    localStorage.setItem('lastItemId', id);

    //clear the input fields;
    document.getElementById("item-name").value = '';
    document.getElementById("item-price").value = '';
    document.getElementById("item-place").value = '';
}


/**
 * Set up the event listener for the save button;
 * @param {MyList} myList
 * @param {MyListManager} myListManager
 */
function setupSaveButton(myList, myListManager) {
    //save button;
    const saveListButton = document.getElementById("save-list");
    //clone the save button to remove the old event listener
    const newSaveButton = saveListButton.cloneNode(true);
    //replace the old button with the new one
    saveListButton.parentNode.replaceChild(newSaveButton, saveListButton);
    
    newSaveButton.addEventListener("click", () => {
        myListManager.onSaveButtonClicked(myList);
    });
}


/**
 * Delete item from the HTML and from the stored items;
 * @param {MyList} newList
 */
function setupDeleteItemButton(newList) {
    let deleteButtons = document.getElementsByClassName("delete-item");

    for (let button of deleteButtons) {
        button.addEventListener("click", (event) => {
            const itemDiv = event.target.closest(".list-items");
            const itemId = itemDiv.id;
            itemDiv.remove();
            newList.deleteItemFromStoredItems(itemId);
        });
    }
}

/**
 * Set up event listeners for the dropdown menu divs;
 * @param { object } lists
 * @param { MyListManager } myListManager
 */
function setupDropdownMenuDivs(lists, myListManager) {

    const listNames = document.getElementsByClassName("lists-on-dropdown");//get all the list names in the dropdown menu;
    const listOfItems = document.getElementById("display-items");//get the element that will display the items;

    //iterate over the list names and add event listener to each;
    for (let list of listNames) {
        //if the list does not have a click listener, add one;
        if (!list.hasClickListener) {
            list.addEventListener("click", () => {
                //list.id is the list name;
                const listName = list.id; 
                //retrieve the list from localStorage;
                const selectedList = lists[listName];
                //get the category of the list;
                const category = selectedList.category;
                //get the elements to display the list name and category;
                const listTitle = document.getElementById("list-title");
                const listCategory = document.getElementById("list-category");

                listTitle.innerHTML = listName;
                listCategory.innerHTML = `(${category})`;
                listOfItems.innerHTML = "";

                for (const itemId in selectedList.getStoredItems()) {
                    const item = selectedList.getItem(itemId);
                    listOfItems.innerHTML += `<div class="list-items" id="${itemId}">
                        <div>${item.name}</div>
                        <div class="item-price">${item.price}</div>
                        <div class="item-place">${item.place}</div>
                        <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
                    </div>`;

                    setupDeleteItemButton(selectedList);//must pass an instance of MyList class that correspond to the list we are iterating in
                } 

                setupSaveButton(selectedList, myListManager);// Re-map the save button for the selected list
                setupAddItemButton(selectedList, myListManager);// not mapping the add button anymore for the previous lists;
            });
            list.hasClickListener = true;
        }
    }
}

/**
 * Show the dropdown menu with the list names;
 */
function setupMyListsButton() {
    const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
    const myListsButton = document.getElementById("my-lists");
    const body = document.getElementsByTagName("body")[0];

    myListsButton.addEventListener("click", () => {
        dropdownMenu.style.display = "block";
    });

    body.addEventListener("click", (event) => {
        if(event.target !== myListsButton && !myListsButton.contains(event.target)) 
        {
            dropdownMenu.style.display = "none";
        }
    });
}