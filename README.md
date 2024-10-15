# pin_head_list




bug: when creating item, it was not showing users input/ fix: place variables on the right place, inside the event listener.

bug: remove button not applying on all button, only on the first one/ fix: iterate through buttons everytime the user add a new item;

bug: in the dropdown menu with the created lists names, editing and saving the list was adding the event listener again to that element./ fix: attach a custom property to the element to indicate that the event listener is already in place, thus not adding again.

bug: when new list created, all the event listeners that were added after a list was created, were added again, this way creating duplicates when adding items, saving lists and so on. /fix: reload the page everytime a new list is created, ensuring that the event listeners are added only once.