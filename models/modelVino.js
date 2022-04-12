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

modelVino.insert = async (rows, variedad) => {
  let conn;
  try {
    conn = await pool.promise().getConnection();
    await conn.beginTransaction();
    const sql1 = pool.format('INSERT INTO vino(nombre, clase, tipo, maceracion, graduacion, bodega, localidades, foto) VALUES(?)', [rows]);
    console.log(sql1.substring(0, 500));
    const [result] = await conn.query(sql1);

    await Promise.all(Object.entries(variedad).map(async ([key, value]) => {
      const sql2 = pool.format('INSERT INTO variedad_vino(vino,nombre_variedad,porcentaje) VALUES(?,?,?)', [result.insertId, key, value]);
      console.log(sql2);
      await conn.query(sql2);
    }));

    conn.commit();
    return result.insertId;
  } catch (error) {
    if (conn) {
      await conn.rollback();
      await conn.release();
    }
    throw error;
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

module.exports = modelVino;
