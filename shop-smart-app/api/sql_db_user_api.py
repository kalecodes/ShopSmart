'''
Author: Matthew Biller, Adam Cavins

Description: 
Functions that allow users to be added, removed, and verified into the
sql data base. 

'''

import sqlite3

def create_db(db_filename):
	con = sqlite3.connect(db_filename)
	cur = con.cursor()

	cur.execute('''
		CREATE TABLE IF NOT EXISTS User (
			idUser INTEGER PRIMARY KEY AUTOINCREMENT,
            Email TEXT,
			Username TEXT UNIQUE,
			Password TEXT
		)
	''')
	
	cur.execute('''
		CREATE TABLE IF NOT EXISTS Store (
			idStore INTEGER PRIMARY KEY AUTOINCREMENT,
			Name TEXT NOT NULL,
			Address TEXT,
			UserID INT,

			FOREIGN KEY(UserID) REFERENCES User(idUser)
		)
	''')
		
	cur.execute('''
		CREATE TABLE IF NOT EXISTS Item (
			idItem INTEGER PRIMARY KEY AUTOINCREMENT,
			Name TEXT NOT NULL,
			UserID INT,
			StoreID INT,

			FOREIGN KEY(UserID) REFERENCES User(idUser),
			FOREIGN KEY(StoreID) REFERENCES Store(idStore)
		)
	''')
	cur.execute('''
		CREATE TABLE IF NOT EXISTS Trip (
			idTrip INTEGER PRIMARY KEY AUTOINCREMENT,
			UserID INT NOT NULL,
			ItemID INT NOT NULL,
			
			FOREIGN KEY(UserID) REFERENCES User(idUser),
			FOREIGN KEY(ItemID) REFERENCES Store(idItem)
			
		)
	''')
	
	con.commit()
	con.close()

def print_tables(db_filename):
    conn = sqlite3.connect(db_filename)
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type='table';")

    print ("\nTables:")
    for t in c.fetchall() :
        print ("\t[%s]"%t[0])

     ##   print ("\tColumns of", t[0])
        c.execute("PRAGMA table_info(%s);"%t[0])
        for attr in c.fetchall() :
            print ("\t\t", attr)
        
        print ("")

def add_user(db_filename, email, username, password):
    '''Adds a new user to the data table User.
    Parameters:
        db_filename: The name of the data base.
        username: The username of the new user to be added
        password: The password for the new user to be added
    Returns:
        True: If the user is successfully added to the data base.
        False: If the user is not added to the data base.
    '''
    if(db_filename == None or type(db_filename) != str):
        return False
    if(email == None or type(email) != str):
        return False
    if(username == None or type(username) != str):
        return False
    if(password == None or type(password) != str):
        return False

    con = sqlite3.connect(db_filename)
    cur = con.cursor()
    
    cur.execute("INSERT INTO User (Email, Username, Password) VALUES('%s', '%s', '%s');" % (email, username, password))
    
    con.commit()
    con.close()

    return True

def remove_user(db_filename, username, password):
    '''Removes a user from the User table of the data base.
    Parameters:
        db_filename: The name of the data base.
        username: The username of the user to be removed.
        password: The password for the user to be removed.
    Returns:
        True: If the user is successfully removed to the data base.
        False: If the user is not removed to the data base.
    '''
    if(db_filename == None or type(db_filename) != str):
        return False
    if(username == None or type(username) != str):
        return False
    if(password == None or type(password) != str):
        return False

    con = sqlite3.connect(db_filename)
    cur = con.cursor()

    cur.execute("SELECT Password FROM User WHERE Username='%s';" % (username))
    password_check = cur.fetchone()[0]

    if(password != password_check):
        con.close()
        return False

    cur.execute("DELETE FROM User WHERE Username='%s';" % (username))
    
    con.commit()
    con.close()

    return True

def verify_user(db_filename, entered_un, entered_pwrd):
    '''Checks if the given username and password matches a user in the User table and returns the user's id if so.
    Parameters:
        db_filename: The name of the data base.
        entered_un: The entered username to check if there is such a user name in the table at all.
        entered_pwrd: The entered password to compare to the password of the user in the data base.
    Returns:
        The idUser of the user if the entered username and password are found to be correct.
        -1 if either the entered username or password are incorrect.
    '''
    if(db_filename == None or type(db_filename) != str):
        return -1
    if(entered_un == None or type(entered_un) != str):
        return -1
    if(entered_pwrd == None or type(entered_pwrd) != str):
        return -1

    con = sqlite3.connect(db_filename)
    cur = con.cursor()

    # Checks if entered_un is even in the User table
    cur.execute("SELECT Username FROM User WHERE Username='%s';" % (entered_un))
    if(cur.fetchone() == None):
        con.close()
        return -1

    cur.execute("SELECT idUser, Password FROM User WHERE Username='%s';" % (entered_un))
    user_id, password_check = cur.fetchone()

    # Checks if entered_pwrd is different from the password in the User table
    if(entered_pwrd != password_check):
        con.close()
        return -1

    con.commit()
    con.close()

    return user_id

def get_user_id(db_filename, username):
    '''Finds and returns the user id for the user under the given username. 
    Note: This should only be used after the user is verified.
    Parameters:
        db_filename: The name of the data base.
        username: The username that should be in the data base.
    Returns:
        The idUser of the user if their username is found.
        -1 if the username is not found.
    '''
    if(db_filename == None or type(db_filename) != str):
        return -1
    if(username == None or type(username) != str):
        return -1

    con = sqlite3.connect(db_filename)
    cur = con.cursor()

    # Checks if username is even in the User table
    cur.execute("SELECT Username FROM User WHERE Username='%s';" % (username))
    if(cur.fetchone() == None):
        con.close()
        return -1

    cur.execute("SELECT idUser FROM User WHERE Username='%s';" % (username))
    user_id = cur.fetchone()[0]

    con.commit()
    con.close()

    return user_id
    

if(__name__ == '__main__'):
    """
    db_name = "test.db"
    create_db(db_name)
    add_user(db_name, "Adam", "PASSWORD")
    # remove_user(db_name, "Adam", "PASSWORD")

    test1 = get_user_id(db_name, "Matt")
    print(test1)
    test3 = get_user_id(db_name, "Adam")
    print(test3)
    """
    