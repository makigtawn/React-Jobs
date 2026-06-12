import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

const hasSmtpConfig = () =>
  Boolean(env.smtpHost && env.smtpUser && env.smtpPass && env.smtpFrom);

export const sendRejectionEmail = async ({ to }) => {
  if (!hasSmtpConfig()) {
    throw new HttpError(500, "SMTP settings are required to send rejection email");
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  await transporter.sendMail({
    from: env.smtpFrom,
    to,
    subject: "Application Update",
    text: "Thank you for applying. After reviewing your application, we have decided not to move forward at this time. We appreciate your interest and wish you success in your job search.",
  });
};
