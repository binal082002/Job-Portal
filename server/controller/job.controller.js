const Application = require("../model/application.model");
const Job = require("../model/job.model");

const addJob = async(req,res,next) => {
    const {title,description,company,location} = req.body;

    const new_job = await Job.create({ title,description,company,location });

    return res.status(200).json({
      message: "Job created",
      res: new_job,
    });
}

const getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find({}).lean();

        const result = await Promise.all(
            jobs.map(async (job) => {
                const response = await Application.find({ job: job._id }).populate('user');
                let obj = { ...job };

                if (response.length > 0) {
                    obj = {
                        ...job,
                        users: response.map(r => r.user), // array of users
                    };
                }

                return obj;
            })
        );

        return res.status(200).json({
            message: "Jobs fetched",
            res: result,
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const applyJob = async(req,res,next) => {
    const user = req.user;
    const job_id = req.params.id;

    let application = await Application.findOne({ job :  job_id, user : user._id});
    if(!application) {
        application = await Application.create({ job :  job_id, user : user._id});
    }

    return res.status(201).json({
        message: "Applied to job",
        res: application,
    });

}

const getApplications = async(req,res,next) => {
    const applications = await Application.find().populate('user').populate('job');
    console.log(applications[0]);

    return res.status(200).json({
        message: "job fetched",
        res: applications,
    });

}

module.exports = {addJob,getJobs,applyJob,getApplications};