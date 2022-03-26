const pool = require('./db');

const modelBodega = {};

modelBodega.find = async (id) => {
  const sql = pool.format('SELECT * FROM bodegas where id = ? and activo = 1', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

module.exports = modelBodega;
