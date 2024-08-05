const otpgenerator = require("otp-generator");
const crypto = require("crypto");

const twilio = require("twilio");
require('dotenv').config();
const key = process.env.OTP_SECRET_KEY; 
const accountSid = process.env.TWILIO_ACCOUNT_STRING;

const authToken =process.env.TWILIO_AUTH_TOKEN; // Replace with your Auth Token
const twilioPhoneNumber = process.env.TWILIO_MBL_NUMBER; // Replace with your Twilio phone number

const client = new twilio(accountSid, authToken);
const sendotp = async (req, res) => {
  console.log("called sendotp");
  const otp = otpgenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const ttl = 5 * 60 * 1000; // 5 minutes in milliseconds
  const expires = Date.now() + ttl;
  const data = `${req.phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  const fullhash = `${hash}.${expires}`;
  
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhoneNumber,
      to: req.phone,
    });
    console.log(`OTP sent to ${req.phone}`);
  } catch (error) {
    console.error("Failed to send OTP via SMS:", error);
    return res("Failed to send OTP");
  }
  console.log(`Your OTP is ${otp}`);
  return res(null, fullhash);
};

const verifyotp = async (req, res) => {
  let [hashvalue, expires] = req.hash.split(".");

  let now = Date.now();
  if (now > parseInt(expires)) return res.status(400).send("OTP expired");

  const data = `${req.phone}.${req.otp}.${expires}`;
  let newhash = crypto.createHmac("sha256", key).update(data).digest("hex");
  if (newhash === hashvalue) {
    return res(null,
     "Success"
    );
  }
  return res("Invalid OTP");
};

module.exports = {
  sendotp,
  verifyotp
};
