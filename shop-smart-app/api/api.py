import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
DATABASE = "grocery.db"

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


###############################################################################

@app.route("/api/items", methods=['POST'])
def add_item():

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
        INSET INTO Trip (UserID, StoreID, Stats)
        VALUES (?, ?, ?)
        """, (user_id, store_id, "active"))

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
        SELECT Trip.idTrip, Trip.Status, Store.Name AS store_name
        FROM Trip
        JOIN Store ON Trip.StoreID = Store.idStore
        WHERE Trip.UserID = ? AND Trip.Status = "active"
        LIMIT 1 # one trip per store
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

    cur.execute("DELETE From Item WHERE idItem = ?", (item_id))
    con.commit()
    con.close()

    return jsonify({"deleted" : item_id}), 200


###############################################################################

if __name__ == "__main__":
    app.run(port=5001, debug=True)



























