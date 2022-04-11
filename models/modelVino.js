const pool = require('./db');

const modelVino = {};

modelVino.find = async (id) => {
  const sql = pool.format(`SELECT * 
                          FROM vino JOIN variedad_vino ON vino.id = variedad_vino.vino
                          where id = ? and activo = 1`, [id]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

modelVino.insert = async (rows) => {
  const sql = pool.format('INSERT INTO vino(nombre, clase, tipo, graduacion, bodega, localidades, foto) VALUES(?)', [rows]);
  //Hacer controller antes
  console.log(sql.substring(0, 500));
  const [result] = await pool.promise().query(sql);
  return result.insertId;
};

modelVino.findID = async (id) => {
  const sql = pool.format('SELECT id FROM vino where id = ?', [id]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

modelVino.borrarVino = async (id) => {
  const sql = pool.format('DELETE FROM vino WHERE id = ?', [id]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

module.exports = modelVino;
