# ShopSmart Development Guide

## Requirements
Before attempting to run the application you need to ensure node and python are installed on your local machine.
[Python](python.org)
[Node](https://nodejs.org/en)

## Initial Application Setup
1. Clone the project repository from [GitHub](https://github.com/kalecodes/ShopSmart)
2. Install node dependencies
- In a terminal window, cd into the project folder named "shop-smart-app", and run the command 'npm install'. This will ensure you have all the node packages required to run the application.
3. Setup python virtual environment for the api
- cd into the 'api' directory
- run the command 'python -m venv venv' (you may have to use python3 if you have multiple python versions installed)
- activate the virtual environment with 'source venv/bin/activate' (bash or zsh shell) or 'venv/Scripts/activate' (Powershell or CMD on windows)
- Install api dependencies with the command 'pip install flask python-dotenv'

## Running the Application
1. In a terminal window, cd into the project folder 'shop-smart-app' and run the command 'npm run start' to run both the api and frontend application from one terminal.
2. If you wish to run the api and frontend applications from separate terminals to keep logging separate, you can alternaticaly run the commands 'npm run api' and 'npm run dev'.
3. The application should start and automatically open in the default web browser
- If it fails to open, you can use o + enter from the vite terminal to open it in the browser, or navigate to ()[http://localhost:5173/]
4. You will know both the frontend and api are running successfully if you see a screen that displays "ShopSmart" and a valid date and time.



### Additional Project Information
- venv and pycache files have been added to the .gitignore, these should not be added to the repository
- the api is configured to run on port 5001 (port 5000 can cause errors for some mac users)
- vite is configured to automatically redirect requests to the correct port for the api


### Additional Setup Information
- The following tutorial was followed to set up this react-flask application should anyone be interested in it: [Tutorial](https://blog.miguelgrinberg.com/post/create-a-react-flask-project-in-2025)

