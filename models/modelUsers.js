"use strict";


class modelUsers {

    constructor(pool) {  
        this.pool=pool;
    }

    verUsuario(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                const sql = "SELECT * FROM usuarios where id = ?";
                connection.query(sql, [id], function(err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (rows.length === 0) {
                            callback(null, false, null); //no está el usuario con el password proporcionado
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


module.exports = modelUsers;

