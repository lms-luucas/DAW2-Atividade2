import { Request, Response } from "express";
import { ClientModel } from "../models/ClientModel";

import { Connection } from "../database/Connection";

const clientConnection = () => Connection<ClientModel>("clients");

class ClientController {
  index = async (request: Request, response: Response) => {
    const clients = await clientConnection();

    return response.json(clients);
  };

  show = async (request: Request, response: Response) => {
    const { id } = request.params;

    const client = await clientConnection()
      .where({ id: Number(id) })
      .first();

    if (!client)
      return response.status(404).json({
        errorMessage: "Not Found",
      });

    return response.json(client);
  };

  store = async (request: Request, response: Response) => {
    const data = request.body;

    const [id] = await clientConnection().insert(data);

    return response.status(201).json({ id, ...data });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const data = request.body;

    const client = await clientConnection()
      .where({
        id: Number(id),
      })
      .first();

    if (!client) {
      return response.status(404).json({
        errorMessage: "Not Found",
      });
    }
    await clientConnection()
      .where({
        id: Number(id),
      })
      .update(data);
    return response.status(200).json({ id, ...data });
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const client = await clientConnection()
      .where({ id: Number(id) })
      .first();

    if (!client)
      return response.status(404).json({
        errorMessage: "Not Found",
      });
    await clientConnection()
      .where({ id: Number(id) })
      .first()
      .delete();

    return response.send();
  };
}

export { ClientController };
