

document.addEventListener("DOMContentLoaded", () => {
    let main = document.getElementsByTagName("main")[0];

    main.addEventListener("click", () => {

    })
})


const newButton = document.getElementById("popup"); //New button
const closeCreateList = document.getElementById("close-button");//close button
const createNewList = document.getElementsByClassName("create-list")[0];

newButton.addEventListener("click", () => {
    createNewList.style.display = "block";
})

closeCreateList.addEventListener("click", () => {
    createNewList.style.display = "none";
})





//display the stored lists
//  - list name; icon for the category (?)

//when a list is opened:
//  - name on top with icon
//  - product name, price, where to buy;

//display new form
//  - list name(req); category; 
//  - button to create

//after creating the list:
//  - click on the body to add a new item: name; price; where to buy;
//  - show item on the screen with a checkbox; (gradient effect, fade away)

