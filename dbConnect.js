const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load .env variables

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri); // Removed deprecated options

const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    // Optional: list databases
    const databases = await client.db().admin().listDatabases();
    console.log("📂 Databases:");
    databases.databases.forEach(db => console.log(` - ${db.name}`));

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  } finally {
    await client.close(); // Optional: remove this if you want to keep the connection open for app use
  }
};

module.exports = connectDB;
