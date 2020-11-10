const SEND_GRID_API_KEY =
  "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";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SEND_GRID_API_KEY);

// sgMail.send({
//   to: "zanetti.giovani@gmail.com",
//   from: "zanetti.giovani@gmail.com",
//   subject: "Testting first email",
//   text: "I hope it worked.",
// });

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "zanetti.giovani@gmail.com",
    subject: "Welcome!!",
    text: `Hi ${name}! \n Welcome to the app.`,
  });
};

module.exports = {
  sendWelcomeEmail,
};
