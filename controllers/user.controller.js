const userservice= require("../services/user.services");
const userModel =require("../models/user.model");
exports.otplogin = async (req,res,next) => {
  userservice.sendotp(req.body,(error,results)=>{
    if(error){
        return next(error);
    }
    return res.status(200).send({
        message:"Success",
        data:results,
    });
  });
};
exports.verifyotp = async (req,res,next) => {
  userservice.verifyotp(req.body,(error,results)=>{
    if(error){
        return next(error);
    }
    return res.status(200).send({
        message:"Success",
        data:results,
    });
  });
  };exports.checkuser = async (req, res, next) => {
    try {
      console.log("check user entered");
      const phone = req.body.phone; // Correctly extract phone number from request body
      const user = await userModel.findOne({ phonenumber: phone });
  
      if (!user) {
        console.log("New User");
        res.status(200).json({ status: true, data: null });
      } else {
        console.log("Old User");
        res.status(200).json({
          status: true,
          data: {
            _id: user._id,
            phonenumber: user.phonenumber,
            age: user.age,
            city: user.city
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
  };
  
exports.signup= async (req,res,next)=>{
   try {
      const {username, phonenumber, age, city}= req.body;
      const newdata =new userModel({username, phonenumber,age, city});
      await newdata.save();
      res.json("data created");
      console.log("data created");
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    console.log("Internal server error");
   } 
  }