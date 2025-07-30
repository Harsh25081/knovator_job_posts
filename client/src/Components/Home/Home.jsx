import axios from "axios";
import React, { useEffect, useState } from "react";
import developerImg from "../../Assests/developer.jpeg";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/api";

export default function Home() {
  const [jobsList, setJobsList] = useState([]);

  const navigate = useNavigate();

  const getJobsList = async () => {
    try {
      const jobs = await axios.get(baseUrl + "/jobs");
      console.log(">>>>> the jobs are : ", jobs.data);
      setJobsList(jobs.data.data);
    } catch (error) {
      console.log(">>>>> the error while getting jobs list is : ", error);
    }
  };

  useEffect(() => {
    getJobsList();
  }, []);

  return (
    <div className={styles.main}>
      <div>
        <h2>Job Applications</h2>
        <button onClick={() => navigate("/add-job")}>Add Job</button>
      </div>
      {jobsList.length == 0 ? (
        <p>No job post.Right now.Check again later</p>
      ) : (
        <div className={styles.outerContainer}>
          {jobsList.map((eachJob, index) => {
            return (
              <div key={index} onClick={() => navigate(`/job/${eachJob._id}`)}>
                <img src={developerImg} alt="developerImg" />
                <div>
                  <h3>Role : {eachJob.title}</h3>
                  <p>Company : {eachJob.company}</p>
                  <p>Location : {eachJob.location}</p>
                  <p>Type : {eachJob.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
