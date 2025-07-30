import React, { useState } from "react";
import styles from "./AddJob.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://knovator-job-posts.vercel.app/api";

export default function AddJob() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(
      ">>>>>> the value of the name is : ",
      name,
      " and the value is  : ",
      value
    );
    setJobDetails((prevJob) => {
      return { ...prevJob, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(">>>>>> the value of the ADD JOB POST is  : ", jobDetails);
      if (jobDetails.title == "" || jobDetails.title.trim() == "") {
        alert("Please provide Job Title.");
        return;
      }
      if (jobDetails.company == "" || jobDetails.company.trim() == "") {
        alert("Please provide Company name.");
        return;
      }
      if (jobDetails.type == "" || jobDetails.type.trim() == "") {
        alert("Please provide Job type.");
        return;
      }
      if (!["full-time", "part-time"].includes(jobDetails.type)) {
        alert("Job type must only be 'full-time' or 'part-time'.");
        return;
      }
      if (jobDetails.location == "" || jobDetails.location.trim() == "") {
        alert("Please provide job location.");
        return;
      }
      if (jobDetails.description == "" || jobDetails.description.trim() == "") {
        alert("Please provide Job description.");
        return;
      }

      const saveJobPost = await axios.post(baseUrl + "/jobs", jobDetails);
      console.log(
        ">>>>> the value of the SAVE JOB POST is : ",
        saveJobPost.data
      );
      if (saveJobPost.status == 200) alert("Job Saved Successfully.");

      setJobDetails({
        title: "",
        company: "",
        type: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.log(">>>>> Got error while adding the Job.");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>back</button>
      <div className={styles.main}>
        <form onSubmit={handleSubmit}>
          <h1>Add the Job Post</h1>
          <div>
            <span>Job Title</span>
            <input
              type="text"
              name="title"
              onChange={handleInputChange}
              value={jobDetails.title}
              required
            />
          </div>
          <div>
            <span>Company</span>
            <input
              type="text"
              name="company"
              onChange={handleInputChange}
              value={jobDetails.company}
              required
            />
          </div>
          <div>
            <span>Job Type</span>
            <input
              type="text"
              name="type"
              onChange={handleInputChange}
              value={jobDetails.type}
              required
            />
          </div>
          <div>
            <span>Location</span>
            <input
              type="text"
              name="location"
              onChange={handleInputChange}
              value={jobDetails.location}
              required
            />
          </div>
          <div>
            <span>Description</span>
            <input
              type="text"
              name="description"
              onChange={handleInputChange}
              value={jobDetails.description}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
