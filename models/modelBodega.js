
"use strict";


class modelBodega {

    mostrarDetallesBodega(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                const sql = "SELECT * FROM bodega where id = ?";
                connection.query(sql, [id], function(err, rows) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        console.log(rows)
                        if (rows.length === 0) {
                            callback(null, false, -1); //no hay bodega con este id
                        }
                        else {
                            callback(null, true, rows[0]);
                        }
                    }
                });
            }
        });
    }

}

module.exports = modelBodega;