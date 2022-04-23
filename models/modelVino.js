const pool = require('./db');

const modelVino = {};

modelVino.find = async (id) => {
  let conn;
  try {
    conn = await pool.promise().getConnection();
    await conn.beginTransaction();
    const sql = pool.format('SELECT * FROM vino where id = ? and activo = 1', [id]);
    console.log(sql);
    const [result] = await conn.query(sql);

    if (result.length === 0) {
      await conn.rollback();
      return [];
    }

    const sql2 = pool.format('SELECT nombre_variedad, porcentaje FROM variedad_vino where vino = ?', [id]);
    console.log(sql2);
    const [result2] = await conn.query(sql2);

    await conn.commit();
    return result.concat([result2]);
  } catch (err) {
    if (conn) await conn.rollback();
    throw err;
  } finally {
    if (conn) await conn.release();
  }
};

modelVino.insert = async (rows, variedad) => {
  let conn;
  try {
    conn = await pool.promise().getConnection();
    await conn.beginTransaction();
    const sql1 = pool.format('INSERT INTO vino(nombre, añada, clase, tipo, maceracion, graduacion, bodega, localidades, foto) VALUES(?)', [rows]);
    console.log(sql1.substring(0, 500));
    const [result] = await conn.query(sql1);

    await Promise.all(Object.entries(variedad).map(async ([key, value]) => {
      const sql2 = pool.format('INSERT INTO variedad_vino(vino,nombre_variedad,porcentaje) VALUES(?,?,?)', [result.insertId, key, value]);
      console.log(sql2);
      await conn.query(sql2);
    }));

    await conn.commit();
    return result.insertId;
  } catch (error) {
    if (conn) await conn.rollback();
    throw error;
  } finally {
    if (conn) await conn.release();
  }
};

modelVino.update = async (rows, variedad) => {
  let conn;
  try {
    conn = await pool.promise().getConnection();
    await conn.beginTransaction();
    //console.log(variedad);
    const sql1 = pool.format(`UPDATE vino SET nombre = ?, añada = ?, clase = ?, tipo = ?, 
    maceracion = ?, graduacion = ?, bodega = ?, localidades =?, foto =? WHERE id = ?`, 
    [...rows]);
    console.log(sql1.substring(0, 500));
    const [result] = await conn.query(sql1);
    const id = rows[9];

    const sql3 = pool.format(`DELETE FROM variedad_vino WHERE vino = ?`, [id]);
    console.log(sql3);
    await conn.query(sql3);


    await Promise.all(Object.entries(variedad).map(async ([key, value]) => {
      const sql2 = pool.format('INSERT INTO variedad_vino(vino,nombre_variedad,porcentaje) VALUES(?,?,?)', [id, key, value]);
      console.log(sql2);
      await conn.query(sql2);
    }));


    await conn.commit();
    return result.insertId;
  } catch (error) {
    if (conn) await conn.rollback();
    throw error;
  } finally {
    if (conn) await conn.release();
  }
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

modelVino.comentarVino = async (rows) => {
  const sql = pool.format('INSERT INTO comentario(user, idVino, texto, fecha) VALUES(?, CONVERT_TZ(NOW(), @@session.time_zone, "+02:00"))', [rows]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result.insertId;
};

modelVino.buscarComentariosVino = async (id) => {
  const sql = pool.format('SELECT id, user, texto, fecha FROM comentario WHERE idVino = ? ORDER BY fecha desc', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(result);
  return result;
};

modelVino.buscarComentario = async (id) => {
  const sql = pool.format('SELECT * FROM comentario WHERE id = ?', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(result);
  return result;
};

modelVino.borrarComentario = async (id) => {
  const sql = pool.format('DELETE FROM comentario WHERE id = ?', [id]);
  const [result] = await pool.promise().query(sql);
  console.log(result);
  return result;
};

module.exports = modelVino;
