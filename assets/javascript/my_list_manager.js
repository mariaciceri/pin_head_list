
//manage lists: create, delete and retrieve;
export class ListManager {
    constructor() {
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