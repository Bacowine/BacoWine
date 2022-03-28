const pool = require('./db');

const modelVino = {};

modelVino.find = async (id) => {
  const sql = pool.format('SELECT * FROM vino where id = ? and activo = 1', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelVino.insert = async (rows) => {
  const sql = pool.format('INSERT INTO vino(nombre, clase, tipo, graduacion, bodega, localidades, foto, activo) VALUES(?, 1)', [rows]);
  const [result] = await pool.promise().query(sql);
  console.log(sql.substring(0, 500));
  return result.insertId;
};

modelVino.findID = async (id) => {
  const sql = pool.format('SELECT id FROM vino where id = ? and activo = 1', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelVino.borrarVino = async (id) => {
  const sql = pool.format('UPDATE vino SET activo = 0 WHERE id = ?',[id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};



module.exports = modelVino;
