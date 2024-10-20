import { MyList } from "./my_list.js";
import { MyItem } from "./my_item.js";

//manage lists: create, delete and retrieve;
export class MyListManager {
    constructor() {
        this.myLists = {}; // listName: MyList
        this.localStorageObj = {};
    }

    /**
     * Returns `MyList`by name
     * @param {string} listName 
     * @returns {MyList}
     */
    getMyList(listName) {
        return this.myLists[listName];
    }

    getMyLists() {
        return this.myLists;
    }

    _writeToLocalStorage() {
        localStorage.setItem("shoppingLists", JSON.stringify(this.localStorageObj));
    }
    
    addToStorage(listName, category) {
        //create list to be stored in localStorage
        this.localStorageObj[listName] = {
            storedItems: {},
            category: category
        }
        this._writeToLocalStorage();
    }

    loadFromStorage() {
        this.localStorageObj = JSON.parse(localStorage.getItem('shoppingLists')) || {};
        if (!this.localStorageObj) {
            return;
        }

        this.myLists = {};

        for (const listName in this.localStorageObj) {
            let newList = new MyList(this);
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
        console.log("onAddItemButtonClicked myList", myList);
    }

    /** 
     * @param {MyList} myList
     */
    onSaveButtonClicked(myList) {
        //add the new list on the storage;
        this.localStorageObj[myList.getName()] = {
            storedItems: myList.getStoredItems(),
            category: myList.getCategory() 
        };

        this._writeToLocalStorage();
        console.log("Data saved successfully in localStorage!");
        alert(`Your list ${myList.getName() } has been saved`);
    }

    deleteList(listName) {

    }

}