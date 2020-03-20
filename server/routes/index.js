const routes = require("express").Router();
const Controller = require("../controller");

routes.post("/user", Controller.user);
routes.get("/user/:id", Controller.showUser);
routes.get("/room", Controller.showRoom);
routes.post("/room", Controller.room);
routes.put("/user/:id", Controller.score);
routes.put("/room/:id", Controller.join);
routes.put("/start/:id", Controller.status);
routes.delete("/room/:id", Controller.remove);

module.exports = routes;
