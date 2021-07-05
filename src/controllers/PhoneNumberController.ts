import { Request, Response } from "express";
import { PhoneNumberModel } from "../models/PhoneNumberModel";
import { Connection } from "../database/Connection";
import { ClientModel } from "../models/ClientModel";

const phoneNumberConnection = () =>
  Connection<PhoneNumberModel>("phone_numbers");

const clientConnection = () => Connection<ClientModel>("clients");

class PhoneNumberController {
  index = async (request: Request, response: Response) => {
    const { client_id } = request.query;

    const query = phoneNumberConnection();

    if (client_id) {
      await query
        .where({ client_id: Number(client_id) })
        .join("clients", "clients.id", "=", "phone_numbers.client_id").select('phone_numbers.*', 'clients.name' );
    }

    const res = await query;

    return response.json(res);
  };

  show = async (request: Request, response: Response) => {
    const { id } = request.params;
    const phoneNumber = await phoneNumberConnection()
      .where({
        id: Number(id),
      })
      .first();

    if (!phoneNumber) {
      return response.status(404).json({ errorMessage: "Not Found" });
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const phone = await phoneNumberConnection()
      .where({ id: Number(id) })
      .first();

    if (!phone)
      return response.status(404).json({
        errorMessage: "Not Found",
      });
    await phoneNumberConnection()
      .where({ id: Number(id) })
      .first()
      .delete();

    return response.send();
  }

  store = async (request: Request, response: Response) => {
    const data = request.body;
    const [id] = await phoneNumberConnection().insert(data);

    return response.status(201).json({
      id,
      ...data,
    });
  };
}

export { PhoneNumberController };
