// const { MongoClient } = require("mongodb");
// const express = require("express");
// const app = express();
// const cors = require("cors");

// const port = process.env.PORT || 5000;
// require("dotenv").config();

// // middleware
// app.use(cors());
// app.use(express.json());

// const uri =
//   "mongodb+srv://khair:khair@cluster0.2vil1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("ok");
// });
// app.listen(port, () => {
//   console.log("Runnig ema", port);
// });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("onlineShop");
//     const productsCollection = database.collection("products");
//     // Get products api
//     app.get("/products", async (req, res) => {
//       const cursor = productsCollection.find({});
//       const products = await cursor.toArray();
//       res.send(products);
//     });
//   } finally {
//     // await client.close()
//   }
// }
// -----------------------------------------------
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2vil1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("onlineShop");
    const productsCollection = database.collection("products");

    // Get product api
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find({});
      const products = await cursor.toArray();
      const count = await cursor.count();
      res.send({
        count,
        products,
      });
    });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Ema jon server is runing");
});

app.listen(port, () => {
  console.log("Server running at port", port);
});
