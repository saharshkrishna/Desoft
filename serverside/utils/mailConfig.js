// utils/mailConfig.js
const { Resend } = require('resend');

// Use your secret key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = resend;
