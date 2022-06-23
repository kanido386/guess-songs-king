const router = require('express').Router();

const { wrapAsync } = require('../util');

const { signUp } = require('../controllers/host_controller');

router.route('/host/signup').post(wrapAsync(signUp));

module.exports = router;
