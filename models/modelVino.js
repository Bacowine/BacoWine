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
  const sql = pool.format('UPDATE vino SET activo = 0 WHERE id = ?', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelVino.comentarVino = async(rows) => {
  const sql = pool.format('INSERT INTO comentario(user, idVino, texto, fecha) VALUES(?, CONVERT_TZ(NOW(), @@session.time_zone, "+02:00"))', [rows]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result.insertId;
};

modelVino.buscarComentariosVino = async(id) => {
  const sql = pool.format('SELECT id, user, texto, fecha FROM comentario WHERE idVino = ? ORDER BY fecha desc', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(result);
  return result;
}

module.exports = modelVino;
