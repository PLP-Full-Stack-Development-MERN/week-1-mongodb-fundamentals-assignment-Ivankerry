// Import MongoDB client (only needed for Node.js)
const { MongoClient } = require("mongodb");

// MongoDB Connection URI (Change this for MongoDB Atlas)
const uri = "mongodb://localhost:27017"; // Use your actual connection string
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Select Database
        const db = client.db("library");
        
        // Create Collection
        const booksCollection = db.collection("books");

        // Insert Sample Data
        await booksCollection.insertMany([
            { title: "The Pragmatic Programmer", author: "Andrew Hunt", publishedYear: 1999, genre: "Technology", ISBN: "978-0201616224" },
            { title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008, genre: "Programming", ISBN: "978-0132350884" },
            { title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937, genre: "Fantasy", ISBN: "978-0345339683" },
            { title: "Atomic Habits", author: "James Clear", publishedYear: 2018, genre: "Self-Help", ISBN: "978-0735211292" },
            { title: "Deep Work", author: "Cal Newport", publishedYear: 2016, genre: "Productivity", ISBN: "978-1455586691" }
        ]);
        console.log("Inserted books successfully");

        // Retrieve Data
        console.log("\nAll Books:");
        console.log(await booksCollection.find().toArray());

        console.log("\nBooks by Robert C. Martin:");
        console.log(await booksCollection.find({ author: "Robert C. Martin" }).toArray());

        console.log("\nBooks published after 2000:");
        console.log(await booksCollection.find({ publishedYear: { $gt: 2000 } }).toArray());

        // Update Data
        await booksCollection.updateOne(
            { ISBN: "978-0201616224" },
            { $set: { publishedYear: 2000 } }
        );
        console.log("\nUpdated published year of 'The Pragmatic Programmer'");

        await booksCollection.updateMany({}, { $set: { rating: 4.5 } });
        console.log("\nAdded 'rating' field to all books");

        // Delete Data
        await booksCollection.deleteOne({ ISBN: "978-0345339683" });
        console.log("\nDeleted 'The Hobbit'");

        await booksCollection.deleteMany({ genre: "Self-Help" });
        console.log("\nDeleted all 'Self-Help' books");

        // Aggregation
        console.log("\nTotal books per genre:");
        console.log(await booksCollection.aggregate([
            { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
        ]).toArray());

        console.log("\nAverage published year:");
        console.log(await booksCollection.aggregate([
            { $group: { _id: null, avgPublishedYear: { $avg: "$publishedYear" } } }
        ]).toArray());

        console.log("\nTop-rated book:");
        console.log(await booksCollection.find().sort({ rating: -1 }).limit(1).toArray());

        // Indexing
        await booksCollection.createIndex({ author: 1 });
        console.log("\nCreated an index on 'author' field");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("\nDisconnected from MongoDB");
    }
}

// Run the script
run();
