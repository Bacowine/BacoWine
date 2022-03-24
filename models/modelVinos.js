const pool = require('./db');

const modelVinos = {};

modelVinos.find = async (id) => {
  const sql = pool.format('SELECT * FROM vino where id = ?', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelVinos.insert = async (nombre, clase, tipo, graduacion, bodega, localidades, foto) => {
  const sql = pool.format(
      'INSERT INTO usuarios(nombre, clase, tipo, graduacion, bodega, localidades, foto, activo) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, clase, tipo, graduacion, bodega, localidades, foto, 1]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};


module.exports = modelVinos;
