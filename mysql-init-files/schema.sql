use bacowine;

--PROTOTIPO
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    correos VARCHAR(45) NOT NULL
);

--APLICACION
CREATE TABLE vino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    clase VARCHAR(45) NOT NULL,
    tipo VARCHAR(45) NOT NULL, 
    graduacion DECIMAL(4,2) UNSIGNED NOT NULL CHECK (graduacion <= 100), 
    bodega VARCHAR(100) NOT NULL, 
    localidades VARCHAR(500) NOT NULL,
    foto BLOB,
    activo BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE bodegas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL,
  anyoCreacion INT NOT NULL,
  localizGeo VARCHAR(40) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  denominOrigen VARCHAR(40) NOT NULL,
  foto BLOB,
  activo BOOLEAN DEFAULT true NOT NULL
);