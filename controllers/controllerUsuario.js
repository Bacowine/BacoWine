
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
                response.render("error", {message:"Error interno de acceso a la base de datos"});
            } else{
                console.log(rows);
                response.render("gestionUsuarios", {res:null, usuario: rows});
            }
        }
    }
    insertarUsuario(request, response){
        let nombre = request.body.nombre; 
        let correo = request.body.correo; 
        let idIntroducido = request.body.idUser;
        console.log(idIntroducido);
        //console.log(id);
        //console.log(nombre);
        //console.log(correo);

        modelUsers.insertarUsuario(nombre, correo, cb_insertarUsuario); //Sacamos si ya le ha dado me gusta el usuario a esta pregunta
    
        function cb_insertarUsuario(err, result, info){
            if (err) {
                response.status(500); 
            } 
            else{
                console.log("ANYADIDO CORRECTAMENTE EL USUARIO");
                response.render("gestionUsuarios", {res: info,usuario:null});
            }
        }
    }
}

module.exports = controllerUsuario;