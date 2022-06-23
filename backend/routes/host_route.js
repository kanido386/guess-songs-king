const router = require('express').Router();

const { wrapAsync } = require('../util');

const { signUp, signIn } = require('../controllers/host_controller');

router.route('/host/signup').post(wrapAsync(signUp));
router.route('/host/signin').post(wrapAsync(signIn));

module.exports = router;
