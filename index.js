const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bdcontrol",
    password: "ela2006",
    port: "5432",
  });

  // Modelo
  class Model {
    async getTodosUsr() {
        const { rows } = await pool.query("select * from usuario;");
        return rows;
      }

      async getBuscaUsr(id) {
        const { rows } = await pool.query("select * from usuario where id_usuario = $1;", [id]);
        return rows[0];
      }

      async getPromUsr() {
        const { rows } = await pool.query("select round(avg(extract(year from age(now(),fecha_nacimiento))),2) as promedio_edades from usuario;");
        return rows;
      }

      async getVersion() {
        const nameSystem="api-users";
        const version="1.0.0";
        const developer="Jorge Eduardo López Vargas";
        const email="jorgesim@gmail.com"
        return {nameSystem,version,developer,email};
      }

      async addUsr(ci,nombre,apellido1,apellido2,fechanac) {
        await pool.query("insert into usuario (ci,nombre,primer_apellido,segundo_apellido,fecha_nacimiento) values ($1,$2,$3,$4,$5)", [ci,nombre,apellido1,apellido2,fechanac]);
      }

      async updateUsr(id_usuario,ci,nombre,apellido1,apellido2,fechanac) {
        await pool.query("update usuario SET ci = $1,nombre=$2,primer_apellido=$3,segundo_apellido=$4,fecha_nacimiento=$5 WHERE id_usuario = $6", [ci,nombre,apellido1,apellido2,fechanac, id_usuario]);
      }

      async deleteUsr(id_usuario) {
        await pool.query("delete FROM usuario WHERE id_usuario = $1", [id_usuario]);
      }
    
    }
    
    // Controlador
    class Controller {
        constructor(model) {
            this.model = model;
          }
          
          async getTodosUsr(req, res) {
            const data = await this.model.getTodosUsr();
            res.send(data);
          }

          async getBuscaUsr(req, res) {
            const id_usuario=req.params.id_usuario;
            const data = await this.model.getBuscaUsr(id_usuario);
            res.send(data);
          }

          async getPromUsr(req, res) {
            const data = await this.model.getPromUsr();
            res.send(data);
          }

          async getVersion(req, res) {
            const data = await this.model.getVersion();
            res.send(data);
          }

          async addUsr(req, res) {
            const ci = req.body.ci;
            const nombre=req.body.nombre;
            const primer_apellido=req.body.primer_apellido;
            const segundo_apellido=req.body.segundo_apellido;
            const fecha_nacimiento=req.body.fecha_nacimiento;
            await this.model.addUsr(ci,nombre,primer_apellido,segundo_apellido,fecha_nacimiento);
            res.sendStatus(201);
          }

          async updateUsr(req, res) {
            const id_usuario = req.params.id_usuario;
            const ci = req.body.ci;
            const nombre=req.body.nombre;
            const primer_apellido=req.body.primer_apellido;
            const segundo_apellido=req.body.segundo_apellido;
            const fecha_nacimiento=req.body.fecha_nacimiento;
            await this.model.updateUsr(id_usuario,ci,nombre,primer_apellido,segundo_apellido,fecha_nacimiento);
            res.sendStatus(200);
          }

          async deleteUsr(req, res) {
            const id_usuario = req.params.id_usuario;
            await this.model.deleteUsr(id_usuario);
            res.sendStatus(204);
          }
    }
     
//Instanciación
const model = new Model();
const controller = new Controller(model);

app.use(express.json());
app.get("/usuarios", controller.getTodosUsr.bind(controller));
app.get("/usuarios/:id_usuario", controller.getBuscaUsr.bind(controller));
app.get("/usuarios/consulta/promedio-edad", controller.getPromUsr.bind(controller));
app.get("/estado", controller.getVersion.bind(controller));
app.post("/usuarios", controller.addUsr.bind(controller)); 
app.put("/usuarios/:id_usuario", controller.updateUsr.bind(controller));
app.delete("/usuarios/:id_usuario", controller.deleteUsr.bind(controller));

app.listen(port, () => {
    console.log(`Este servidor se ejecuta en http://localhost:${port}`);
  });