const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const config = require("./config");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/referralRoutes")); // Instead of "/api/auth"


app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));


