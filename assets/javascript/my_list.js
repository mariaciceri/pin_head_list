//manage items on the list:  delete

import { MyItem } from "./my_item.js";

export class MyList {
    constructor() {
        this.storedItems = {};
    }

    async _addItemsList() {
        //it is being called when the button is clicked
        console.log(this.storedItems);
    }

    async _deleteItem() {

    }

    onAddButtonClicked(itemName, itemPrice, itemPlace, id) {
        const newItem = new MyItem(itemName, itemPrice, itemPlace);
        this.storedItems[id] = newItem; 
    }

    onSaveButtonClicked () {
        this._addItemsList();
    }

    deleteItemFromStoredItems(itemId) {
        delete this.storedItems[itemId];
    }
       
}