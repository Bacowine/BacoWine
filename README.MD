# Bacowine

Proyecto GPS 2021-2022

# Instalación
Pasos para la instalación en una maquina Linux, en este caso Ubuntu.
### Requisitos
Antes de empezar se necesita tener instalado lo siguiente:
- nodejs
	> $ sudo apt install nodejs
	
	También se necesita $npm$ para instalar las dependencias necesarias

	> $ sudo apt install npm
- mysql
	> $ sudo apt install mysql
	
	Luego se necesita crear el $schema$ y añadir un usuario
	> $ sudo mysql < ./mysql-init-files/init.sql

A continuacion se clona el proyecto y se instalan los paquetes necesarios.
> $ git clone https://github.com/Plopezq/BacoWine
> $ cd Bacowine
> $ npm install

*npm install instala las dependencias indicadas en el fichero $package.json$*


### Ejecución
Con todos los requisitos cumplidos ya se puede arrancar la aplicación con el siguiente comando.
> $ node app.js

# Docker (Opción alternativa)
### Requisitos
Es necesario tener instalado docker y docker-compose.

> $ sudo apt install docker

El repositorio de Ubuntu tiene una versión antigua de docker-compose y hay que instalarlo desde github.

- Se descarga desde github.
	```
	$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	```
- Y se le otorga permisos de ejecución.
	```
	sudo chmod +x /usr/local/bin/docker-compose
	```
### Ejecución
Para arrancar el contenedor
> $ sudo docker-compose -f .docker/docker-compose.yml up --build

Cuando se quieran realizar cambios en el codigo se paran los contenedores (Ctrl + C) y se vuelve a ejecutar el mismo comando para que detecte los cambios.

