

/**
 * Simple in-memory datastore for demo purposes.
 */
class ItemDb {

  constructor() {
    this.db = ["hello", "world"]
  }

  insert(item) {
    this.db.push(item)
  }

  getAllItems() {
    return this.db
  }


  deleteItem(item) {
    let idx = this.db.indexOf(item)
    this.db.deleteItem(idx)
  }


}

module.exports = new ItemDb()