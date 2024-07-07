// host: "smtp.ethereal.email",
// port: 587,
// auth: {
//   user: "elvie.keeling96@ethereal.email",
//   pass: "xCxMtZfuEPUGPMGstA",
// },
const dotenv = require("dotenv");
dotenv.config();
export default {
  host: process.env.HOST_MAIL_TRANSPORTER,
  port: Number(process.env.PORT_MAIL_TRANSPORTER),
  service:'outlook',
  auth: {
    user: process.env.USER_MAIL_TRANSPORTER,
    pass: process.env.USER_PASSWORD_MAIL_TRANSPORTER,
  },
};
