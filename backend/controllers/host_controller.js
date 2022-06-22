require('dotenv').config();
const validator = require('validator');
const Host = require('../models/host_model');


const signUp = async (req, res) => {
  let { nickname } = req.body;
  const { email, password } = req.body;

  if(!nickname || !email || !password) {
    res.status(400).send({
      error: 'Request Error: name, email and password are required.'
    });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send({
      error: 'Request Error: Invalid email format'
    });
    return;
  }

  nickname = validator.escape(nickname);

  const result = await Host.signUp(nickname, email, password);
  if (result.error) {
    res.status(403).send({
      error: result.error
    });
    return;
  }

  const host = result.host;
  if (!host) {
    res.status(500).send({
      error: 'Database Query Error'
    });
    return;
  }

  res.status(200).send({
    host: {
      id: host.id,
      nickname: host.nickname,
      email: host.email,
      accessToken: host.accessToken
    }
  });

}


module.exports = {
  signUp
};