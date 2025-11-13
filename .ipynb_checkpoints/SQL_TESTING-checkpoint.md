# Project Milestone 5
List of the data base tables our project will use as well as listing the access functions needed for those tables.

## Team Information
Team Number: 3

Team Name: Always Blue

Team Members:
- Matthew Biller (github: mbiller-student, email: mabi3900@colorado.edu)
- Adam Cavins (github: AdamCavins, email: adca4871@colorado.edu)
- Joo Han (github: joha4022, email: joha4925@colorado.edu)
- Kalen Wiley (github: kalecodes, email: kawi8065@colorado.edu)
- Travis Williams (github: CatchinPheeshCodes, email: trwi4612@colorado.edu)
  
Recurring Team Meeting: 7PM MT, Every Monday

# Tables

## User Table
A table that contains information information about the users of the app.
### Data Fields
- idUser (INT): A unique number id for each user of the app that will serve as the primary key for the table.
- Username (VARCHAR(45)): A name the user will use to identify themselves with.
- Password (VARCHAR(45)): A password unique to the user that will be used to confirm they say who they claim to be.

### Pages
- All pages will likely need access to this table.

### Access Methods
#### Add_User
A method to add a new user to the database
##### Parameters:
- Username: The name the user wishes to go by
- Password: The password the user wishes to use to confirm their identity
##### Returns:
- A boolean that the new user was successfully added to the database or not.
##### Notes:
- The function should also create a unique UserID for the user.
##### Tests:
- Check that after calling the method there is a new entry in the data table matching the input with a unique User id.

#### Remove_User
A method to remove an existing user from the database.
##### Parameters:
- Username: The name the user
- Password: The password the user uses to confirm their identity
##### Returns:
- A boolean that the user was successfully removed to the database or not.
##### Notes:
- The function should check that there is a user that goes by that username
- The function should also check the password provided by the user to confim it's their request.
##### Tests:
- Check that after calling the method the user is no longer in the database.

#### Verify_User
A method to verify the person who is logging in is the infact the user.
##### Parameters:
- EnteredUN: The name the entered username to be verified
- EnteredPwrd: The password used to confim the identity of the user
##### Returns:
- A boolean that confirms the entered password matches the password of the username on record or not.
- The UserID of the confirmed user or -1 if unconfirmed.
##### Notes:
- The function should check that there is a user that goes by that username.
- The function should also check the password enterd is the same as the password on record.
##### Tests:
- Check that a correct username and password is found in the database.
- Check that an incorrect username and password results in a failure.

## Store Table
A table that stores information about the stores for each user.
### Data Fields
- idStore (INT): A unique number id for each store that will serve as the primary key for the table.
- UserID: The id of the user who will be shopping at this particular store.
- Name (VARCHAR(45)): The name of the store.
- Address (VARCHAR(45)): The address of the store.

### Pages
- The Home, New Trip, and Active Trip pages will need access to this table.

### Access Methods
#### Add_Store
A method to add a new store for a given user
##### Parameters:
- UserID: The id of the user whom the store will be added to.
- Name: The name of the store.
- Address: The address of the store.
##### Returns:
- A boolean that the new store was successfully added to the users' database or not.
##### Notes:
- The function should test if a store by the given store name already exists for the user.
- The function should also create a unique StoreID for the store.
##### Tests:
- Check that if upon a success that the new store was added to the table.

#### Remove_Store
A method to remove a store for a given user.
##### Parameters:
- UserID: The id of the user whom the store will be added to.
- StoreID: The id of the store to be removed.
##### Returns:
- A boolean that the store was successfully removed from the users' database or not.
##### Notes:
- None
##### Tests:
- Check that if upon a success that the store was removed from the table.

#### Get_Store_Id
A method to get a store's id for a given user.
##### Parameters:
- UserID: The id of the user whom the store will be added to.
- StoreName: The name of the store.
##### Returns:
- The id of the store if in the database if found or -1 if not found.
##### Notes:
- None
##### Tests:
- Check that if found the correct store id is returned
- Check that if not found -1 is returned

## Item Table
A table the stores information about each item for each user
### Data Fields
- idItem (INT): A unique number id for each item that will serve as the primary key for the table
- UserID: The id of the user who is looking for this item
- Name (VARCHAR(45)): The name of the item.
- StoreID (INT): The id number for the store this items belongs to, or 0 if the item hasn't been assigned to a store yet.

### Pages
- The Home, New Trip, and Active Trip pages will need access to this table.

### Access Methods
#### Add_Item
A method to add a new item for a given user
##### Parameters:
- UserID: The id of the user whom the item will be added to.
- Name: The name of the item.
- StoreID: The id of the store this item belongs to or 0 if unassigned to a store.
##### Returns:
- A boolean that the new item was successfully added to the users' database or not.
##### Notes:
- The function should also create a unique ItemID for the user.
##### Tests:
- Check that if upon a success that the new item was added to the table.

#### Remove_Item
A method to remove an item for a given user.
##### Parameters:
- UserID: The id of the user whom the item will be removed from.
- ItemID: The id of the item to be removed.
##### Returns:
- A boolean that the item was successfully removed from the users' database or not.
##### Notes:
- None
##### Tests:
- Check that if upon a success that the item was removed from the table.

#### Get_Item_Id
A method to get an item's id for a given user.
##### Parameters:
- UserID: The id of the user whom the store will be added to.
- ItemName: The name of the item.
##### Returns:
- The id of the item if in the database if found or -1 if not found.
##### Notes:
- None
##### Tests:
- Check that if found the correct item id is returned
- Check that if not found -1 is returned

#### Update_Items_Store
A method to update the store an item belongs to
##### Parameters:
- UserID: The id of the user whom the store will be added to.
- ItemID: The id of the item to update.
- StoreID: The id of the store that will given to the item.
##### Returns:
- a boolean indicating if the update was successful or not.
##### Notes:
- This method should fail if either the item or store id's are -1.
##### Tests:
- Check that if on a success the item's store id was actually updated.

## Trip Table
A table that stores and lists the items the user wished to shop for.
### Data Fields
- idTrip (INT): A unique number id for each trip.
- UserID (INT): The id of the user who the trip is for.
- ItemID (INT): The id of the item the user is looking to buy.

### Pages
- The Home, New Trip, and Active Trip pages will need access to this table.

### Access Methods
#### Add_Item_To_Trip
A method to add a new item to a users' trip.
##### Parameters:
- UserID: The id of the user.
- TripID: The id of the trip.
- ItemID: The id of the item to be added to the trip.
##### Returns:
- A boolean that the new item was successfully added to the users' trip or not.
##### Notes:
- This function should check if the ItemID is valid or not.
##### Tests:
- Check that if upon a success that the new item was added to the trip table.

#### Remove_Item_From_Trip
A method to remove an item from a users' trip.
##### Parameters:
- UserID: The id of the user.
- TripID: The id of the trip.
- ItemID: The id of the item to be removed.
##### Returns:
- A boolean that the item was successfully removed from the users' database or not.
##### Notes:
- None
##### Tests:
- Check that if upon a success that the item was removed from the removed table.

#### Get_Items_For_Store
A method to get all items for a given store
##### Parameters:
- UserID: The id of the user.
- TripID: The id of the trip.
- StoreID: The id of the store you need the items from.
##### Returns:
- A list with the names of all the items that fall under that store.
##### Notes:
- None
##### Tests:
- Check that all items for a given store were displayed