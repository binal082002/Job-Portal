const User = require("../model/user.model");

const resumeUpload = async(req,res,next) => {
    // console.log(req.file);
    const user = req.user;
    const user_exist = await User.findOne({email : user.email});
    if(!user_exist) return res.status(400).json({ message: "User does not exist" });

    await User.updateOne({email : user.email},{$set : {resume : `/uploads/${req.user._id}-${req.file.filename}`}});
    return res.status(201).json({message : 'Resume uploaded'});
}

module.exports = resumeUpload;