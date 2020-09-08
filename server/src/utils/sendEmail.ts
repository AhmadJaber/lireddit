import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(to: string, html: string) {
  /**
     * Generate test SMTP service account from ethereal.email
     * Only needed if you don't have a real mail account for testing
     * I only wanna create one test account copy&pest the account to "transporter"
     * Because i don't want to create different test account every invocation of sendMail

        let testAccount = await nodemailer.createTestAccount();
        console.log("testAccount", testAccount);
     */

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "l76n7qmv7ymobvio@ethereal.email", // generated ethereal user
      pass: "9m9ezJTh2R68Em6ykT", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "Change Password!!", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
