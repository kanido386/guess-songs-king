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

// const signIn = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).send({
//       error: 'Request Error: email and password are required.',
//     });
//     return;
//   }

//   const result = await Host.signIn(email, password);
//   if (result.error) {
//     res.status(403).send({
//       error: result.error,
//     });
//     return;
//   }

//   const { host } = result;
//   if (!host) {
//     res.status(500).send({
//       error: 'Database Query Error',
//     });
//     return;
//   }

//   res.status(200).send({
//     host: {
//       id: host.id,
//       nickname: host.nickname,
//       email: host.email,
//       accessToken: host.accessToken,
//     },
//   });
// };

module.exports = {
  createParty,
  // signIn,
};
