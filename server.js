const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to Database
connectDB();

//Allow cross origin resourse sharing
app.use(cors());

// get the body in data
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Mount Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/spoonapi", require("./routes/api/spoonapi"));
app.use("/api/recipe", require("./routes/api/recipe"));
app.use("/api/like", require("./routes/api/like"));
app.use("/api/save", require("./routes/api/save"));
app.use("/api/comment", require("./routes/api/comment"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on Port " + PORT));
