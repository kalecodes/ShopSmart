# Shop Smart - Web Pages Design

## Landing Page - Login
### Description
The landing page will introduce new users to the application. It will allow the user to enter an email to sign up for a new account, navigate to the login page for an existing account, or navigate to the about page for more information about the application.  It will display the ShopSmart app logo, brand messaging, and a few feature highlights of the application.  After login, the user will be redirected to their home page. 

Desktop:<br>
![Landing Page](md_images/Landing.png)
Mobile:<br>
<img src="./md_images/Landing-Mobile.png" width="200px">

### Parameters
- ShopSmart logo
- Fields for username and password
- Sign In Button
- Sign Up Button
- Learn More Button

### Data to Render Page
- Logo image & file path
- CSS file for consistent style
- user credential data (mock data for MVP)

### Link Destinations
- "Sign In" button destination: account page.
- "Sign-Up" button destination: account page.
- "Learn More" button: about page.

### List of Verification Tests
- Username and password entry fields accept valid characters.
- Verify that successful login redirects to user's home page.
- Verify that dropdown feature expands to reveal the About Page button with hover/click.
- Button functionality:
    - Login: Verify success only with valid credentials.
    - New Account: Navigates to the correct page.
    - Dropdown feature: Expands to reveal the about page button with hover/click.
    - About Page Button: Redirects user to the about page. 
- Error Handling:
    - Incorrect login/password credentials & accompanying error message.
    - Submission with empty fields.

## Account Page
### Description
The account page will allow existing users to login to their account or new users to create an account with ShopSmart.  After a successful new account is created, or a validated log-in, the new user will be redirected to the homepage.

Desktop:<br>
![Account Page](md_images/Account.png)
Mobile:<br>
<img src="./md_images/Account-Mobile.png" width="200px">

### Parameters
- ShopSmart logo
- New Account fields:
    - Email
    - First Name
    - Last Name
    - Password Creation
- "Start Shopping" (account creation) button
- "Sign In" Button
    - Swaps the form fields to include only Email and Password Inputs

### Data to Render Page
- Logo image & file path
- CSS file for consistent style
- user credential data (mock data for MVP)

### Link Destinations
- "Start Shopping" button: user homepage.
- "Sign Up"/"Sign In": swaps the form fields and button 

### List of Verification Tests
- New account fields accept valid characters
- Create account button validates new user data before creating a new homepage.
- Upon successful validation, create account button takes user to homepage.
- About Page Button and Existing User Button redirects to appropriate page successfully.

## About Page
### Description
- The about page will contain a brief description of the ShopSmart app, display example home and shop pages with feature descriptions to explain how it can be used for the efficient management of commonly purchased items, and will contain a button back to the landing page. 

Desktop:<br>
![About Page](md_images/About.png)
Mobile:<br>
<img src="./md_images/About-Mobile.png" width="200px">

### Parameters
- ShopSmart Logo
- "Sign In / Sign Up" Button

### Data to Render Page
- Product desciption .txt file
- FAQ .txt file
- CSS file for consistent style

### Link Destinations
- "Sign In / Sign Up" button: landing page 

### List of Verification Tests
- Verify that any product description or FAQ dropdowns are functional.
- Verify that the drop down menu and about page buttons are functional. 
- Verify that the new and existing account buttons are functional and redirect to the appropriate page.

## Home Page
### Description
The home page will allow the user to manage their items and stores. It will allow users to add an item to a main list of unassigned items, create store groups to assign items to, and assign items from the unassigned list to a store.  <br>

Desktop:<br>
![Home Page](md_images/Home.png)
Mobile:<br>
<img src="./md_images/Home-Mobile.png" width="200px">

### Parameters
- Shop Smart Logo
- Home Button
- Shop Button
- Log Out Button
- Add an item data entry field
- Unassigned item container
- Store containers
- Add a Store button

### Data to Render Page
- Shop Smart Logo img file
- User item data
- User store data
- CSS file: home page styling

### Link Destinations
- Home Page Button: links to self (refresh)
- Shop Page Button: links to shop page
- Log Out Button: redirects to landing page

### List of Verification Tests
- Validate that all buttons redirect to the appropriate page. 
- Validate that the add an item data entry field validates acceptable inputs.
- Validate that new items are added to the unassigned list.
- Validate that existing items are assigned to the correct store.
- Validate that new items assigned to a store are added to the correct store when assigned.
- Validate that the add a store feature adds a new store.
- Validate that new items can be added to a new store.

## Shop Page
### Description
The shopping page will allow the user to create a "shopping trip". If there is no active trip, the user will be able to select a specific store's items, all items, or unassigned items. Once a trip is created, the user will have access to a checklist(s) of items based on their previous selection.  User's can check off items as they shop. When done, users can complete their trip, to remove items from their associated list.

Desktop:<br>
![Shop Page](md_images/Shop-NewTrip.png)
![Shop Page](md_images/Shop-ActiveTrip.png)

Mobile:<br>
<img src="./md_images/Shop-Mobile.png" width="200px">
<img src="./md_images/Shop-ActiveTrip-Mobile.png" width="200px">


### Parameters
- Home Page Button
- Shop Button
- Logout Button
- List container of store/group options
- List container of items in chosen store
- List container of unassigned items
- Individual item containers with checkboxes
- Complete Trip button

### Data to Render Page
- Shopsmart img file
- User item data
- User store data
- User trip data
- CSS file: shopping page styling

### Link Destinations
- Home Button: links to home page
- Shop Button: links to self (refresh)

### List of Verification Tests
- Validate that all of the users stores are available for selection.
- Validate that commonly purchased items appear in the item list when a store is selected
- Validate that unassigned items are added to a store when selected and assigned.
- Validate that items are marked 'shopped' when checked off of the list.
- Validate that the selected store is highlighted.
- Validate that all link buttons redirect to the appropriate page. 
- Validate that the Complete Trip marks the store trip complete and changes the color of the selected store tab.
- Validate that the user is prompted to confirm that the trip is complete, when the complete trip button is clicked before all shopping items are marked 'shopped'.


