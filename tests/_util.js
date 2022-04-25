const Util = {};

Util.emptyTables = async (pool) => {
  const tables = ['bodegas', 'comentario', 'sessions', 'usuario', 'valoracion_vino', 'variedad_vino', 'vino'];
  await Promise.all(tables.map(async (table) => {
    await pool.promise().execute(`DELETE FROM ${table}`);
  }));
};

module.exports = Util;
