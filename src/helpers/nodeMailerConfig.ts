const dotenv = require("dotenv");
dotenv.config();
export default {
  host: process.env.HOST_MAIL_TRANSPORTER,
  port: Number(process.env.PORT_MAIL_TRANSPORTER),
  auth: {
    user: process.env.USER_MAIL_TRANSPORTER,
    pass: process.env.USER_PASSWORD_MAIL_TRANSPORTER,
  },
  tls: {
    rejectUnauthorized: false, // If false the page's trust certificate won't be checked.
  },
};
