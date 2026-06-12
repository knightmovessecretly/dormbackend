const express = require("express");
const cors = require("cors");
const path = require("path");
const basicAuth = require('express-basic-auth');

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 good fallback
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bed-requests", require("./routes/bedRequestRoutes"));

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

/*
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
*/


app.use(
  '/api-docs',
  basicAuth({
    users: {
      admin: 'mypassword'
    },
    challenge: true
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

module.exports = app;