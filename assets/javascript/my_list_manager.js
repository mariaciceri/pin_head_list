
//manage lists: create, delete and retrieve;
export class ListManager {
    constructor() {
    }

    _onSaveButtonClicked(listName, storedItems) {
        //retrieves what is saved already or creates an empty object;
        const lists = JSON.parse(localStorage.getItem('shoppingLists')) || {};
        //add the new list on the storage;
        lists[listName] = {
            storedItems: storedItems,
            listVisible: true };
        //saves the new list on the storage;
        localStorage.setItem('shoppingLists', JSON.stringify(lists))
        console.log("Data saved successfully in localStorage!");
        alert(`Your list ${listName} has been saved`);
    }

    _retrieveListByName(listName, storedItems) {
        try {
            const storedList = JSON.parse(localStorage.getItem('shoppingLists'));
            storedItems = storedList[listName].storedItems;
            return storedItems;
        }
        catch (error) {
            console.log("List not found", error);
        }
    }

    deleteList() {

    }

}