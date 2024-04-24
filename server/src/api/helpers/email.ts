import SendGrid from "@sendgrid/mail";

SendGrid.setApiKey(process.env.SENDGRID);

export const SENDEMAIL = (email: string, subject: string, message) => {
  SendGrid.send({
    to: email,
    from: "raminjoshua05@gmail.com",
    subject,
    content: [{ type: "text/html", value: message }],
  });
};
