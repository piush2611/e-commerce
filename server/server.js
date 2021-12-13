const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const authRoutes = require("./routes/AuthRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const itemRoutes = require("./routes/ItemRoutes");

// cors
app.use(cors());

// dot env configs
require("dotenv").config();

// accepting incoming request data as json object
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Server is listening");
});

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log("server is listening", process.env.PORT);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongo connection made");
    })
    .catch((err) => {
      console.log(err);
    });
});
