const connectDB = require("./db");
const multer = require("multer");
const resumeUpload = require("./controller/upload.controller");
const {register,login,getUser} = require("./controller/auth.controller");
const {addJob,getJobs,applyJob,getApplications} = require("./controller/job.controller");

const authMiddleware = require("./middleware/auth");
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = 5000

app.use(cors());

app.use(express.urlencoded())
app.use(express.json());

app.post('/register',register);
app.post('/login',login);
app.get("/user",authMiddleware,getUser);

app.post('/add-job',authMiddleware,addJob);
app.get('/jobs',getJobs);
app.post('/apply-job/:id',authMiddleware,applyJob);
app.get('/applications',authMiddleware,getApplications);

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },

    filename : function(req,file,cb){
        console.log(req.user);
        return cb(null,`${req.user._id}-${file.originalname}`);
    }
})
const upload = multer({storage});

app.post("/upload",authMiddleware,upload.single('resume'),resumeUpload);

app.listen(PORT,async()=>{
    await connectDB();
    console.log("Server started on port: ",PORT);
});

