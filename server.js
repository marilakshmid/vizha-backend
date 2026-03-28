const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// 🔹 MongoDB Connect (IMPORTANT 🔥)
mongoose.connect("mongodb+srv://vizhaevents_db_user:vizha%40123@vizhaevents.jo291n7.mongodb.net/vila-events?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error:", err));


// 🔹 Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  eventType: String,
  message: String
});

// 🔹 Model
const Booking = mongoose.model("Booking", bookingSchema);


// 🔹 Root Route (Render test)
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});


// 🔹 POST API (SAVE DATA)
app.post("/api/bookings", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); // debug

    const booking = new Booking(req.body);
    await booking.save();

    res.json({ message: "Booking saved successfully ✅" });

  } catch (err) {
    console.log("Error:", err); // debug
    res.status(500).json({ error: "Error saving data ❌" });
  }
});


// 🔹 START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});