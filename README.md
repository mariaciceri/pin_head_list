# PIN HEAD LISTS

[Pin Head Lists](https://mariaciceri.github.io/pin_head_list/) is a place for anyone to create various lists and store them locally. It offers an easy way to list items that you need to buy and where to buy them, as well as the price for the item. 

The page is fully responsive and allows the user to create new lists, add new items, delete items, delete lists altogether and navigate through created lists.

![Am I responsive image](docs/images/am-i-responsive.png)

## User Story
### First Time Users

+ When visiting the page for the first time, the user will be prompt with the form to create their first list. They can not close the popup if no list is available to be loaded;
+ After this step, the user can insert items on their newly created list by giving it a name. Price and place to buy the item is optional;
+ The user can see where to delete the items and create a new list, or delete the current list.

### Returning and Frequent Visitors

+ The user can access all their lists, update them with new items or delete if no longer needed;
+ The user can create new lists for their current needs.

## Features

The page is a helper for anyone who wants/needs to remember things they need to buy, where to buy them, and the price at the moment. Price and where to buy are not required to add an item to the list but the name is.

### Existing features

+ Logo and Header
    + The logo with the page name is located in the top left corner, which is easily visible when first opening the page. The "My Lists" button is also located in the header opposite to the logo/name and it is easy to know that there is the place where the user will navigate through lists. The header is always visible.

    ![Page's header](docs/images/header.png)

+ Footer
    + In the footer there are three buttons with tag "Delete" and "New" indicating that a list can be deleted and a new one can be created.

    ![Page's footer with delete and new button](docs/images/footer.png)

+ Popup for list creation
    + When opening for the first time, the popup will automatically open. If not the first time, the user must click on the new button for it to open. A tooltip appears not allowing the user to create a list with a name that already exists; 
    + The closing popup button is only available when there is a list to be displayed, otherwise the user must create one before entering the page;
    + After creating a new list, the list name will be displayed on the top, below the header, with the category on the top-right side of it.
    + The form for creating a new item will show below the list name and there will be an add button that will appear disabled at first;

    ![Create new list popup](docs/images/create-list-popup.png)
    ![List name already taken](docs/images/list-name-taken-tooltip.png)

+ Popup for deleting list
    + When the user clicks on the delete button, a popup window will prompt the user to confirm the deletion;
    + If pressed yes, an alert message will give the user feedback confirming the current list was deleted;
    + If no is pressed, the popup is closed.

    ![Delete list confirmation popup window](docs/images/delete-list-popup.png)

+ Add item layout
    + When something else than space is in the input field for name, the "add" button becomes enabled and, if clicked, inserts the newly created item above the input form with an "x" at the end, indicating that the item can be removed, and then the add button becomes disabled again;
    + There is validation for the price: if the user manually insert a negative number, a tooltip saying that the price must be a positive number will appear for 3 seconds and the add button is disabled again.

    ![Test list title, add item form, add button disabled](docs/images/add-button-disabled.png)
    ![Add button enabled](docs/images/add-button-enabled.png)

+ My Lists dropdown menu
    + When more than one list is created, the user will navigate through then by clicking on the "My Lists" element. It will show all the names of the lists created so far with an arrow at the beginning. By clicking in the list name, the page will display the items of that list.

    ![My lists button](docs/images/my-lists-dropdown.png)

### Features left to implement

+ A few features are left to implement in further work on this:
    + User being able to reorganize and edit the items in the list;
    + Edit list title;
    + Smother transitions when deleting an item;
    + Sum of all the prices when provided;
    + List types: to-do lists and shopping lists;

## Technologies

+ [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) is the foundation of the page;
+ [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) adds the style and layout of the page;
+ [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) adds responsiveness to elements of the page;
+ [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) styles the display of items on the page;
+ [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) is used for the maintainability of repeated styles;
+ [Gitpod](https://gitpod.io/) with [VSCode](https://code.visualstudio.com/) desktop extension is the IDE for the project;
+ [Git](https://git-scm.com/) is used for version control;
+ [Github](https://github.com/) is used for hosting the page;
+ [Github Pages](https://pages.github.com/) is where the page was deployed;
+ [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is the language used to add interactivity to the page;
+ [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) is used for supporting multiple js files;
+ [Font Awesome](https://fontawesome.com/) is used for the delete item button;
+ [Licecap](https://www.cockos.com/licecap/) is used to create the gif for responsiveness;


## Deployment
### Deployment to Github Pages

+ The page was deployed in the early stages to GitHub pages. The steps to deploy are as follows:
    + In the GitHub [repository](https://github.com/mariaciceri/pin_head_list), navigate to the Settings tab;
    + On the right-hand side in the menu, click on pages;
    + In Source check if "deploy from branch" is selected, then below it, in Branch, select "main" and save it;
    + To access it for the first time, go back to Code in the main navbar and on the left-hand side scroll down to deployments, click there and open the page;

### Local deployment

+ In order to make a local copy of this project, you can clone it. In your IDE Terminal, type the following command to clone my repository:

`git clone https://github.com/mariaciceri/pin_head_list`

## Responsiveness

+ The page is responsive and works as well in small screens as in big ones.

![Gif of the responsiveness of the page](/docs/images/clip.gif)

## Testing

+ To ensure that the webpage works on all platforms and is responsive on different devices, a series of tests were run:

### Compatibility

+ The page was tested on Chrome, Firefox and Safari. All browsers had the functionalities operating properly. The page was opened on two different computers with different operational systems, a tablet and a phone; 
+ On the phone, the page was tested on Safari and Chrome;
+ On the tablet, the page was tested on Chrome and Firefox.

![Page opened on Safari](docs/images/safari-test.png)
![Page opened on Firefox](docs/images/firefox-test.png)
![Page opened on Chrome](docs/images/chrome-test.png)

### Manual Testing

+ Create list button clicked:
    + Closes create list popup window and display list title input, display creating item form and add button;
+ Close button for creating list popup window:
    + Closes the popup displaying again whatever is behind;
+ New button:
    + Opens create list popup window;
+ Delete button:
    + Opens confirmation popup window;
+ Delete confirmation popup Yes button:
    + Deletes the current list and display the last one created, if none, prompts the user to create a new one;
    + Displays an alert saying that the list was deleted;
+ Delete confirmation popup No button:
    + Closes the popup window showing whatever is behind;
+ My Lists button:
    + Show dropdown menu with all list names created so far;
+ Add button:
    + Inserts the item in the HTML with the input information provided;
+ X button next to added items:
    + Erases item from HTML;
+ Try to click on the add item button with no name on item name field:
    + Did not insert;
+ Try to click on the add item button with a negative price:
    + Did not insert and tooltip appeared;
+ Try to create a list with the a name that already exists:
    + Did not create the list and tooltip appeared;
+ Try to close the popup window when no lists created:
    + Did not close the popup and tooltip appeared;

### Validation

+ HTML
    + No errors were found when running the page on the [W3C HTML valitor](https://validator.w3.org/);
    + Two warnings were present in the validation and this regards the presence of empty elements;
        +  The cause of this is because these elements will be filled later with user input.
![Validation page on W3C HTML valitor](docs/images/validation-html.png)
![Warnings on validation page on W3C HTML valitor](docs/images/validation-html-warnings.png)

+ CSS 
    + No errors were found when passing the code through on the official [W3C CSS validator](https://jigsaw.w3.org/css-validator/);
    + Three warnings were present;
        + The warnings refer to the CSS variable for the font family and it does not affect the use of the font.

![Validation page on W3C CSS valitor](docs/images/validation-css.png)
![Warnings on validation page on W3C CSS valitor](docs/images/validation-css-warnings.png)

+ JavaScript
    + No error was found when running all my JavaScript files on [JSHint](https://jshint.com/).

### Lighthouse

+ Using lighthouse in dev tools to confirm that the overall performance is efficient and accessible and colors and fonts chosen are readable.

![Lighthouse report](docs/images/lighthouse.png)

### Bugs
#### Fixed Bugs
    
+ Bug: when creating an item, it was not showing user input;
    + Fix: place variables in the right place, inside the event listener.

+ Bug: remove button not applying on all buttons, only on the first one;
    + Fix: iterate through buttons every time the user adds a new item.

+ Bug: in the dropdown menu with the created lists names, editing and saving the list was adding the event listener again to that element;
    + Fix: attach a custom property to the element to indicate that the event listener is already in place, thus not adding again.

+ Bug: when new list created, all the event listeners that were added after a list was created, were added again, this way creating duplicates when adding items, saving lists and so on;
    + Fix: reload the page everytime a new list is created, ensuring that the event listeners are added only once.

#### Unfixed Bugs

+ In the price field, the user can type letter "e" and this can be seen as a bug but it happens because of scientific notation that is a valid number format, so it was left like that. 

## Credits
### Content

+ The icon and favicon was taken from [Icon Archive](https://www.iconarchive.com/);
+ Information on how to use local storage on browser was taken from [thedevlife video](https://www.youtube.com/watch?v=xGvhj-f6IgQ&ab_channel=thedevlife) on YouTube;
+ Background picture taken from [Pexels](https://www.pexels.com/);
+ Info button idea was taken from [Codepen](https://codepen.io/EasyBoarder/pen/LZzzjy);


### Tools
+ [Coolors](https://coolors.co/) was used to create a color pallet;
+ [W3Schools](https://www.w3schools.com/) was used to help creating dropdown menu;


