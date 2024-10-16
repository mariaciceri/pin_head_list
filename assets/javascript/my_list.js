//manage items on the list:  delete

import { MyItem } from "./my_item.js";
import { ListManager } from "./my_list_manager.js"

export class MyList {
    constructor() {
        this.storedItems = {};
        this.newList = new ListManager();
    }

    onAddButtonClicked(itemName, itemPrice, itemPlace, id) {
        const newItem = new MyItem(itemName, itemPrice, itemPlace);
        this.storedItems[id] = newItem; 
    }

    onSaveButtonClicked (listName) {
        this.newList._onSaveButtonClicked(listName, this.storedItems);
    }

    retrieveListByName(listName) {
        this.storedItems = this.newList._retrieveListByName(listName);
        return this.storedItems;
    }

    // not deleting anymore
    deleteItemFromStoredItems(itemId) {
        // const shoppingLists = JSON.parse(localStorage.getItem('shoppingLists'));
        // this.storedItems = shoppingLists[listName].storedItems;
        delete this.storedItems[itemId];
    }
       
}