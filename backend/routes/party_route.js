const router = require('express').Router();

const { wrapAsync } = require('../util');

const {
  createParty, removeParty, checkParty, getPartyByPartyId, getPartiesByHostId, getTracksByPartyId,
} = require('../controllers/party_controller');

router.route('/party/create').post(wrapAsync(createParty));
router.route('/party/remove').post(wrapAsync(removeParty));
router.route('/party/check').post(wrapAsync(checkParty));
router.route('/party').post(wrapAsync(getPartyByPartyId));
router.route('/parties').post(wrapAsync(getPartiesByHostId));
router.route('/tracks').post(wrapAsync(getTracksByPartyId));

module.exports = router;
