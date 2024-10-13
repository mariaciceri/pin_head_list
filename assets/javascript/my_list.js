//manage items on the list:  delete

import { MyItem } from "./my_item.js";

export class MyList {
    constructor() {
        this.storedItems = {};
    }

    onAddButtonClicked(itemName, itemPrice, itemPlace, id) {
        const newItem = new MyItem(itemName, itemPrice, itemPlace);
        this.storedItems[id] = newItem; 
    }

    onSaveButtonClicked (listName) {
        this._addItemsList(db, listName, this.storedItems);
    }

    deleteItemFromStoredItems(itemId) {
        delete this.storedItems[itemId];
    }
       
}