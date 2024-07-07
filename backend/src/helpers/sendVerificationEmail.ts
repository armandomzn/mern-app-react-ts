import { sendEmail } from "./sendEmail";

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}: {
  name: string;
  email: string;
  verificationToken: string;
  origin: string;
}) => {
  const verifyEmailLink = `${origin}/user/verify-email?verificationToken=${verificationToken}&email=${email}`;
  const htmlMessage = `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Correo Personalizado</title>
      <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #cce2cc;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 0.875rem;
      }

      .container {
        max-width: 1100px;
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
        width: 95%;
        margin: 2rem auto;
      }

      .header {
        background-color: #026e00;
        color: #ede9fe;
        text-align: center;
        padding: 10px;
        border-radius: 8px 8px 0 0;
      }

      .header h1 {
        color: #cce2cc;
        text-transform: uppercase;
      }

      .header h1 span {
        color: #9ac599;
        text-transform: capitalize;
      }

      .content {
        padding: 1.25rem 2rem;
        color: #001600;
        background: #9ac599;
        font-size: 1rem;
        color: #014200;
      }

      .issuer-name,
      .issuer-email {
        font-weight: bold;
        margin: 0;
      }

      .user-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: space-between;
      }

      .verify-email {
        display: inline-block;
        text-transform: capitalize;
        font-weight: bold;
        text-decoration: none;
        padding: 0.275rem 0.575rem;
        border-radius: 5px;
        transition: color 0.3s ease-in-out, background 0.3s ease-in-out;
        color: #026e00;
        border: 1px solid #026e00;
      }

      .verify-email:hover {
        color: #cce2cc;
        background: #026e00;
      }

      .footer {
        text-align: center;
        padding: 10px;
        background-color: #025800;
        border-radius: 0 0 8px 8px;
        color: #cce2cc;
      }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>mern <span>jobs</span></h1>
        </div>
        <div class="content">
          <p>Hello, ${name}</p>
          <p>
            Please confirm your email by clicking on the following link:
            <a href="${verifyEmailLink}" class="verify-email">verify email</a>
          </p>
          <p>Best regards,</p>
          <div class="user-container">
            <p class="issuer-name">MERN App Jobs</p>
            <p class="issuer-email">mernappjobs@outlook.com</p>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent using Node.js and Nodemailer.</p>
        </div>
      </div>
    </body>
  </html>
  `;
  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: htmlMessage,
  });
};

export { sendVerificationEmail };
