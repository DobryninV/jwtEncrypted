const { Router } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const User = require('../db/models/User');
const sendEmail = require('../handlers/sendEmail');

const router = Router();

router.get('/', (req, res) => {
  res.render('mainForm', {
    title: 'Добавление пользователя'
  })
})
router.get('/recovery', (req, res) => {
  res.render('recoveryForm', {
    title: 'Восстановление доступа'
  })
})
router.post('/', async (req, res) => {
  if (!req.body) {
    res.redirect('/');
  }
  if (req.body.phoneNumber && req.body.email) {
    console.log(req.body.email)
    const encryptedPhone = jwt.sign(req.body.phoneNumber, config.JWT_SECRET);
    const encryptedEmail = jwt.sign(req.body.email, config.JWT_SECRET);
    
    const user = new User({
      phoneNumber: encryptedPhone,
      email: encryptedEmail,
    });
    await user.save();
  }
  res.redirect('/');
})

router.post('/recovery', async (req, res) => {
  const encryptedEmail = jwt.sign(req.body.email, config.JWT_SECRET);
  const findEmail = await User.findOne({ email: encryptedEmail });
  console.log(findEmail)
  if (!findEmail) {
    res.render('recoveryForm', {
      nonExistentEmail: true
    });
  }
  const decryptedEmail = jwt.verify(findEmail.email, config.JWT_SECRET);
  const decryptedPhone = jwt.verify(findEmail.phoneNumber, config.JWT_SECRET);
  const isSend = await sendEmail(decryptedEmail, decryptedPhone);
  res.redirect('/');
})

module.exports = router;