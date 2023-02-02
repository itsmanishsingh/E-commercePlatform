import transporter from "../config/transporter.config";
import config from "../config/index";

// send mail with defined transport object

const mailHelper = async (options) => {
  const message = {
    from: config.SMTP_MAIL_EMAIL, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text // plain text body
  };

  await transporter.mailHelper(message);
};

export default mailHelper