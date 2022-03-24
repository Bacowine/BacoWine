const pool = require('./db');

const modelBodega = {};

modelBodega.find = async (id) => {
  const sql = pool.format('SELECT * FROM bodegas where id = ? and activo = 1', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelBodega.add = async (rows) => {
  const sql = pool.format('INSERT INTO bodegas (nombre,anyoCreacion,localizGeo,descripcion,denominOrigen,foto) VALUES (?)', [rows]);
  const [result] = await pool.promise().query(sql);
  console.log(sql.substring(0, 500));
  return result.insertId;
};

module.exports = modelBodega;