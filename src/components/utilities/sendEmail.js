
import teamEmailTemplate from './emailTemplates/teamEmailTemplate';

const sendEmail = (formState) => {
    const emailData = {
      SecureToken: "4e7ed75d-eafe-4cd2-b6e4-4a77cc78ff4f",
      To: "alokskj14@gmail.com",
      From: "support@edulisting.in",
      Subject: "New Listing Arrived for approval",
      Body: teamEmailTemplate(formState),
    };

    window.Email.send(emailData)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

export default sendEmail