const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("./db/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bodyParser = require("body-parser");
const app = express();

// dotenv config
dotenv.config();

// connection mongodb database
connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(errorHandler);
// middleware bodyparser
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>welcome to node server</h1>");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = 8080;

app.listen(process.env.PORT || PORT, () => {
  console.log(
    `server running on ${process.env.NODE_ENV} on mode port ${process.env.PORT}`
  );
});
