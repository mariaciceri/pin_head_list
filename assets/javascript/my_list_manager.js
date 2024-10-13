import { db, setDoc, doc, collection, getDoc, getDocs } from "./firebase_config.js";

//manage lists: create, delete and retrieve;
export class ListManager {
    constructor() {
    }

/**
 * Save the new created list to Firebase.
 * @param {str} listName  
 * @param {str} category 
 * @param {object} date 
 */
    async _storeList(db, listName, category, date) {
        const listData = {
            category: category,
            date: date
        };
        const listRef = doc(db, "lists", listName)

        try {
            await setDoc(listRef, listData);
            console.log("list created successfully")
        }
        catch (error) {
            console.log("something went wrong", error)
        }
    };

    onCreateListButtonClicked(db, listName, category, date) {
        this._storeList(db, listName, category, date)
    }

}