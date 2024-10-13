//manage items on the list: display, delete, add;

import { MyItem } from "./my_item";

export class MyList {
    constructor() {
        this.storedItems = {};
        this.currentId = 0;
    }

    async _addItemsList () {

    }

    onAddButtonClicked () {
        const newItem = new MyItem(itemName, itemPrice, itemPlace);
        this.storedItems[this.currentId] = newItem; 
        this.currentId++;
    }

    onSaveButtonClicked () {
        this._addItemsList();
    }
}