const pool = require('./db');

const modelBodega = {};

modelBodega.find = async (id) => {
  const sql = pool.format('SELECT * FROM bodegas where id = ? and activo = 1', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelBodega.readAll = async ({ search = '', limit = 100, offset = 0 }) => {
  const sql = pool.format(`
    SELECT id,nombre,anyoCreacion,localizGeo,descripcion,denominOrigen,TO_BASE64(foto) foto,activo
    FROM bodegas
    where nombre LIKE ? AND activo = 1
    LIMIT ?,?`, [`%${search}%`, offset, limit]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);

  const sql2 = pool.format(`
    SELECT COUNT(*) total
    FROM bodegas
    where nombre LIKE ? AND activo = 1`, [`%${search}%`]);
  console.log(sql2);
  const [[result2]] = await pool.promise().query(sql2);
  return { bodegas: result, count: result2.total };
};

modelBodega.add = async (rows) => {
  const sql = pool.format('INSERT INTO bodegas (nombre,anyoCreacion,localizGeo,descripcion,denominOrigen,foto) VALUES (?)', [rows]);
  const [result] = await pool.promise().query(sql);
  console.log(sql.substring(0, 500));
  return result.insertId;
};

modelBodega.findID = async (id) => {
  const sql = pool.format('SELECT id FROM bodegas where id = ? and activo = 1', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelBodega.borrarBodega = async (id) => {
  const sql = pool.format('UPDATE bodegas SET activo = 0 WHERE id = ?', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

module.exports = modelBodega;
