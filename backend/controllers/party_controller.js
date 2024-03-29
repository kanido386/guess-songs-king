/* eslint-disable no-nested-ternary */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */

require('dotenv').config();

const { SONG_PROCESSOR_URL } = process.env;
const validator = require('validator');
const axios = require('axios');
const youtubedl = require('youtube-dl-exec');
const _ = require('lodash')
const Party = require('../models/party_model');

// https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
// Returns a Promise that resolves after "ms" Milliseconds
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const getAudioUrls = async (req, res) => {
  const { videoUrls } = req.body;
  const audioUrls = [];
  // https://stackoverflow.com/questions/41743510/extract-just-the-audio-link-from-a-youtube-video-without-converting
  for (let i = 0; i < videoUrls.length; i += 1) {
    await youtubedl(videoUrls[i], {
      getUrl: true,
      format: 140,
    }).then((audioUrl) => {
      console.log(audioUrl);
      audioUrls.push(audioUrl);
    });
  }

  res.status(200).send({
    audioUrls,
  });
};

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
    // FIXME:
    const qType = (i < numQ1) ? 1 : (i < numQ1 + numQ2) ? 2 : 3;
    const result2 = await Party.createTrack(id, tracks[i], qType);
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

  console.log('==============================');
  console.log(createdTracks);
  console.log('==============================');

  // res.on('finish', async () => {
  //   for (let i = 0; i < createdTracks.length; i += 1) {
  //     // TODO:
  //     axios
  //       .post(`${SONG_PROCESSOR_URL}/api/v1/download_and_process`, {
  //         track_id: createdTracks[i].id,
  //         artist_name: createdTracks[i].artist,
  //         track_name: createdTracks[i].name,
  //         q_type: createdTracks[i].q_type,
  //       });

  //     // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
  //     // TODO:
  //     await timer(10000); // then the created Promise can be awaited
  //   }
  //   // await timer(11000);
  //   // window.open('mailto:kanido386@gmail.com?subject=【通知】猜歌我最強&body=歌曲集處理完畢囉！');
  // });
  res.on('finish', async () => {
    const chunks = _.chunk(createdTracks, 3);
    for (let i = 0; i < chunks.length; ++i) {
      const chunk = chunks[i];
      const pms = chunk.map(track => {
        return axios.post(`${SONG_PROCESSOR_URL}/api/v1/download_and_process`, {
          track_id: track.id,
          artist_name: track.artist,
          track_name: track.name,
          q_type: track.q_type,
        });
      });
      await Promise.all(pms)
      await timer(10000);
    }
  });

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

const removeParty = async (req, res) => {
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

  for (let i = 0; i < tracks.length; i += 1) {
    const { id } = tracks[i];
    const result2 = await Party.removeTrack(id);
    if (result2.error) {
      res.status(403).send({
        error: result2.error,
      });
      return;
    }
    // const { track } = result2;
    // if (!track) {
    //   res.status(500).send({
    //     error: 'Database Query Error',
    //   });
    //   return;
    // }
  }

  const result3 = await Party.removeParty(partyId);
  if (result3.error) {
    res.status(403).send({
      error: result3.error,
    });
    return;
  }

  res.status(200).send({
    message: 'Remove party success!',
  });
};

const checkParty = async (req, res) => {
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

  let isReady = true;
  let numFinished = 0;
  for (let i = 0; i < tracks.length; i += 1) {
    // TODO:
    const response = await axios.post(`${SONG_PROCESSOR_URL}/api/v1/audio_status_new`, {
      track_id: tracks[i].id,
    });
    if (response.data.status === false) {
      isReady = false;
      break;
    }
    numFinished += 1;
  }

  res.status(200).send({
    isReady,
    numFinished,
    numTotal: tracks.length,
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
  getAudioUrls,
  createParty,
  removeParty,
  checkParty,
  getPartyByPartyId,
  getPartiesByHostId,
  getTracksByPartyId,
};
