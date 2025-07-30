const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: { type: String, default: "" },
    company: { type: String, default: "" },
    type: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("JobBoard", jobSchema);

module.exports = jobModel;
