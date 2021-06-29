const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports = function sendEmail(email, phoneNumber) {
  return new Promise( async (resolve, reject) => {
    try {
      let testEmailAccount = await nodemailer.createTestAccount()
      // для работы данного модуля в аккаунте гугл нужно разрешить доступ для "сомнительных" приложений
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.gmail.user,
          pass: config.gmail.password,
        },
      })

      let result = await transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: email,
        subject: 'Восстановление номера телефона',
        text: `Восстановленный номер телефона: ${phoneNumber}`,
        html:
          `Восстановленный номер телефона: ${phoneNumber}`,
      })
      resolve(result)
    }catch (e) {
      reject(e)
    }
  })
}
