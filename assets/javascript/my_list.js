//manage items on the list:  delete

import { MyItem } from "./my_item.js";
import { MyListManager } from "./my_list_manager.js"

export class MyList {
    /**
     * @param {MyListManager} myListManager 
     */
    constructor(myListManager) {
        this.storedItems = {}; // itemId: MyItem
        this.category = "Other";
        this.name = "";
    }

    getCategory() {
        return this.category;
    }
    
    setCategory(category) {
        this.category = category;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    /**
     * @param {string} id
     * @param {MyItem} item 
     */
    addItem(id, item) {
        this.storedItems[id] = item;
    }

    getItem(id) {
        return this.storedItems[id];
    }

    getStoredItems() {
        return this.storedItems;
    }

    // not deleting anymore
    deleteItemFromStoredItems(itemId) {
        delete this.storedItems[itemId];
    }
       
}