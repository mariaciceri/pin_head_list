//manage items on the list:  delete

import { MyItem } from "./my_item.js";
import { MyListManager } from "./my_list_manager.js"

export class MyList {
    constructor() {
        this.storedItems = {}; // itemId: MyItem
        this.newList = new MyListManager(); // TODO: there should be no list manager in this class
        this.category = "Other";
    }

    setCategory(category) {
        this.category = category;
    }

    addItem(id, item) {
        this.storedItems[id] = item;
    }

    getItem(id) {
        return this.storedItems[id];
    }

    getStoredItems() {
        return this.storedItems;
    }

    onAddButtonClicked(itemName, itemPrice, itemPlace, id, listName) {
        const currentItems = this.retrieveListByName(listName);
        console.log(listName, "inside onAddButtonClicked");
        const newItem = new MyItem(itemName, itemPrice, itemPlace);
        
        if(currentItems.length === 0) {
            this.storedItems[id] = newItem;
        }
        else {
            this.storedItems = currentItems;
            this.storedItems[id] = newItem;
        }
        console.log(this.storedItems, "inside onAddButtonClicked");
    }

    onSaveButtonClicked (listName, category) {
        console.log(this.storedItems, "inside onSaveButtonClicked"); 
        this.newList._onSaveButtonClicked(listName, this.storedItems, category);
    }

    retrieveListByName(listName) {
        this.storedItems = this.newList._retrieveListByName(listName); //it is retrieving the stored items correctly;
        console.log(this.storedItems, "inside retrieveListByName");
        return this.storedItems;
    }

    // not deleting anymore
    deleteItemFromStoredItems(itemId) {
        delete this.storedItems[itemId];
    }
       
}