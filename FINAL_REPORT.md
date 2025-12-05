# Project Milestone 8
A comprehensive document that summarizes the entire project.

## Project Title
Shop Smart

## Project Description
In modern times, many people typically shop at a multitude of store for different things, not just one. Shop Smart is an application meant to organize and make this process easier for its users. The primary idea behind the app is that it can create and maintain a grocery list of items across multiple stores that a user intends to visit. The app creates a 'Trip,' for shopping trip, which contains all the items a user intends to buy sorted by the store they intent to buy them at. As the user visits stores and buys thier items, they can check them off of the list until they get everthing they want to buy. This in turn allows the user to keep organized and stay on track for their shopping trip as opposed to just trying to remember everything they want and risk missing something that they have to go back for.

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

## Project Repository
[GitHub - ShopSmart](https://github.com/kalecodes/ShopSmart)

## Project Tracker
[Trello](https://trello.com/b/hBYltvo3/shopsmart-project-tracking)

## Public Deployment Link
[ShopSmart](https://shopsmart-gina.onrender.com/)

Test User Credentials: <br>
Username: SampleUser1 <br>
Password: 1234567 <br>
Note: Render becomes idle with inactivity, first request may take up to a minute for the server to restart and execute the request

## Project Presentation
[ShopSmart Project Presentation](https://o365coloradoedu-my.sharepoint.com/:v:/g/personal/mabi3900_colorado_edu/EQvtDEQ_xG5ClLGs2OIDL2wBmgj1ezafQvUpSKW8cwdsUw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=bQB6cV)

## Project Demo Link
[ShopSmart Video Demo](https://o365coloradoedu-my.sharepoint.com/:v:/g/personal/kawi8065_colorado_edu/EbZ8DzL0mOtFgJ7ICjErFj0BxXuwdspa41t_DWXSGxL9sg?e=yHupP9&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)


## Web Design
This project employs six primary pages. By default a person is taken to the about page which details the information about the project itself and can take a user to sign into their accout. If a user wishes to make a new account, they can click the 'Shop Smart' logo in the top left of the page and be taken to the landing page. The landing page contains box which prompts a new user to create a new account. Once a user enters in their email, then there desired username and password, they're taken to the account page which actually lets the user sign into their account. This page will verify the credentails the user inputs and if correct, will take them to the home page. The home page is where the user is allowed to make thier shopping trip. A user can add new items they wish to shop for by going to the add item box, entering an item they want, then clicking add. The new item is then added to an unassigned field indicating that it hasn't been added to a store yet. To make a new store, a user must navigate to the bottom left of the page and click the plus button. Here a user is prompted to enter the name of a new store and when they do and new field will show up on the home page. From here a user can use the arrow next to an item to move it into a new store. Once a user has fully populated their items and store they can go to the trip page. There isn't a direct button that will take a user to the trip page, it must be manually accessed by going the URL and typing 'shop' where 'home' is. https://shopsmart-gina.onrender.com/shop The trip page displays all the stores a user input and how many items from each store a user has yet to signn off on. By clicking the arrow next to a given store, the user will be taken to that store's active trip page. This pages displays each item the user intends to buy at the given store and allows them to check them off. Once a user is done with the active store page, they can press the complete trip button in the bottom right and they'll be taken back to the trip page which will be updated with what's left to buy.

### Landing Page
<img alt="Landing Page" src="md_images/SS Landing Page.PNG"  width="50%" height="auto">
<br>
The page that introduces the project and allows a user to make an account.

### About Page
<img alt="About Page" src="md_images/SS About Page.PNG"  width="50%" height="auto">
<br>
The page that gives an overview of the project.

### Account Page
<img alt="Account Page" src="md_images/SS Sign In Page.PNG"  width="50%" height="auto">
<br>
The page that lets a user sign in.

### Home Page
<img alt="Home Page" src="md_images/SS Home Page.PNG"  width="50%" height="auto">
<br>
The page where a user can create stores and items they wish to shop for and assign items to stores.

### Trip Page
<img alt="Trip Page" src="md_images/SS Trip Page.PNG"  width="50%" height="auto">
<br>
The page where a user can select with store they're currently shopping at.

### Active Trip Page
<img alt="Active Trip Page" src="md_images/SS Active Trip Page.PNG"  width="50%" height="auto">
<br>
The page where a user can see what items they're shopping for at the selected store and mark them off.

### Link To WireFrames
[ShopSmart - Figma](https://www.figma.com/design/1fS3oWBgAqdmRBBDa8sB4V/ShopSmart?node-id=0-1&p=f)

## Data Base Design
This project utilizes an sql database to keep track of each user and their respective stores, items, and trips. The sql database has four tables that store this information.
### User Table
This table is used to store information about the users and the information they use to certify it's them.
#### Fields
- ID_User: a unique ID for each user
- Username: the desired name the user wished to go by
- Email: the user's email address
- Password: the password the user wishes to set to certify it's them when logging in

### Store Table
This table keeps a list of stores for each user that they wish to shop at.
#### Fields
- ID_Store: a unique ID for each store
- Name: the name of the store
- Address: the address of the store
- UserID: the id of the user the store belongs to

### Item Table
This table keeps track of all the items a given user wishes to buy
#### Fields
- ID_Item: a unique ID for each item
- Name: the name of the item
- UserID: the ID of the user the item belongs to
- StoreID: the ID of the store the item is found at
- Status: an indicator saying whether the item has been found or not

### Trip Table
This table is used to store information about each trip for a given user. A trip is a list of items a given user wants to buy, and since each item has a store associated with it, they can then be grouped by which store they're then found at
#### Fields
- ID_TripItem: a unique value given for each item
- TripID: a unique ID for each trip
- ItemID: the ID for a given item

## Functionality
The deployment link takes you to the about page which gives information about the project. In order to actually utilize it, however, you first need to click on the 'Shop Smart' icon in the top left. This will take you to the landing page. <br>
<img alt="Landing Page" src="md_images/SS_1 sign up.PNG"  width="50%" height="auto"> <br>
From here you enter your given email address and click sign up. This will take you to a create account page. <br>
<img alt="Create Account" src="md_images/SS_2 make account.PNG"  width="50%" height="auto"> <br>
Here, you'll enter in your user name and password and hit 'Sign Up.' This will register you're information and take you to the sign in page and prompt you to sign in with your new account. <br>
<img alt="Sign into Account" src="md_images/SS_3 sign in.PNG"  width="50%" height="auto"> <br>
Enter your username and password here. If they are correct, you will be automatically taken to the home page. <br>
<br>
<img alt="Home Page" src="md_images/SS_4 shopping page.PNG"  width="70%" height="auto"> <br>
This is where a user add the items and store they wish to shop at. First let's add a store. Navigate to the bottom right of the home page and you'll see a plus button. Click on it and you will be prompted to add a new store. <br>
<br>
<img alt="Adding a New Store" src="md_images/SS_5 adding store.PNG"  width="50%" height="auto"> <br>
<br>
Once you add a new store, it will appear on your home page now. <br>
<br>
<img alt="Store Added" src="md_images/SS_6 store added.PNG"  width="50%" height="auto"> <br>
Now let's add a new item. Click on the text box that says add a new item and enter an item name. <br>
<img alt="Adding an Item" src="md_images/SS_7 adding item.PNG"  width="50%" height="auto"> <br>
<br>
Once you hit the add button. The item will automatically appear in an Unassigned box. <br>
<img alt="Item Added" src="md_images/SS_8 unassigned item.PNG"  width="50%" height="auto"> <br>
You have to assign items to the store you wish to buy them from. To do this click on the arrow next to the item. You should see a menu for each store to add the item to. <br>
<img alt="Assigning Item" src="md_images/SS_9 assigning item.PNG"  width="70%" height="auto"> <br>
Now you should see the item under the store you selected. <br>
<img alt="Item in Store" src="md_images/SS_10 assigned item.PNG"  width="70%" height="auto"> <br>
Now you can fill each store with items you intend to buy. Once you're done, go to the URL, delete 'home' and type 'shop' to go to the trip page. <br>
<img alt="Trip Page" src="md_images/SS_13 the shop page.PNG"  width="50%" height="auto"> <br>
Here, you'll see a break down of all the store you selected to shop at and how many items you intend to buy. To select on an individual store, navigate to the arrow next to it and click on it. <br>
<img alt="Store Trip Page" src="md_images/SS_14 store trip.PNG"  width="70%" height="auto"> <br>
Here you'll see each item you assigned to the store and they'll have check boxes next to them. When you click that box, it'll indicate that the item has been found. <br>
<img alt="Item Checked" src="md_images/SS_15 selecting item.PNG"  width="30%" height="auto"> <br>
Once you have found all your items, you can click the 'Complete Trip' button at the bottom right of the page. This will take you back to the trip page with all the store you have yet to visit. You can then repeate this process for all the store until you have everything you wanted.

## Final Status Report
### What Was Completed
- The application acomplished most of the basic features we originally set out to achieve.
- The app supports a create account feature that lets users enter in usernames and passwords specific to them and enters it into the user table.
- The login page checks the credentials of the user who is trying to log in and takes them to the home page if successful.
- On the home page, when a user adds an item, the item is defaulted to an unassigned column.
- Users can add individual stores they wish to shop at.
- From the home page, a user can move items between stores.
- The trip page dislays all store the user designated and the amount of items they wish to purchase.
- The active trip page selects one store and allows the user to mark off an item as they buy it.
- When items are marked off on the active trip page, those changes are reflected on the trip page.
### What Were We in the Middle of Implementing
- Improved UI and styling for a more pleasant and moderne experience.
- More descriptive and detailed information about features on the about page.
- Notifying users of errors and loading states in api requests
### Future Plans
- Improved deployment environemnt (Need more computing power for faster processing)
- The ability to remember items purchased in the past and recommend them to users across trips.
- The ability to make a route to plan the order in which the user was going to visit the stores.
- Improve routing to allow users to type subroutes into the browser
### Known Bugs
- Unresolved ocassional error on new account creation locks database and does not notify user
- Users can navigate to the sign-up or sign-in pages while already signed in

