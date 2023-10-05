
import newMessagesTemplate from './emailTemplates/newMessagesTemplate';
import teamEmailTemplate from './emailTemplates/teamEmailTemplate';

const sendChatEmail = (formState) => {
    const emailData = {
      SecureToken: "4e7ed75d-eafe-4cd2-b6e4-4a77cc78ff4f",
      To : formState.toEmail,
      From: "support@edulisting.in",
      Subject: formState.subject,
      Body: newMessagesTemplate(formState),
    };

    window.Email.send(emailData)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

export default sendChatEmail  