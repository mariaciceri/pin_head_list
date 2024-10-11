// Import the functions from the SDKs 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { setDoc, doc, getDoc, getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPvm9RW7ABgg2u8ZX4FjQFN5moWOHoxbg",
    authDomain: "pin-8e7c8.firebaseapp.com",
    projectId: "pin-8e7c8",
    storageBucket: "pin-8e7c8.appspot.com",
    messagingSenderId: "463561637941",
    appId: "1:463561637941:web:5d71e7900e1b80b517b17c",
    measurementId: "G-7BFSEETLVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



/**
 * Show popup window for creating a new list
 */
function createNewList() {
    const newButton = document.getElementById("popup"); //New (list) button
    const closeCreateList = document.getElementById("close-button");//close button
    const createList = document.getElementById("create-list"); //get the aside element that contains the create new list form;
    const submitButton = document.getElementById("submit-list"); //get the submit button

    newButton.addEventListener("click", () => {
        createList.style.display = "block";
    });

    closeCreateList.addEventListener("click", () => {
        createList.style.display = "none";
    });

    // when submit button is clicked: submit list to Firebase, hides the popup,
    // and show the create item form.
    submitButton.addEventListener("click", (event) => {

        const listName = document.getElementById("list-name").value;
        const category = document.getElementById("category").value;
        const date = new Date().toISOString();
        const list = document.getElementById("list");
        const listTitle = document.getElementById("list-title");
        
        storeList(db, listName, category, date);
        createList.style.display = "none";
        listTitle.innerHTML = listName;
        list.style.display = "block";
    });
};

function createItem() {
    const addItem = document.getElementById("add-item");
    let itemId = 1;

    addItem.addEventListener("click", () => {
        const itemName = document.getElementById("item-name").value;
        const itemPrice = document.getElementById("item-price").value;
        const itemPlace = document.getElementById("item-place").value;
        const listOfItems = document.getElementById("display-items");
        

        listOfItems.innerHTML += `<div class="list-items" id="${itemId}">
            <div>${itemName}</div>
            <div class="item-price">${itemPrice}</div>
            <div class="item-price">${itemPlace}</div>
            <div class="delete-item"><i class="fa-solid fa-circle-xmark"></i></div>
        </div>
    `
        itemId += 1;
        deleteItem(); //adicionando so no primeiro item
    });
}

function deleteItem() {
    // let deleteButtons = document.getElementsByClassName("delete-item");
    const button = document.getElementsByClassName("delete-item")[0];
    console.log(button)

    // for(let button of deleteButtons) {
        button.addEventListener("click", () => {
            let item = this.getAttribute("id"); //not working
            let deletedItem = document.getElementById(item);
            deletedItem.innerHTML = ``;
        });
    //}
}

document.addEventListener("DOMContentLoaded", () => {   
    createNewList();
    createItem();
});

async function storeList(db, listName, category, date)
{
    const listData = {
        category: category,
        date: date
    };
    const listRef = doc(db, "lists", listName)
    
    try {
        await setDoc(listRef, listData);
        console.log("list created successfully")
    }
    catch(error) {
        console.log("something went wrong", error)
    }  
};









//display the stored lists
//  - list name; icon for the category (?)

//when a list is opened:
//  - name on top with icon
//  - product name, price, where to buy;


//after creating the list:
//  - click on the body to add a new item: name; price; where to buy;
//  - show item on the screen with a checkbox; (gradient effect, fade away)

