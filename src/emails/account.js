const SEND_GRID_API_KEY =
  "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";
const SENDER_EMAIL = "zanetti.giovani@gmail.com";
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
    from: SENDER_EMAIL,
    subject: "Welcome!!",
    text: `Hi ${name}!\n \nWelcome to the app.`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: SENDER_EMAIL,
    subject: "Good Bye",
    text: `Dear ${name}.\n
          We are sorry to se you go. You are a valuable costumer for us.\n 
          If you change your mind in the future we are going to be always here for you. \n
          From now on yur account is no longer active.\n \n 
          Best Regards,\n
          Our App`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
