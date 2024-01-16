const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connection() {
  try {
    const database = client.db("moka_rmt43_mongodb");
    // const movies = database.collection("movies");
    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: "Back to the Future" };
    // const movie = await movies.findOne(query);
    // console.log(movie);
    db = database;
    return database;
  } catch (err) {
    console.log(err);
  }
}

function getDb() {
  return db;
}
// run().catch(console.dir);

module.exports = { getDb, connection };
