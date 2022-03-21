const modelVinos = require('../models/modelVinos');

const controllerVinos = {};

controllerVinos.verVino = async (request, response) => {
  try {
    //console.log(isNaN(request.query.id));
    if(isNaN(request.query.id) || request.query.id === undefined || request.query.id === null){
      response.status(500);
      response.render('error', { message: 'El id introducido no es correcto', error : { status:'', stack:'' } });
    }else{
      const [rows] = await modelVinos.find(request.query.id);
      console.log(rows);
      if (rows === undefined){
        response.status(500);
        response.render('error', { message: 'No existe el vino con ese ID', error : { status:'', stack:'' } });  
      }else{
        rows.foto = rows.foto.toString('base64');
        response.render('vino_detalles', { res: null, vino: rows, title:"Detalles del vino" });
      }
    }
  } catch (e) {
    response.status(500);

    response.render('error', { message: 'Error con la base de datos', error : { status:'', stack:'' } });  
  }
};

module.exports = controllerVinos;
