"use strict";


const { request } = require("https");
const config = require("../config");
const CBodega = require("../controllers/controllerBodega");
const controllerBodega = new CBodega();
const modelBodega = require("../models/modelBodega");

test('mostrar bodega con ID = 1', () =>  {
    //jest.spyOn(modelBodega.prototype, 'mostrarDetBodega').mockImplementation(function() { console.log("Todo bien"); });
    let request = {query:{id:1}};
    let response = {};
    //let response = {status: jest.fn().mockReturnThis() ,render: jest.fn()};
    controllerBodega.mostrarDetallesBodega(request, response);
    
});
