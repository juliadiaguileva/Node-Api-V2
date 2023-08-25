//Paste in server.js file to access .env file
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
// no need this anymore const Product = require("./models/productModel");
const app = express();

const PORT = process.env.PORT || 3000;
//create variable to store Variable from .env file
const MONGO_URL = process.env.MONGO_URL;
//how can you acces this through browser?you have to declare/set up a route.
//app.get('/',(req, res)) request is what client sends to you and response is what you respond back to the client
const FRONTEND = process.env.FRONTEND;
//middleware
//you can also use the body parser npm package instead of app.use(express.urlencoded({ extended: false }));
//https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200;
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoute);
app.get("/", (req, res) => {
  //throw new Error("fake error");
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send(req.body);
});

app.use(errorMiddleware);

//"mongodb+srv://admin:admin@cluster0.3zhvvw9.mongodb.net/Node-API?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log("Node is running on port ${PORT}");
    });
  })
  .catch(() => {
    console.log(error);
  });
