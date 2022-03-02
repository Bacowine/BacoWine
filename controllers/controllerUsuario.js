
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool(config.BDconfig);
const Musers = require("../models/modelUsers");
const modelUsers = new Musers(pool);

class controllerUsuario{
    
    verUsuario(request, response){
        modelUsers.verUsuario(request.body.idUser, cb_verUsuario);
        function cb_verUsuario(err, result, rows){
            if (err) {
                response.status(500); 
                next(err);
                response.render("error", {message:"Error interno de acceso a la base de datos"});
            } else{
                console.log(rows);
                response.render("gestionUsuarios", {usuario: rows});
            }
        }
    }

}
module.exports = controllerUsuario;
