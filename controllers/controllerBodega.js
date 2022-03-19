
const config = require("../config");
const mysql = require("mysql");
var pool = mysql.createPool(config.BDconfig);
const MBodega = require("../models/modelBodega");
const modelBodega = new MBodega(pool);

class controllerBodega{

    mostrarDetallesBodega(request, response){
        //console.log("Bodega1: " + request.query.id);
        let id = request.query.id;

        if(id === undefined || id == null){
            response.status(500);
            response.render("error", {message:"El id no puede estar vacío"});
        }else if(isNaN(id)){
            response.status(500);
            response.render("error", {message:"El id tiene que ser un número"});
        }else{
            modelBodega.mostrarDetBodega(id, cb_mostrarBodega);

            function cb_mostrarBodega(err, result, row){
                //console.log("Bodega2: ");
                if (err) {
                    response.status(500);
                    response.render("error", {message:"Error interno de acceso a la base de datos" + err});
                } else{
                    if(result == true){
                        //console.log(row);
                        
                        row.foto = row.foto.toString('base64');
                        
                        const bodega = {
                            foto:row.foto,
                            nombre:row.nombre,
                            anyo:row.anyoCreacion,
                            localizacion:row.localizGeo,
                            descripcion:row.descripcion,
                            origen:row.denominOrigen
                          };
                        response.bodega = bodega;
                        //console.log(response.bodega);
                        response.render('bodega_detalles', { title: 'BacoWine DEV', id, bodega });
                    }
                    else{
                        //no content - ERROR 204
                        response.status(204);
                        response.render("mostrarDetallesBodega", {res:null, bodega: {}});
                        //response.render("error", {message:"Error interno de acceso a la base de datos"});
                    }
                }
            }
        }
    }

}

module.exports = controllerBodega;
