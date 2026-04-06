const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/calculatorDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 📦 Schema
const calcSchema = new mongoose.Schema({
    expression: String,
    result: String,
});

const Calc = mongoose.model("Calc", calcSchema);

// ✅ Save calculation
app.post("/save", async (req, res) => {
    const { expression, result } = req.body;
    const newCalc = new Calc({ expression, result });
    await newCalc.save();
    res.send("Saved");
});

// 📜 Get history
app.get("/history", async (req, res) => {
    const data = await Calc.find();
    res.json(data);
});

// 🚀 Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});