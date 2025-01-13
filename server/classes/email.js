const {createTransport} = require("nodemailer");

/* Provides a wrapper over nodemailer for sending emails. */
class EmailService {
  constructor(SMTPUsername, SMTPPassword, SMTPHost) {
    const connString = `smtps://${SMTPUsername}:${SMTPPassword}@${SMTPHost}/?pool=true`;
    const defaults = {from: 'emsclubs@email.lyallstewart.com'}
    const transporter = createTransport(connString, defaults);
  }
}

/* Provides a template for each type of email needing sending */
class Email {
  constructor(dest, subject, text) {
    if(this.#validateEmail(dest)) {
      this.dest = dest
      this.subject = subject
      this.text = text
    }
  }
  
  #validateEmail(email) {
    // Regular expression taken from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    return email.match(`/^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$/i;`)
  }
}

module.exports = { EmailService, Email };