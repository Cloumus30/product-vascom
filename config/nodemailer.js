const { renderFile } = require('ejs');
const nodemailer = require('nodemailer');
const path = require('path')

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASS,
    },
  });


const sendMailPass = async (from, to, subject, password) =>{
  const pathTemplate = path.join(__dirname, '../views/email/pass.ejs')
  const dat = await renderFile(pathTemplate, {password} , async (err, data)=>{
    if(err){
      throw new Error(err.message)
    }

    const email = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: data
    })
    return email
  })
  
  return dat
}

module.exports = {
    transporter,
    sendMailPass
}