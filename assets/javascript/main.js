function createNewList() {
    const newButton = document.getElementById("popup"); //New button
    const closeCreateList = document.getElementById("close-button");//close button
    const createList = document.getElementById("create-list"); //get the aside element that contains the create new list form;


    newButton.addEventListener("click", () => {
        createList.style.display = "block";
    })

    closeCreateList.addEventListener("click", () => {
        createList.style.display = "none";
    })
};


function createNewItem() {
    const main = document.getElementById("main"); //click anywhere to open create item popup
    const closeCreateItem = document.getElementById("close-button-item");//close button
    const createItem = document.getElementById("create-item");//get the aside element that contains the create new item form;

    console.log(main)
    main.addEventListener("click", (event) => {
        const close = event.target === closeCreateItem;
        const createItemWindow = createItem.contains(event.target);

        //check if the click is not on the closing button or inside the popup
        if (!close && !createItemWindow) {
            createItem.style.display = "block"; // Show the popup
        }
    });

    closeCreateItem.addEventListener("click", () => {
        createItem.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    createNewList();
    createNewItem();
})





//display the stored lists
//  - list name; icon for the category (?)

//when a list is opened:
//  - name on top with icon
//  - product name, price, where to buy;


//after creating the list:
//  - click on the body to add a new item: name; price; where to buy;
//  - show item on the screen with a checkbox; (gradient effect, fade away)

