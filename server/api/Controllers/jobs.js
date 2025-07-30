const jobModel = require("../Schemas/jobSchema");

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await jobModel.find({});
    console.log(">>>>> the value of the all jobs is : ", allJobs);

    return res
      .status(200)
      .send({ message: "Jobs get successfully", data: allJobs });
  } catch (error) {
    console.log(">>>> the error in the get all jobs api is : ", error);
    return res.status(500).send({ message: "Error", error });
  }
};

const getJobsById = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(">>>>> the value of the jobId is : ", jobId);

    const jobDetails = await jobModel.findById({ _id: jobId });
    console.log(">>>>>> the value of the job Details is : ", jobDetails);

    if (!jobDetails)
      return res.status(404).send({ message: "Job not found with this Id." });

    return res
      .status(200)
      .send({ message: "Job get successfully", data: jobDetails });
  } catch (error) {
    console.log(">>>> the error in the get job by id api is : ", error);
    return res.status(500).send({ message: "Error", error });
  }
};

const saveJobPosts = async (req, res) => {
  try {
    const inputData = req.body;
    console.log(">>>> the input data is : ", inputData);

    const { title, company, type, location, description } = inputData;

    // validation
    if (!title || title.trim() == "")
      return res.status(400).send({ message: "Please enter the title field." });
    if (!company || company.trim() == "")
      return res
        .status(400)
        .send({ message: "Please enter the company field." });
    if (!type || type.trim() == "")
      return res.status(400).send({ message: "Please enter the type field." });
    if (!location || location.trim() == "")
      return res
        .status(400)
        .send({ message: "Please enter the location field." });
    if (!description || description.trim() == "")
      return res
        .status(400)
        .send({ message: "Please enter the description field." });

    const saveJob = await jobModel.create({
      title,
      company,
      type,
      location,
      description,
    });
    console.log("the value of saveJob is : ", saveJob);

    return res.status(200).send({ message: "Saved Successfully" });
  } catch (error) {
    console.log(">>>>> the error in the add job api is : ", error);
    return res.status(500).send({ message: "Error", error });
  }
};

module.exports = { saveJobPosts, getJobsById, getAllJobs };
