const router = require('express').Router();

const { wrapAsync } = require('../util');

const { createParty } = require('../controllers/party_controller');

router.route('/party/create').post(wrapAsync(createParty));

module.exports = router;
