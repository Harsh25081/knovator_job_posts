import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import developerImg from "../../Assests/developer.jpeg";
import styles from "./ParticularJob.module.css";

const baseUrl = "https://knovator-job-posts.vercel.app/api";

export default function ParticularJob() {
  const [jobDetails, setJobDetails] = useState(null);
  const { id } = useParams();
  console.log(">>>> the value of the JOB id from params is : ", id);

  const navigate = useNavigate();

  const getParticularJobDetails = async () => {
    try {
      const details = await axios.get(baseUrl + `/jobs/${id}`);
      console.log(">>>>>> the value of the details is : ", details.data);
      setJobDetails(details.data.data);
    } catch (error) {
      console.log(">>>> Got error while getting the particular job details.");
    }
  };

  useEffect(() => {
    getParticularJobDetails();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <div className={styles.main}>
        <img src={developerImg} alt="developerImg" />
        {jobDetails == null ? (
          <p>No details found</p>
        ) : (
          Object.keys(jobDetails).map((data, index) => {
            return (
              <div key={index} className={styles.details}>
                <h4>{data} :</h4>
                <p>{jobDetails[data]}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
