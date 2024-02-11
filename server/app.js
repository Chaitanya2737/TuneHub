const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Your previous implementation for the login route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

const artistRoutes = require("./routes/artist")
app.use("/api/artists" ,  artistRoutes)



const albumRoutes = require("./routes/album")
app.use("/api/albums" ,  albumRoutes)



const songRoutes = require("./routes/song")
app.use("/api/songs" ,  songRoutes)

// Example route with CORS headers explicitly set
app.get("/api/users/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Handle the request here
  res.json({ message: 'Login route accessed' });
});

app.use(express.json())
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
