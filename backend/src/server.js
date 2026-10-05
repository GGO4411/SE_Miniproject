require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");
require("./models/User"); // ensures the model is registered before sync()
const authRoutes = require("./routes/authRoutes");
const exampleProtectedRoutes = require("./routes/exampleProtectedRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
// Members 2-4: mount your own routers here, e.g.
// app.use("/api/events", eventRoutes);
// app.use("/api/registrations", registrationRoutes);
app.use("/api/example", exampleProtectedRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// `sync()` auto-creates tables from the models above. This is fine for local
// dev; once you add more models, consider Sequelize migrations instead of sync().
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`EMS backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
