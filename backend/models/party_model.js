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

const createTrack = async (partyId, trackSent) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const track = {
      party_id: partyId,
      artist: trackSent.artistName,
      name: trackSent.trackName,
    };

    const queryStr = 'INSERT INTO track SET ?';
    const [result] = await conn.query(queryStr, track);

    track.id = result.insertId;

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

// const signIn = async (email, password) => {
//   const conn = await pool.getConnection();
//   try {
//     await conn.query('START TRANSACTION');

//     const [hosts] = await conn.query('SELECT * FROM host WHERE email = ?', [email]);
//     const host = hosts[0];
//     if (!bcrypt.compareSync(password, host.password)) {
//       await conn.query('COMMIT');
//       return {
//         error: 'Password is wrong',
//       };
//     }

//     const accessToken = jwt.sign({
//       id: host.id,
//       nickname: host.nickname,
//       email: host.email,
//     }, TOKEN_SECRET);
//     // TODO:
//     // }, TOKEN_SECRET, { expiresIn: '1800s' });
//     host.accessToken = accessToken;

//     await conn.query('COMMIT');
//     return { host };
//   } catch (error) {
//     console.log(error);
//     await conn.query('ROLLBACK');
//     return { error };
//   } finally {
//     await conn.release();
//   }
// };

module.exports = {
  createParty,
  createTrack,
  // signIn,
};
