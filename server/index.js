const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getAllJobs, getJobsById, saveJobPosts } = require("./Controllers/jobs");

require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then((res) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Got error while connecting to DB."));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.send("This is the test API.....");
});

app.get("/api/jobs", getAllJobs);

app.get("/api/jobs/:id", getJobsById);

app.post("/api/jobs", saveJobPosts);

app.listen(PORT, () => console.log("Server is running on the PORT - ", PORT));
