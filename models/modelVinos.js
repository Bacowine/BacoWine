const pool = require('./db');

const modelVinos = {};
modelVinos.find = async (id) => {
  const sql = pool.format('SELECT * FROM vino where id = ?', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

module.exports = modelVinos;
