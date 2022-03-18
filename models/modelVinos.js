"use strict";

class modelVinos {

    constructor(pool) {  
        this.pool=pool;
    }

    verVino(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexion a la base de datos:" + err));
            }
            else {
                const sql = "SELECT * FROM vino where id = ?";
                connection.query(sql, [id], function(err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos:" + err));
                    }
                    else {
                        console.log(rows);
                        if (rows.length === 0) {
                            callback(null, false, -1); //no existe el vino con ese id
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


module.exports = modelVinos;