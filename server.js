const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb://foodcorner:food12345@ac-ixq2q86-shard-00-00.otmgczq.mongodb.net:27017,ac-ixq2q86-shard-00-01.otmgczq.mongodb.net:27017,ac-ixq2q86-shard-00-02.otmgczq.mongodb.net:27017/foodcorner?ssl=true&replicaSet=atlas-weeav3-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

// Food Data
const foods = [
  { id: 1, name: "Chicken Biryani", price: 249 },
  { id: 2, name: "Fried Rice", price: 179 },
  { id: 3, name: "Masala Dosa", price: 89 },
  { id: 4, name: "Idli Sambar", price: 59 },
  { id: 5, name: "Mango Juice", price: 60 },
  { id: 6, name: "Watermelon Juice", price: 50 },
  { id: 7, name: "Lemon Juice", price: 30 },
  { id: 8, name: "Chicken Curry", price: 199 },
  { id: 9, name: "Fish Curry", price: 249 },
  { id: 10, name: "Prawn Curry", price: 299 }
];

// Order Schema
const orderSchema = new mongoose.Schema({
  items: Number,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

// Routes
app.get("/", (req, res) => {
  res.send("FoodCorner Backend Running");
});

app.get("/foods", (req, res) => {
  res.json(foods);
});

app.post("/order", async (req, res) => {
  try {

    const newOrder = new Order({
      items: req.body.items,
      totalAmount: req.body.totalAmount
    });

    await newOrder.save();

    console.log("📦 Order Saved:", newOrder);

    res.json({
      success: true,
      message: "Order Saved Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to Save Order"
    });

  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});