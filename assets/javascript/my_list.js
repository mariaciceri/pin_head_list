//manage items on the list:  delete

import { MyItem } from "./my_item.js";
import { ListManager } from "./my_list_manager.js"

export class MyList {
    constructor() {
        this.storedItems = {};
        this.newList = new ListManager();
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