import { MyList } from "./my_list.js";
import { MyItem } from "./my_item.js";

export class MyListManager {
    constructor() {
        this.myLists = {};
        this.localStorageObj = {};
    }

    /**
     * Returns `MyList`by name;
     * @param {string} listName 
     * @returns {MyList}
     */
    getMyList(listName) {
        return this.myLists[listName];
    }

    /**
     * Returns all lists;
     */
    getMyLists() {
        return this.myLists;
    }

    /**
     * Save to localStorage;
     */
    _writeToLocalStorage() {
        localStorage.setItem("shoppingLists", JSON.stringify(this.localStorageObj));
    }
    
    /**
     * Create list to be stored in localStorage and call the method to save it;
     * @param {string} listName
     * @param {string} category
     */
    addToStorage(listName, category) {
   
        this.localStorageObj[listName] = {
            storedItems: {},
            category: category
        };
        this._writeToLocalStorage();
    }

    /**
     * Load data from localStorage;
     */
    loadFromStorage() {
        this.localStorageObj = JSON.parse(localStorage.getItem('shoppingLists')) || {};
        if (this.localStorageObj.length) {
            return;
        }

        this.myLists = {};

        for (const listName in this.localStorageObj) {
            let newList = new MyList();
            newList.setCategory(this.localStorageObj[listName].category);
            newList.setName(listName);
            
            for (const id in this.localStorageObj[listName].storedItems) {
                let myItem = new MyItem(
                    this.localStorageObj[listName].storedItems[id].name, 
                    this.localStorageObj[listName].storedItems[id].price, 
                    this.localStorageObj[listName].storedItems[id].place,
                    id
                );
                
                newList.addItem(id, myItem);
            }

            this.myLists[listName] = newList;
        }
    }

    /**
     * Call method to add item to the storedItems;
     * @param {string} listName 
     * @param {string} itemName 
     * @param {string} itemPrice 
     * @param {string} itemPlace 
     * @param {int} itemId 
     */
    onAddItemButtonClicked(listName, itemName, itemPrice, itemPlace, itemId) {
        const myItem = new MyItem(itemName, itemPrice, itemPlace, itemId);
        const myList = this.getMyList(listName);
        myList.addItem(itemId, myItem);
    }

    /** 
     * Update existing list in localStorage;
     * @param {MyList} myList
     */
    onSaveButtonClicked(myList) {
        this.localStorageObj[myList.getName()] = {
            storedItems: myList.getStoredItems(),
            category: myList.getCategory() 
        };

        this._writeToLocalStorage();
    }

    /**
     * Delete list from localStorage;
     * @param {string} listName
     */
    deleteList(listName) {
        delete this.localStorageObj[listName];
        this._writeToLocalStorage();
        alert(`Your list ${listName} has been deleted`);
    }
}