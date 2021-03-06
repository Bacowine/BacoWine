const pool = require('./db');

const modelVino = {};

modelVino.find = async (id) => {
  let conn;
  try {
    conn = await pool.promise().getConnection();
    await conn.beginTransaction();
    const sql = conn.format('SELECT * FROM vino v JOIN clase_vino cv ON v.clase = cv.clase where id = ? and activo = 1', [id]);
    console.log(sql);
    const [result] = await conn.query(sql);

    if (result.length === 0) {
      await conn.rollback();
      return [];
    }

    const sql2 = conn.format('SELECT nombre_variedad, porcentaje FROM variedad_vino where vino = ?', [id]);
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

modelVino.readClasesVino = async () => {
  const sql = pool.format('SELECT clase,tipo FROM clase_vino');
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

modelVino.insert = async (rows, variedad) => {
  let conn;
  try {
    conn = await pool.promise().getConnection();
    await conn.beginTransaction();
    const sql1 = pool.format('INSERT INTO vino(nombre, anyada, clase, maceracion, graduacion, bodega, localidades, foto) VALUES(?)', [rows]);
    console.log(sql1.substring(0, 500));
    const [result] = await conn.query(sql1);

    await Promise.all(Object.entries(variedad).map(async ([key, value]) => {
      const sql2 = conn.format('INSERT INTO variedad_vino(vino,nombre_variedad,porcentaje) VALUES(?,?,?)', [result.insertId, key, value]);
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

modelVino.update = async ({ id, ...fields }, variedad) => {
  let conn;
  try {
    conn = await pool.promise().getConnection();
    await conn.beginTransaction();
    const sql1 = pool.format('UPDATE vino SET ? WHERE id = ?', [fields, id]);
    console.log(sql1.substring(0, 500));
    const [result] = await conn.query(sql1);

    const sql3 = pool.format('DELETE FROM variedad_vino WHERE vino = ?', [id]);
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
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

modelVino.borrarComentario = async (id) => {
  const sql = pool.format('DELETE FROM comentario WHERE id = ?', [id]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

modelVino.valorarVino = async (idVino, idUsuario, valoracion) => {
  const sql = pool.format('INSERT INTO valoracion_vino(vino,usuario,valoracion) VALUES(?,?,?)', [idVino, idUsuario, valoracion]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);
  return result;
};

modelVino.modificarvalorarVino = async (idVino, idUsuario, valoracion) => {
  const sql = pool.format('UPDATE valoracion_vino SET valoracion = ? where vino = ? AND usuario =  ?', [valoracion, idVino, idUsuario]);
  const [result] = await pool.promise().query(sql);
  console.log(sql);
  return result;
};

modelVino.buscarValoracionesVino = async (idVino) => {
  const sql = pool.format('SELECT ROUND(AVG(valoracion),1) "media", count(*) "numVal" FROM valoracion_vino WHERE vino = ?', [idVino]);
  const [[result]] = await pool.promise().query(sql);
  console.log(result);
  return result;
};

modelVino.confirmarValoracionVino = async (idVino, idUsuario) => {
  const sql = pool.format('SELECT valoracion FROM valoracion_vino WHERE vino = ? AND usuario = ?', [idVino, idUsuario]);
  const [[result]] = await pool.promise().query(sql);
  console.log(result);
  return result ? result.valoracion : 0;
};

modelVino.readAll = async ({ search = '', limit = 100, offset = 0 }) => {
  const sql = pool.format(`
    SELECT id, nombre, anyada, clase, tipo, maceracion, graduacion, bodega, localidades,TO_BASE64(foto) foto, activo
    FROM vino
    where nombre LIKE ? AND activo = 1
    LIMIT ?,?`, [`%${search}%`, offset, limit]);
  console.log(sql);
  const [result] = await pool.promise().query(sql);

  const sql2 = pool.format(`
    SELECT COUNT(*) total
    FROM vino
    where nombre LIKE ? AND activo = 1`, [`%${search}%`]);
  console.log(sql2);
  const [[result2]] = await pool.promise().query(sql2);
  return { vinos: result, count: result2.total };
};

module.exports = modelVino;
