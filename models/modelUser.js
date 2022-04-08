const pool = require('./db');

const modelUser = {};

modelUser.find = async (user) => {
  const sql = pool.format('SELECT * FROM usuario where user = ?', [user]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

module.exports = modelUser;
