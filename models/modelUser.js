const pool = require('./db');

const modelUser = {};

modelUser.read = async (user) => {
  const sql = pool.format('SELECT * FROM usuario where user = ?', [user]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

modelUser.create = async (user) => {
  const sql = pool.format('INSERT INTO usuario(user,password,role) VALUES(?)', [user]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result.affectedRows;
};

modelUser.delete = async (user) => {
  const sql = pool.format('DELETE FROM usuario WHERE user = ?', [user]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result.affectedRows;
};

module.exports = modelUser;
