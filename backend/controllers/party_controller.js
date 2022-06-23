/* eslint-disable no-await-in-loop */

require('dotenv').config();
const validator = require('validator');
const Party = require('../models/party_model');

const createParty = async (req, res) => {
  let { partyName } = req.body;
  const {
    hostId, tracks, numQ1, numQ2, numQ3,
  } = req.body;

  partyName = validator.escape(partyName);

  const result = await Party.createParty(hostId, partyName, numQ1, numQ2, numQ3);
  if (result.error) {
    res.status(403).send({
      error: result.error,
    });
    return;
  }

  const { party } = result;
  if (!party) {
    res.status(500).send({
      error: 'Database Query Error',
    });
    return;
  }

  // const {
  //   id, host_id, name, questions,
  // } = party;

  const { id } = party;
  const createdTracks = [];

  for (let i = 0; i < tracks.length; i += 1) {
    const result2 = await Party.createTrack(id, tracks[i]);
    if (result2.error) {
      res.status(403).send({
        error: result2.error,
      });
      return;
    }
    const { track } = result2;
    if (!track) {
      res.status(500).send({
        error: 'Database Query Error',
      });
      return;
    }
    createdTracks.push(track);
  }

  // console.log('==============================');
  // console.log('hi');
  // console.log('==============================');

  res.status(200).send({
    party,
    createdTracks,
    // host: {
    //   id: host.id,
    //   nickname: host.nickname,
    //   email: host.email,
    //   accessToken: host.accessToken,
    // },
  });
};

const getPartiesByHostId = async (req, res) => {
  const { hostId } = req.body;

  const result = await Party.getPartiesByHostId(hostId);
  if (result.error) {
    res.status(403).send({
      error: result.error,
    });
    return;
  }

  const { parties } = result;
  if (!parties) {
    res.status(500).send({
      error: 'Database Query Error',
    });
    return;
  }

  res.status(200).send({
    parties,
  });
};

const getPartyByPartyId = async (req, res) => {
  const { partyId } = req.body;

  const result = await Party.getPartyByPartyId(partyId);
  if (result.error) {
    res.status(403).send({
      error: result.error,
    });
    return;
  }

  const { party } = result;
  if (!party) {
    res.status(500).send({
      error: 'Database Query Error',
    });
    return;
  }

  res.status(200).send({
    party,
  });
};

const getTracksByPartyId = async (req, res) => {
  const { partyId } = req.body;

  const result = await Party.getTracksByPartyId(partyId);
  if (result.error) {
    res.status(403).send({
      error: result.error,
    });
    return;
  }

  const { tracks } = result;
  if (!tracks) {
    res.status(500).send({
      error: 'Database Query Error',
    });
    return;
  }

  res.status(200).send({
    tracks,
  });
};

module.exports = {
  createParty,
  getPartyByPartyId,
  getPartiesByHostId,
  getTracksByPartyId,
};
