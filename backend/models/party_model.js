require('dotenv').config();
const { pool } = require('./mysqlcon');

const createParty = async (hostId, partyName, numQ1, numQ2, numQ3) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const party = {
      host_id: hostId,
      name: partyName,
      questions: `${numQ1}, ${numQ2}, ${numQ3}`,
    };

    const queryStr = 'INSERT INTO party SET ?';
    const [result] = await conn.query(queryStr, party);

    party.id = result.insertId;

    await conn.query('COMMIT');
    return { party };
  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    await conn.release();
  }
};

const createTrack = async (partyId, trackSent, qType) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const track = {
      party_id: partyId,
      artist: trackSent.artistName,
      name: trackSent.trackName,
      q_type: qType,
    };

    const queryStr = 'INSERT INTO track SET ?';
    const [result] = await conn.query(queryStr, track);

    track.id = result.insertId;
    // // FIXME:
    // track.qType = qType;

    await conn.query('COMMIT');
    return { track };
  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    await conn.release();
  }
};

const getPartiesByHostId = async (hostId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const [parties] = await conn.query('SELECT * FROM party WHERE host_id = ?', [hostId]);

    await conn.query('COMMIT');
    return { parties };
  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    await conn.release();
  }
};

const getPartyByPartyId = async (partyId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const [parties] = await conn.query('SELECT * FROM party WHERE id = ?', [partyId]);
    const party = parties[0];

    await conn.query('COMMIT');
    return { party };
  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    await conn.release();
  }
};

const getTracksByPartyId = async (partyId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const [tracks] = await conn.query('SELECT * FROM track WHERE party_id = ?', [partyId]);

    await conn.query('COMMIT');
    return { tracks };
  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    await conn.release();
  }
};

module.exports = {
  createParty,
  createTrack,
  getPartyByPartyId,
  getPartiesByHostId,
  getTracksByPartyId,
};
