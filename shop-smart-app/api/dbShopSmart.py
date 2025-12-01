'''
Author: Matthew Biller

Description: 
API interface to create a SQL database. This API will create 4 tables inside on database. 
It will also add entries into tables if all checks are passed, as well as print the overview
of which tables are in the database.

'''

import sqlite3

def create(db_filename):
	con = sqlite3.connect(db_filename)
	cur = con.cursor()

	cur.execute('''
		CREATE TABLE IF NOT EXISTS User (
			idUser INTEGER PRIMARY KEY AUTOINCREMENT,
			Email TEXT NOT NULL,
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
            Status INT,

			FOREIGN KEY(UserID) REFERENCES User(idUser),
			FOREIGN KEY(StoreID) REFERENCES Store(idStore)
		)
	''')
      
	cur.execute('''
		CREATE TABLE IF NOT EXISTS Trip (
			idTrip INTEGER PRIMARY KEY AUTOINCREMENT,
			UserID INT NOT NULL,
			Status INT,
             
            FOREIGN KEY(UserID) REFERENCES User(idUser)
		)
	''')
      
	cur.execute('''
		CREATE TABLE IF NOT EXISTS TripItem (
			idTripItem INTEGER PRIMARY KEY AUTOINCREMENT,
            TripID INT NOT NULL,
            ItemID INT NOT NULL,
             
            FOREIGN KEY(TripID) REFERENCES Trip(idTrip),
            FOREIGN KEY(ItemID) REFERENCES Item(idItem),
             
            UNIQUE(TripID, ItemID)
		)
	''')
	
	con.commit()
	con.close()

################################################################

def create_test_data(db_filename):
	con = sqlite3.connect(db_filename)
	con.row_factory = sqlite3.Row
	cur = con.cursor()

	cur.execute("DELETE FROM Trip")
	cur.execute("DELETE FROM Item")
	cur.execute("DELETE FROM Store")
	cur.execute("DELETE FROM User")


	### Inserting Users ###

	cur.execute("INSERT INTO User (Email, Username, Password) VALUES (?, ?, ?)", 
	("username1@gmail.com", "username1", "password1234"))
		
	user1_id = cur.lastrowid

	cur.execute("INSERT INTO User (Email, Username, Password) VALUES (?, ?, ?)", ("username2@gmail.com", "username2", "password1234"))
		
	user2_id = cur.lastrowid


	### Inserting Stores ###

	cur.execute("INSERT INTO Store (Name, Address, UserID) VALUES (?, ?, ?)",
	("King Soopers", "123 Main Street", user1_id))
		
	king_soopers_id = cur.lastrowid

	cur.execute("INSERT INTO Store (Name, Address, UserID) VALUES (?, ?, ?)",
	("Trader Joes", "456 Broadway", user1_id))
		
	trader_joes_id = cur.lastrowid

	cur.execute("INSERT INTO Store (Name, Address, UserID) VALUES (?, ?, ?)",
	("Safeway", "123 Main Street", user2_id))
		
	safeway_id = cur.lastrowid


	### Inserting Items ###
	# Test User 1

	cur.execute("INSERT INTO Item (Name, UserID, StoreID) VALUES (?, ?, ?)",
	("Milk", user1_id, king_soopers_id))

	cur.execute("INSERT INTO Item (Name, UserID, StoreID) VALUES (?, ?, ?)",
	("Eggs", user1_id, king_soopers_id))

	cur.execute("INSERT INTO Item (Name, UserID, StoreID) VALUES (?, ?, ?)",
	("Ice Cream", user1_id, trader_joes_id))

	cur.execute("INSERT INTO Item (Name, UserID, StoreID) VALUES (?, ?, ?)",
	("Bread", user1_id, safeway_id))


	# Test User 2

	cur.execute("INSERT INTO Item (Name, UserID, StoreID) VALUES (?, ?, ?)",
	("Chicken", user2_id, king_soopers_id))

	cur.execute("INSERT INTO Item (Name, UserID, StoreID) VALUES (?, ?, ?)",
	("Bananas", user2_id, trader_joes_id))

	cur.execute("INSERT INTO Item (Name, UserID, StoreID) VALUES (?, ?, ?)",
	("Greek Yogurt", user2_id, safeway_id))


	### Inserting Trips ###

	# Active trip for Test User 1 at King Soopers
	cur.execute("INSERT INTO Trip (UserID, StoreID, Status) VALUES (?, ?, ?)",
	(user1_id, king_soopers_id, "Active"))

	# Completed trip for Test User 2 at Trader Joes
	cur.execute("INSERT INTO Trip (UserID, StoreID, Status) VALUES (?, ?, ?)",
	(user2_id, trader_joes_id, "Complete"))

	con.commit()
	con.close()

	print("Test data added")

################################################################

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

################################################################

if __name__ == "__main__":
	db_file = "grocery.db"
	create(db_file)
	create_test_data(db_file)
	print_tables(db_file)