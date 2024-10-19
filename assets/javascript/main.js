
import { MyList } from "./my_list.js";
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

        //check if there are created lists already;
        if (listKeys.length) {
            //if lists exist, get the last list name and show the whole list;
            const lastListName = listKeys[listKeys.length - 1];
            //get saved category for the list;
            const category = lists[lastListName].category;
            //function to display the list;
            showList(lastListName, category, lists);
            setupAddButton(category, lastListName); // Setup add button for the last list;
            // delete-item*[mapping when every item is added to body]*);
            populateDropdown(lists);
        } else {
            // If no lists, show the popup for creating a new list;
            createListPopup.style.display = "block";
        }

        setupNewButton(createListPopup)
        setupClosePopupButton(createListPopup);
        setupCreateListButton(myListManager);
        setupMyListsButton();
        setupDropdownMenuDivs(lists); //must pass an instance of MyList class that correspond to the list we are iterating in 
        //----must add eventListener delete list;
    });
}

// App entry point
main();

/**
 * Populate the body with the list named `listName` added to the local storage
 * and set up the delete item buttons for each item in the list;
 * @param {str} listName 
 * @param {str} category
 * @param {object} lists 
 */
function showList(listName, category, lists) {
    
    const selectedList = lists[listName].storedItems;
    const listTitle = document.getElementById("list-title");
    const listCategory = document.getElementById("list-category");
    const listOfItems = document.getElementById("display-items");

    listTitle.innerHTML = listName;
    listCategory.innerHTML = `(${category})`;
    listOfItems.innerHTML = "";

    // Populate the items
    for (const itemId in selectedList) {
        const item = selectedList[itemId];
        listOfItems.innerHTML += `<div class="list-items" id=${itemId}>
            <div>${item.name}</div>
            <div class="item-price">${item.price}</div>
            <div class="item-place">${item.place}</div>
            <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
        </div>`;
    }
    
    setupDeleteItemButton(lists[listName]); // Setup delete buttons for each item;
}


//works when creating new list, if list name already exists, it doesnt go there
function populateDropdown(lists){
    
    for (const listName in lists) {
        //aside element with list title and add item form inside;
        const list = document.getElementById("list"); 
        const listTitle = document.getElementById("list-title")
        const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
        const emptyDropDown = document.getElementById("no-list-to-display");

        //it was: lists[listName].listVisible;
        if (lists[listName]) {
            listTitle.innerHTML = listName;
            list.style.display = "block";

            //if first list being created, empty the element and add the list name;
            if (emptyDropDown) {
                dropdownMenu.innerHTML = `<div id="${listName}" class="lists-on-dropdown">
                ${listName}
                </div>
                `
            }
            //if there is a list name already, just add more;
            else {
                dropdownMenu.innerHTML += `<div id="${listName}" class="lists-on-dropdown"">
                ${listName}
                </div>
                `
            }
        }
    }
};

/**
 * Set up New button (opens popup for creating a new list)
 */
function setupNewButton(createList) {
    const newButton = document.getElementById("popup"); //New (list) button;

    newButton.addEventListener("click", () => {
        createList.style.display = "block";
    });
}

/**
 * Set up the Close button for the create list popup
 */
function setupClosePopupButton(createList) {
    //close button;
    const closeCreateList = document.getElementById("close-button");

    closeCreateList.addEventListener("click", () => {
        createList.style.display = "none";
    });
}

/**
 * Set up the create (new list) button in the popup window;
 * @param {MyListManager} myListManager
 */
function setupCreateListButton(myListManager) {

    const createButton = document.getElementById("create-list-button"); //get the create button;
    /**
     * when create button is clicked: hides the popup,
     * and show the create item form with list name on top;
     */
    createButton.addEventListener("click", () => {
        const listName = document.getElementById("list-name").value;
        const category = document.getElementById("category").value;
        myListManager.addToStorage(listName, category);
        //reload the page to refresh event listeners
        location.reload();
    });
};

function addButtonEventListeners(newList, listName) {}

/**
 * Set up the add button to add items to the list and display them;
 * Add event listener to delete item button;
 * Increment the item id and store it in localStorage;
 */
function setupAddButton(category, listName) {
    const addItem = document.getElementById("add-item");//get the add button;
    const newList = new MyList();
    let id = localStorage.getItem('lastItemId') ? parseInt(localStorage.getItem('lastItemId')) : 0;

    if(!addItem.hasClickListener) {
        addItem.addEventListener("click", () => {
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
        `
        newList.onAddButtonClicked(itemName, itemPrice, itemPlace, id, listName);
        setupDeleteItemButton(newList);
        id++;
        //storing the last item id in localStorage in a separate key;
        localStorage.setItem('lastItemId', id);
        });
        addItem.hasClickListener = true;
    }
    else {
        //clone the save button to remove the old event listener
        const newAddButton = addItem.cloneNode(true);
        //replace the old button with the new one
        addItem.parentNode.replaceChild(newAddButton, addItem);

        newAddButton.addEventListener("click", () => {
            const itemName = document.getElementById("item-name").value;
            const itemPrice = document.getElementById("item-price").value;
            const itemPlace = document.getElementById("item-place").value;
            //get the element that will display the items;
            const listOfItems = document.getElementById("display-items");

            listOfItems.innerHTML += `<div class="list-items" id=${id}>
                <div>${itemName}</div>
                <div class="item-price">${itemPrice}</div>
                <div class="item-place
                ">${itemPlace}</div>
                <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
            </div>
            `
            newList.onAddButtonClicked(itemName, itemPrice, itemPlace, id, listName);
            setupDeleteItemButton(newList);
            id++;
            //storing the last item id in localStorage in a separate key;
            localStorage.setItem('lastItemId', id);
        });
    }
    setupSaveButton(newList, category);
}

/**
 * Set up the event listener for the save button;
 */
//removing category from storage after saving for the second time;
function setupSaveButton(newList, category) {
    //save button;
    const saveListButton = document.getElementById("save-list");
    const listTitle = document.getElementById("list-title");
    
    //clone the save button to remove the old event listener
    const newSaveButton = saveListButton.cloneNode(true);
    //replace the old button with the new one
    saveListButton.parentNode.replaceChild(newSaveButton, saveListButton);
    
    newSaveButton.addEventListener("click", () => {
        const listName = listTitle.innerHTML;
        newList.onSaveButtonClicked(listName, category);
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
 */
function setupDropdownMenuDivs(lists) {

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
                const selectedList = lists[listName]; //retornando a list dos items certos de cada lista;
                //get the category of the list;
                const category = selectedList.category;
                //get the elements to display the list name and category;
                const listTitle = document.getElementById("list-title");
                const listCategory = document.getElementById("list-category");

                listTitle.innerHTML = listName;
                listCategory.innerHTML = `(${category})`;
                listOfItems.innerHTML = "";

                for (const itemId in selectedList.getStoredItems) {
                    const item = selectedList.getItem(itemId);
                    listOfItems.innerHTML += `<div class="list-items" id="${itemId}">
                        <div>${item.name}</div>
                        <div class="item-price">${item.price}</div>
                        <div class="item-place">${item.place}</div>
                        <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
                    </div>`;

                    setupDeleteItemButton(selectedList);//must pass an instance of MyList class that correspond to the list we are iterating in
                }

                setupSaveButton(selectedList, category);// Re-map the save button for the selected list
                setupAddButton(category, listName);// not mapping the add button anymore for the previous lists;
            });
            list.hasClickListener = true;
        }
    }
}

/**
 * Set up My Lists button to show dropdown menu with created lists name,
 * and hide it when clicked outside the button;
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