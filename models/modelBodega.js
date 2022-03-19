"use strict";

class modelBodega {

    constructor(pool){
        this.pool = pool;
    }

    mostrarDetBodega(id, callback) {
        
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos") + err);
            }
            else {
                const sql = "SELECT * FROM bodegas where id = ? and activo = 1";
                connection.query(sql, [id], function(err, rows) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos") + err);
                    }
                    else {
                        
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