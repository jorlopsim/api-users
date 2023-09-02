Instalación:
npm install
npm install express
npm install pg

Ejecución: 
node index.js

Base de datos: 
CREATE DATABASE bdcontrol;

datos para conexion a la base de datos:
user: "postgres",
database: "bdcontrol",
password: "postgres",
port: "5432",

En el archivo sqlbd.sql esta el script para poder crear la tabla y insertar algunos registros

Users CRUD:
GET /usuarios:
- Retorna todos los usuarios de la tabla usuarios
GET /usuarios/:id_usuario
- Retorna un usuario especifico de acuerdo a su id
GET /usuarios/promedio-edad
- Retorna el promedio de edades de la tabla de usarios
POST /usuarios
- Permite crear al usuarios
- Los campos requeridos son los siguientes: 
- ci, nombre,primer_apellido,segundo_apellido, fecha_nacimiento
- Retorna el usuario creado.
 PUT /usuarios/:id_usuario
- Edita la información del usuario, donde es importante que tenga el id
- Es requerido los siguientes campos: 
- ci, nombre,primer_apellido,segundo_apellido, fecha_nacimiento
- Retorna el usuario editado
DELETE /usuarios/:id_usuario
-borra el usuario de acuerdo a su id
GET /estado
Devuelve el estado del proyecto