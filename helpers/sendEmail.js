const sgMail = require("@sendgrid/mail");

const path = require("path");
const envPath = path.join(__dirname, "..", "config", ".env");
require("dotenv").config({ path: envPath });

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
