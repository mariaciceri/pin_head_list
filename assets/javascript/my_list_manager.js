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
     */
    getMyList(listName) {
        return this.myLists[listName];
    }

    getMyLists() {
        return this.myLists;
    }

    addToStorage(listName, category) {
        //create list to be stored in localStorage
        this.localStorageObj[listName] = {
            storedItems: {},
            category: category
        }
        //save newly created list in localStorage
        localStorage.setItem("shoppingLists", JSON.stringify(this.localStorageObj));
    }

    loadFromStorage() {
        this.localStorageObj = JSON.parse(localStorage.getItem('shoppingLists')) || {};
        if (!this.localStorageObj) {
            return;
        }

        this.myLists = {};

        for (const listName in this.localStorageObj) {
            let newList = new MyList();
            newList.setCategory(this.localStorageObj[listName].category);
            this.myLists[listName] = newList;
            
            for (const id in newList.storedItems) {
                let myItem = new MyItem(
                    newList.storedItems[id].name, 
                    newList.storedItems[id].price, 
                    newList.storedItems[id].place
                );
                
                newList.addItem(id, myItem);
            }
        }
    }

    _onSaveButtonClicked(listName, storedItems, category) {
        //retrieves what is saved already;
        const lists = JSON.parse(localStorage.getItem('shoppingLists'));

        //add the new list on the storage;
        lists[listName] = {
            storedItems: storedItems,
            category: category //im passing the category everytime I save, it shouldnt erase it when I click save;
        };

        //saves the new list on the storage;
        localStorage.setItem('shoppingLists', JSON.stringify(lists))
        console.log("Data saved successfully in localStorage!");
        alert(`Your list ${listName} has been saved`);
    }

    _retrieveListByName(listName) {
        try {
            const storedList = JSON.parse(localStorage.getItem('shoppingLists'));
            let storedItems = storedList[listName].storedItems;
            return storedItems;
        }
        catch (error) {
            console.log("List not found", error);
        }
    }

    deleteList() {

    }

}