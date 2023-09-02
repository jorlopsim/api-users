CREATE DATABASE bdcontrol;
create table if not exists usuario (
    id_usuario serial PRIMARY KEY,
    ci VARCHAR(15) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

-- para insertar datos
INSERT INTO usuario (ci, nombre , primer_apellido ,segundo_apellido,fecha_nacimiento)
VALUES 
  ('5227909', 'Juan','López','Vargas','1980/06/30'),
  ('3444525', 'Alex','Gonzales','Jose','1999/07/31'),  
  ('3555896', 'Mariana','Alvarez','Beltran','2000/01/25'); 