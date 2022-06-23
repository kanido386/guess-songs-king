require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./mysqlcon');

const { TOKEN_SECRET } = process.env;

const signUp = async (nickname, email, password) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const emails = await conn.query('SELECT email FROM host WHERE email = ? FOR UPDATE', [email]);
    if (emails[0].length > 0) {
      await conn.query('COMMIT');
      return {
        error: 'Email Already Exists',
      };
    }

    const saltRounds = 10;
    const host = {
      nickname,
      email,
      password: bcrypt.hashSync(password, saltRounds),
    };

    const queryStr = 'INSERT INTO host SET ?';
    const [result] = await conn.query(queryStr, host);

    host.id = result.insertId;
    const accessToken = jwt.sign({
      id: host.id,
      nickname: host.nickname,
      email: host.email,
    }, TOKEN_SECRET);
    // TODO:
    // }, TOKEN_SECRET, { expiresIn: '1800s' });
    host.accessToken = accessToken;

    await conn.query('COMMIT');
    return { host };
  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    await conn.release();
  }
};

const signIn = async (email, password) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');

    const [hosts] = await conn.query('SELECT * FROM host WHERE email = ?', [email]);
    const host = hosts[0];
    if (!bcrypt.compareSync(password, host.password)) {
      await conn.query('COMMIT');
      return {
        error: 'Password is wrong',
      };
    }

    const accessToken = jwt.sign({
      id: host.id,
      nickname: host.nickname,
      email: host.email,
    }, TOKEN_SECRET);
    // TODO:
    // }, TOKEN_SECRET, { expiresIn: '1800s' });
    host.accessToken = accessToken;

    await conn.query('COMMIT');
    return { host };
  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    await conn.release();
  }
};

module.exports = {
  signUp,
  signIn,
};
