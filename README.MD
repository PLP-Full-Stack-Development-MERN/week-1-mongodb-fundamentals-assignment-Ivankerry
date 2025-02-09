# 📚 MongoDB Fundamentals Assignment

## 📌 Overview
This project covers **MongoDB setup, CRUD operations, data modeling, aggregation, and indexing**.

---

## 🛠️ Setup MongoDB

### 1️⃣ Install MongoDB
#### **For Windows**
- Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
- Install and start MongoDB:
  ```bash
  mongod

##For macOS

brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

##For Linux (Ubuntu/Debian)

sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod


###2️⃣ Verify Installation

mongo --version


###3️⃣ Connect to MongoDB
mongo

#📂 Database & Collection Creation

use library
db.createCollection("books")


##📜 Insert Data

db.books.insertMany([
    { title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008, genre: "Programming", ISBN: "978-0132350884" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", publishedYear: 1999, genre: "Programming", ISBN: "978-0201616224" },
    { title: "Atomic Habits", author: "James Clear", publishedYear: 2018, genre: "Self-Help", ISBN: "978-0735211292" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937, genre: "Fantasy", ISBN: "978-0345339683" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", publishedYear: 2011, genre: "Psychology", ISBN: "978-0374533557" }
])

##🔍 Retrieve Data
Retrieve all books:


db.books.find().pretty()
Find books by a specific author:


db.books.find({ author: "Robert C. Martin" })
Find books published after the year 2000:


db.books.find({ publishedYear: { $gt: 2000 } })


#✏️ Update Data
Update the publishedYear of a specific book:


db.books.updateOne({ ISBN: "978-0201616224" }, { $set: { publishedYear: 2000 } })
Add a new field rating to all books:


db.books.updateMany({}, { $set: { rating: 4.5 } })

#🗑️ Delete Data
Delete a book by its ISBN:


db.books.deleteOne({ ISBN: "978-0345339683" })
Remove all books of a particular genre:


db.books.deleteMany({ genre: "Self-Help" })


#🏗️ Data Modeling (E-Commerce Example)
📌 Users Collection


db.users.insertOne({
    username: "john_doe",
    email: "john@example.com",
    password: "hashed_password",
    orders: []
})
📌 Products Collection

db.products.insertOne({
    name: "Laptop",
    price: 1200,
    stock: 10,
    category: "Electronics"
})
📌 Orders Collection (Referencing Users & Products)

db.orders.insertOne({
    userId: ObjectId("USER_ID_HERE"),
    products: [{ productId: ObjectId("PRODUCT_ID_HERE"), quantity: 1 }],
    status: "Shipped"
})


#📊 Aggregation Pipeline
Find the total number of books per genre:


db.books.aggregate([{ $group: { _id: "$genre", totalBooks: { $sum: 1 } } }])
Calculate the average publishedYear of all books:


db.books.aggregate([{ $group: { _id: null, avgYear: { $avg: "$publishedYear" } } }])
Identify the top-rated book:


db.books.find().sort({ rating: -1 }).limit(1)


#⚡ Indexing
Create an index on the author field to optimize queries:

db.books.createIndex({ author: 1 })


#✅ Benefits of Indexing in MongoDB
Speeds up query performance.
Reduces scan time for large datasets.
Optimizes filtering and sorting.


#🔬 Testing
Using MongoDB Shell

use library
db.books.find().pretty()
Using MongoDB Compass
Open MongoDB Compass.
Connect to mongodb://localhost:27017.
Navigate to library → books and verify the records.
