import nodemailer from "nodemailer";
import nodeMailerConfig from "./nodeMailerConfig";
const sendEmail = ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport(nodeMailerConfig);
  // send mail with defined transport object
  return transporter.sendMail({
    from: `"MERN APP JOBS 👻" <${process.env.USER_MAIL_TRANSPORTER}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};

export { sendEmail };
