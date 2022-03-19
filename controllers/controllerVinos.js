
const pool = require("../models/db");
const Mvinos = require("../models/modelVinos");
const modelVinos = new Mvinos(pool);

class controllerVinos{


    verVinos(request, response){
        modelVinos.verVino(request.body.idVino, cb_verVino);
        function cb_verVino(err, result, rows){
            if (err) {
                response.status(500); 
                response.render("error", {message:"Error interno de acceso a la base de datos"});
            } else{
                console.log(rows);
                response.render("mostrarVino", {res:null, vino: rows});
            }
        }
    }

}

module.exports = controllerVinos;
