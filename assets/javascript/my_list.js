
export class MyList {
    constructor() {
        this.storedItems = {};
        this.category = "Other";
        this.name = "";
    }

    /**
     * @returns {string}
     */
    getCategory() {
        return this.category;
    }
    
    /**
     * @returns {string}
     */
    setCategory(category) {
        this.category = category;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {string}
     */
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

    /**
     * @returns { object }
     */
    getItem(itemId) {
        return this.storedItems[itemId];
    }

    /**
     * @returns { object }
     */
    getStoredItems() {
        return this.storedItems;
    }

    /**
     * @param {string} itemId 
     */
    deleteItemFromStoredItems(itemId) {
        delete this.storedItems[itemId];
    } 
}