import time
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from enum import Enum
import sqlite3
from sql_db_user_api import add_user, create_db, verify_user

app = Flask(__name__)
CORS(app)
DATABASE = "grocery.db"

class ItemStatus(Enum):
    Active = 1
    Checked = 2
    Inactive = 3

class TripStatus(Enum):
    Active = 1
    Complete = 2

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

###############################################################################

# Helper

def get_db_connection():
    con = sqlite3.connect(DATABASE)
    con.row_factory = sqlite3.Row
    return con

###############################################################################

@app.route('/')
def index():
    con = get_db_connection()

     # 1. SQL query to get all stores
    stores = con.execute('Select * From Store').fetchall()

    items_by_store = {}
    for store in stores:

        # 2. SQL query to get all items belonging to this store
        query = 'Select Name FROM Item WHERE storeid = ?' # SQL query, asks database to give all <name> values from the <Item> table where <storeid> is equal to something
        
        params = (store['idStore'],) # Tuple
        cur = con.cursor()
        cur.execute(query, params)
        items = cur.fetchall()

        # 3. Build a list of item names for this store
        item_names = []
        for i in items:
            item_names.append(i['Name'])

        # 4. Store this list inside the dictionary
        items_by_store[store['Name']] = item_names

    con.close()

    # 5. Pass dictionary to the HTML template
    return jsonify(items_by_store)

@app.route('/api/create-db')
def initialize():
    create_db(DATABASE)

    return jsonify({"status" : "success"}), 201

###############################################################################

@app.route("/api/items", methods=['POST'])
def add_items():

    data = request.get_json()
    item_name = data.get("name")
    store_name = data.get('store')

    user_id = 1 #placeholder

    if not item_name or not store_name:
        return jsonify({"error": "Missing name or store"}), 400

    con = get_db_connection()
    cur = con.cursor()

    # ensure store exists
    store = cur.execute("SELECT idStore FROM Store WHERE Name = ?", (store_name,)).fetchone()

    # we handle adding a new store here, if needed
    if not store:
        cur.execute("INSERT INTO Store (Name, UserID) VALUES (?, ?)", (store_name, user_id))
        store_id = cur.lastrowid
    else:
        store_id = store["idStore"]


    cur.execute("INSERT INTO Item(Name, StoreID, UserID) VALUES(?, ?, ?)", (item_name, store_id, user_id))
    con.commit()
    con.close()

    return jsonify({"status" : "success"}), 201

###############################################################################

# Gets all items and store names

@app.route("/api/items", methods=["GET"])
def get_items():
    con = get_db_connection()
    items = con.execute("""
        SELECT Item.idItem, Item.Name AS item_name, Store.Name AS store_name
        FROM Item
        JOIN Store ON Item.StoreID = Store.idStore
        """).fetchall()

    con.close()
    return jsonify([dict(i) for i in items])

###############################################################################

# Gets a list of all stores

@app.route("/api/stores", methods=["GET"])
def get_stores():
    con = get_db_connection()
    stores = con.execute("SELECT * From Store").fetchall()

    con.close()
    return jsonify([dict(i) for i in stores])

@app.route("/api/trips", methods=["GET"])
def get_trips():
    # Get all trips - might need to modify
    con = get_db_connection()
    trips = con.execute("""
        SELECT Trip.idTrip, Store.Name AS store_name, Trip.Status
        FROM Trip
        JOIN Store ON Trip.StoreID = Store.idStore
        """).fetchall()

    con.close()
    return jsonify([dict(i) for i in trips])

###############################################################################

# Start a trip

@app.route("/api/trips", methods=["POST"])
def start_trip():
    data = request.get_json()
    user_id = data.get("user_id", 1) # placeholder
    store_id = data.get("store_id")

    if not store_id:
        return jsonify({"error" : "Missing store_id"}), 400

    con = get_db_connection()
    cur = con.cursor()

    cur.execute("""
        INSERT INTO Trip (UserID, StoreID, Stats)
        VALUES (?, ?, ?)
        """, (user_id, store_id, TripStatus.Active))

    con.commit()
    new_trip_id = cur.lastrowid
    con.close()

    return jsonify({"trip_id" : new_trip_id, "status" : "active"}), 201

###############################################################################

# Get the Active Trip

@app.route("/api/trips/active", methods=["GET"])
def get_active_trip():
    user_id = 1 # placeholder

    con = get_db_connection()

    row = con.execute("""
        SELECT Trip.idTrip, Trip.Status
        FROM Trip
        WHERE Trip.UserID = ? AND Trip.Status = 1
        LIMIT 1
        """, (user_id,)).fetchone()

    con.close()

    if row:
        return jsonify(dict(row))

    else:
        return jsonify({"active" : False}), 200

###############################################################################

# End a Trip

@app.route("/api/trips/<int:trip_id>", methods=["PUT"])
def end_trip(trip_id):
    con = get_db_connection()
    cur = con.cursor()

    cur.execute("""
        UPDATE Trip
        SET Status = 'complete'
        WHERE idTrip = ?
        """, (trip_id))

    con.commit()
    con.close()

    return jsonify({"status" : "complete", "trip_id" : trip_id}), 200

###############################################################################

# Get Items for a Store

@app.route("/api/store/<int:store_id>/items", methods=["GET"])
def get_items_for_stores(store_id):
    user_id = 1 # placeholder

    con = get_db_connection()
    rows = con.execute("""
        SELECT idItem, Name
        FROM Item
        WHERE UserID = ? AND StoreID = ?
        """, (user_id, store_id)).fetchall()

    con.close()

    return jsonify([dict(r) for r in rows])


###############################################################################

# Delete an Item

@app.route("/api/items/<int:item_id>", methods=["DELETE"])
def delte_item(item_id):
    con = get_db_connection()
    cur = con.cursor()

    cur.execute("DELETE From Item WHERE idItem = ?", (item_id,))
    con.commit()
    con.close()

    return jsonify({"deleted" : item_id}), 200


###############################################################################



# TEMP ROUTES TO COMBINE LATER
#add an item by name
@app.route("/api/item", methods=['POST'])
def add_item():

    data = request.get_json()
    item_name = data.get("name")

    user_id = 1 #placeholder

    if not item_name:
        return jsonify({"error": "Missing item name"}), 400

    con = get_db_connection()
    cur = con.cursor()

    # check if item exists
    existing_item = cur.execute("SELECT idItem, Name, Status FROM Item WHERE Name = (?)", (item_name,)).fetchone()

    # create item if new, reactivate if exists
    if not existing_item:
        cur.execute("INSERT INTO Item (Name, UserId, Status) VALUES (?, ?, ?)", (item_name, user_id, ItemStatus.Active.value))
    elif existing_item and existing_item["Status"] == ItemStatus.Inactive.value:
        cur.execute("UPDATE Item SET Status = ? WHERE idItem = (?)", (ItemStatus.Active.value, existing_item["idItem"]))
    elif existing_item and (existing_item["Status"] == ItemStatus.Active.value or existing_item["Status"] == ItemStatus.Checked.value):
        return jsonify({ "status" : "error"}), 500

    con.commit()
    con.close()

    return jsonify({"status" : "success"}), 201

@app.route("/api/store", methods=['POST'])
def add_store():

    data = request.get_json()
    store_name = data.get("name")

    user_id = 1

    if not store_name:
        return jsonify({"error": "Missing store name"}), 400
    
    con = get_db_connection()
    cur = con.cursor()

    # check if store exists
    existing_store = cur.execute("SELECT Name FROM Store WHERE Name = ?", (store_name,)).fetchone()

    if existing_store:
        return jsonify({ "error": "store already exists"}), 500
    
    # create store if it does not exist
    cur.execute("INSERT INTO Store (Name, UserId) VALUES (?, ?)", (store_name, user_id))

    con.commit()
    con.close()

    return jsonify({"status": "success"}), 201

#get all items
@app.route("/api/all-items", methods=["GET"])
def get_all_items():
    con = get_db_connection()
    cur = con.cursor()
    items = cur.execute("""
        SELECT Item.idItem, Item.Name, Item.Status, Item.StoreID
        FROM Item
        """).fetchall()

    con.close()
    return jsonify([dict(i) for i in items])


@app.route("/api/update-item", methods=["PATCH"])
def update_item():
    data = request.get_json()
    item_id = data["id"]
    item_store_id = data["storeId"]
    item_status = data["status"]

    con = get_db_connection()
    cur = con.cursor()

    # update item with body parameters
    cur.execute("UPDATE Item SET StoreID = ?, Status = ? WHERE idItem = ?", (item_store_id, item_status, item_id))

    con.commit()
    con.close()
    return jsonify({"status": "success"}), 201

@app.route("/api/trips/new", methods=["POST"])
def add_trip():
    data = request.get_json()
    user_id = data.get("user_id", 1) # placeholder
    item_ids = data.get("item_ids")

    if not item_ids:
        return jsonify({"error" : "Missing Item Ids"}), 400

    con = get_db_connection()
    cur = con.cursor()

    # create the new trip
    cur.execute("""
        INSERT INTO Trip (UserID, Status)
        VALUES (?, ?)
        """, (user_id, TripStatus.Active.value))

    con.commit()
    new_trip_id = cur.lastrowid

    # associate items with this trip
    trip_item_rows = [(new_trip_id, item_id) for item_id in item_ids]
    cur.executemany("""
        INSERT INTO TripItem (TripID, ItemID)
        VALUES (?, ?)     
    """, trip_item_rows)
    con.commit()
    con.close()

    return jsonify({"trip_id" : new_trip_id, "status" : "active"}), 201

@app.route("/api/trips/<int:trip_id>/items", methods=['GET'])
def get_trip_items(trip_id):
    con = get_db_connection()
    cur = con.cursor()

    # get all item Ids associated with a trip
    cur.execute("""
        SELECT ItemID
        FROM TripItem
        WHERE TripID = ?                    
    """, (trip_id,))

    rows = cur.fetchall()
    con.close()

    item_ids = [row[0] for row in rows]

    return jsonify({"trip_id": trip_id, "item_ids": item_ids}), 201

@app.route("/api/trips/<int:trip_id>/complete", methods=['PATCH'])
def complete_trip(trip_id):
    con = get_db_connection()
    cur = con.cursor()

    # get all item Ids in this trip
    cur.execute("""
        SELECT ItemID
        FROM TripItem
        WHERE TripID = ?
    """, (trip_id,))

    rows = cur.fetchall()
    item_ids = [row[0] for row in rows]

    # update every item that has been "checked" to status "inactive"
    cur.execute(f"""
        UPDATE Item
        SET Status = 3
        WHERE idItem IN ({','.join(['?'] * len(item_ids))})
          AND Status = 2
    """, item_ids)

    # update trip status to Complete
    cur.execute("""
        UPDATE Trip
        SET Status = 2
        WHERE idTrip = ?
    """, (trip_id,))

    con.commit()
    con.close()

    return jsonify({"trip_id": trip_id, "status": "complete"}), 201

### user create api ###

@app.post("/api/create_user")
def create_user():
    data = request.get_json() or {}
    print(data)
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not username or not password or not email:
        return jsonify({"ok": False, "error": "Missing email or password"}), 400

    try:
        add_user(DATABASE, email, username, password)
    except sqlite3.IntegrityError:
        return jsonify({"ok": False, "error": "Email already exists"}), 400

    return jsonify({"ok": True}), 201

@app.post("/api/login")
def login_user():
    data = request.get_json() or {}

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"ok": False, "error": "Missing username or password"}), 400

    user_id = verify_user(DATABASE, username, password)

    if user_id == -1:
        return jsonify({"ok": False, "error": "Invalid username or password"}), 401

    # SUCCESS
    return jsonify({
        "ok": True,
        "user_id": user_id,
        "message": "Login successful"
    }), 200

### routes used by front end so far
# /api/item POST
# /api/all-items GET
# /api/stores GET
# /api/store POST
# /api/items/id DELETE 
# /api/update-item UPDATE
# /api/trips/active GET
# /api/trips/new POST
# api/trips/<int:trip_id>/items GET
# "/api/trips/<int:trip_id>/complete" PATCH
# /api/create_user
# /api/login





###############################################################################

# if __name__ == "__main__":
#     app.run(port=5001, debug=True)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

if not os.path.exists(DATABASE):
    print("creating database...")
    create_db(DATABASE)





