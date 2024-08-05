const router= require("express").Router();
const usercontroller= require("../controllers/user.controller");

router.post("/send-otp",usercontroller.otplogin);
router.post("/verifyotp",usercontroller.verifyotp);
router.post("/checkuser",usercontroller.checkuser);
router.post("/signup",usercontroller.signup);
module.exports=router;