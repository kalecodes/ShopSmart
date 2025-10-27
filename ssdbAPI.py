# Adam Cavins, Matt Biller, Joo Han, Kalen Wiley, Travis Williams
#
# Fall 2025
# CSPB 3308 - Team 3 Project: Smart Shop
#
# An API that creates and manages an sqlite data base for the smart shop app

import sqlite3

###############################################################################
# init_db(db_name)
#
# Creates a new data base and automatically adds a table for unassigned items
#
# Parameters: db_name - The name of the data base to be created
# Returns: None
#
def init_db(db_name):
    # Checks if the data base name provided is empty or not a string
    if(db_name == None or type(db_name) != str):
        raise ValueError

    # Replaces the whitespaces in strings with underscores
    db_name = db_name.replace(" ","_")
        
    conn = sqlite3.connect(db_name)
    c = conn.cursor()

    c.execute("CREATE TABLE Unassigned_Items(Name VARCHAR(45), Price DECIMAL, Quantity INT);")

    conn.commit()
    conn.close()


###############################################################################
# add_store(db_name, store_name)
#
# Adds a new table for the store given by store_name to the data base
#
# Parameters: db_name - The name of the data base to insert the store into
#             store_name - The name of the store
# Returns: None
#
def add_store(db_name, store_name):
    # Checks if the data base name provided is empty or not a string
    if(db_name == None or type(db_name) != str):
        raise ValueError

    # Checks if the store name provided is empty or not a string
    if(store_name == None or type(store_name) != str):
        raise ValueError

    # Replaces the whitespaces in strings with underscores
    db_name = db_name.replace(" ","_")
    store_name = store_name.replace(" ","_")
    
    conn = sqlite3.connect(db_name)
    c = conn.cursor()

    c.execute("CREATE TABLE %s(Name VARCHAR(45), Price DECIMAL, Quantity INT);" % (store_name))

    conn.commit()
    conn.close()


###############################################################################
# add_item(db_name, store_name, item_name, item_price, item_qty)
#
# Adds an item to the store in the data base
#
# Parameters: db_name - The name of the data base
#             store_name - The name of the store
#             item_name - The name of the item
#             item_price - The price of the item as a float
#             item_qty - The quantity of the item as an int
# Returns: None
#
def add_item(db_name, store_name, item_name, item_price, item_qty):
    # Checks if the data base name provided is empty or not a string
    if(db_name == None or type(db_name) != str):
        raise ValueError

    # Checks if the store name provided is empty or not a string
    if(store_name == None or type(store_name) != str):
        raise ValueError

    # Checks if the item name provided is empty or not a string
    if(item_name == None or type(item_name) != str):
        raise ValueError

    # Checks if the item price provided is empty or not a float
    # then checks of the price given is invalid ( < 0 )  
    if(item_price == None or type(item_price) != float):
        raise ValueError
    elif(item_price <= 0):
        raise ValueError

    # Checks if the item quantity provided is empty or not a int
    # then checks of the quantity given is invalid ( < 1 )
    if(item_qty == None or type(item_qty) != int):
        raise ValueError
    elif(item_qty < 1):
        raise ValueError

    # Replaces the whitespaces in strings with underscores
    db_name = db_name.replace(" ","_")
    store_name = store_name.replace(" ","_")
    item_name = item_name.replace(" ","_")

    conn = sqlite3.connect(db_name)
    c = conn.cursor()

    c.execute("INSERT INTO %s VALUES('%s', %f, %d);" % (store_name, item_name, item_price, item_qty))

    conn.commit()
    conn.close()
    

###############################################################################
# remove_item(db_name, store_name, item_name)
#
# Removes an item from a store in the data base
#
# Parameters: db_name - The name of the data base
#             store_name - The name of the store
#             item_name - The name of the item
# Returns: None
#
def remove_item(db_name, store_name, item_name):
    # Checks if the data base name provided is empty or not a string
    if(db_name == None or type(db_name) != str):
        raise ValueError

    # Checks if the store name provided is empty or not a string
    if(store_name == None or type(store_name) != str):
        raise ValueError

    # Checks if the item name provided is empty or not a string
    if(item_name == None or type(item_name) != str):
        raise ValueError

    # Replaces the whitespaces in strings with underscores
    db_name = db_name.replace(" ","_")
    store_name = store_name.replace(" ","_")
    item_name = item_name.replace(" ","_")

    conn = sqlite3.connect(db_name)
    c = conn.cursor()

    c.execute("DELETE FROM %s WHERE Name='%s';" % (store_name, item_name))

    conn.commit()
    conn.close()


###############################################################################
#  get_item(db_name, store_name, item_name)
#
# Finds an item from a given store and returns all the information from the
# table about it
#
# Parameters: db_name - The name of the data base
#             store_name - The name of the store
#             item_name - The name of the item
# Returns: ret - a tuple containing all the information from the tabel row
#                in the form (item_name, item_price, item_qty)
#
def get_item(db_name, store_name, item_name):
    # Checks if the data base name provided is empty or not a string
    if(db_name == None or type(db_name) != str):
        raise ValueError

    # Checks if the store name provided is empty or not a string
    if(store_name == None or type(store_name) != str):
        raise ValueError

    # Checks if the item name provided is empty or not a string
    if(item_name == None or type(item_name) != str):
        raise ValueError

    # Replaces the whitespaces in strings with underscores
    db_name = db_name.replace(" ","_")
    store_name = store_name.replace(" ","_")
    item_name = item_name.replace(" ","_")

    conn = sqlite3.connect(db_name)
    c = conn.cursor()

    for (i_name, item_price, item_qty) in c.execute("SELECT Name, Price, Quantity FROM %s WHERE Name='%s';" % (store_name, item_name)):
        i_name = i_name.replace("_"," ")
        ret = (i_name, item_price, item_qty)

    conn.commit()
    conn.close()

    return ret

if(__name__ == '__main__'):
    
    name = "test.db"
    store = "King Soopers"
    init_db(name)
    add_store(name, store)
    add_item(name, store, "Banana", 0.49, 6);
    add_item(name, store, "Cereal", 4.99, 2);
    add_item(name, store, "Body Wash", 10.99, 1);

    # remove_item(name, store, "Banana")

    test = get_item(name, store, "Body Wash")
    print(test)
    