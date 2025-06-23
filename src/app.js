require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const taskRoutes = require("./routes/tasksRoutes");

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_rvDaR42yYhtw@ep-polished-resonance-a8sxu1fj-pooler.eastus2.azure.neon.tech/neondb?sslmode=require", // 
  // user: process.env.DB_USER, //
  // host: process.env.DB_HOST, //
  // database: process.env.DB_NAME, //
  // password: process.env.DB_PASSWORD, //
  // port: process.env.DB_PORT, //
  // ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false //
});

app.locals.pool = pool;

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
