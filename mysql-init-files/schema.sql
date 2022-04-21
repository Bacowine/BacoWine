use bacowine;

DROP TABLE vino;
DROP TABLE variedad_vino;
DROP TABLE clase_vino;
DROP TABLE bodegas;
DROP TABLE usuario;
DROP TABLE comentario;

--APLICACION
CREATE TABLE vino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    anyada YEAR NOT NULL,
    clase VARCHAR(45) NOT NULL,
    maceracion VARCHAR(45) NOT NULL, 
    graduacion DECIMAL(4,2) UNSIGNED NOT NULL CHECK (graduacion <= 100), 
    bodega VARCHAR(100) NOT NULL, 
    localidades VARCHAR(500) NOT NULL,
    foto LONGBLOB,
    FOREIGN KEY (clase) REFERENCES bacowine.clase(clase_vino) ON UPDATE CASCADE
);

CREATE TABLE variedad_vino (
  vino INT,
  nombre_variedad VARCHAR(45),
  porcentaje INT NULL CHECK (porcentaje < 100),
  PRIMARY KEY (vino, nombre_variedad),
  FOREIGN KEY (vino) REFERENCES bacowine.vino(id) ON DELETE CASCADE
);

CREATE TABLE clase_vino (
  clase VARCHAR(45) NOT NULL,
  tipo VARCHAR(45) NOT NULL,
  PRIMARY KEY(clase)
);

CREATE TABLE bodegas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL,
  anyoCreacion YEAR NOT NULL,
  localizGeo VARCHAR(40) NOT NULL,
  descripcion VARCHAR(700) NOT NULL,
  denominOrigen VARCHAR(40) NOT NULL,
  foto LONGBLOB,
  activo BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE usuario (
  user VARCHAR(40) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL
);

CREATE TABLE comentario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(40) NOT NULL,
  idVino INT NOT NULL,
  texto VARCHAR(1000) NOT NULL,
  fecha TIMESTAMP NOT NULL,
  FOREIGN KEY (user) REFERENCES bacowine.usuario(user) ON DELETE CASCADE,
  FOREIGN KEY (idVino) REFERENCES bacowine.vino(id) ON DELETE CASCADE
);

CREATE TABLE valoracion_vino (
  vino INT NOT NULL,
  valoracion DECIMAL(3,1) NOT NULL,
  usuario VARCHAR(40) NOT NULL,
  PRIMARY KEY (vino, usuario)
  FOREIGN KEY (usuario) REFERENCES bacowine.usuario(user) ON DELETE CASCADE,
  FOREIGN KEY (vino) REFERENCES bacowine.vino(id) ON DELETE CASCADE
);

INSERT INTO clase_vino(clase, tipo) VALUES
("Blanco","Tranquilo"),
("Rosado","Tranquilo"),
("Tinto","Tranquilo"),
("Clarete","Tranquilo"),
("Blanc de blanc","Espumoso"),
("Blanc de noirs","Espumoso"),
("Vino de nueces","Espirituoso"),
("Vino especiado","Espirituoso"),
("Vino oloroso","Vino oloroso");
