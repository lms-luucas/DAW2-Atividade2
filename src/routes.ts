import { Router, Request, Response } from "express";

import { ClientController } from "./controllers/ClientController";
import {PhoneNumberController} from "./controllers/PhoneNumberController"

const clientController = new ClientController();
const phoneNumberController = new PhoneNumberController()

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  response.render("index.html");
});

routes.get("/clients", clientController.index);
routes.get("/clients/:id", clientController.show);
routes.post("/clients", clientController.store);
routes.put("/clients/:id", clientController.update)
routes.delete("/clients/:id", clientController.delete)

routes.get("/phonenumbers", phoneNumberController.index);
routes.get("/phonenumbers/:id", phoneNumberController.show);
routes.post("/phonenumbers", phoneNumberController.store);
routes.delete("/phonenumbers/:id", phoneNumberController.delete);


export default routes;
