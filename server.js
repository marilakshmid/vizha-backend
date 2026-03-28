const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors());

// 🔹 MongoDB connect
mongoose.connect("mongodb+srv://vizhaevents_db_user:vizha123@vizhaevents.jo291n7.mongodb.net/vizha-events")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => {
  console.log("MongoDB Error ❌");
  console.log(err);
});

// 🔹 Schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  eventType: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// 🔹 API
app.post('/api/bookings', async (req, res) => {
  try {
    const data = new Booking(req.body);
    await data.save();

    res.status(201).json({ message: "Booking saved successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving data ❌" });
  }
});

// 🔹 Test route
app.get('/', (req, res) => {
  res.send("Server Running 🚀");
});

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});