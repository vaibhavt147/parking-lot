import { IparkingSpot } from "../models/ParkingSpot.model";
import { ITicket, Ticket } from "../models/Ticket.model";
import { IVehicle } from "../models/Vehicle.model";

class TicketRepository {
  private static instance: TicketRepository;
  private constructor() {}

  static getInstance(): TicketRepository {
    if (!this.instance) {
      this.instance = new TicketRepository();
    }
    return this.instance;
  }

  async createTicket(data: {
    vehicle: IVehicle["_id"];
    spot: IparkingSpot["_id"];
  }): Promise<ITicket> {
    return await Ticket.create(data);
  }

  async findById(ticketId: ITicket["_id"]) {
    return await Ticket.findById(ticketId);
  }

  async closeTicket(ticketId: ITicket["_id"], cost: number) {
    return await Ticket.findByIdAndUpdate(
      ticketId,
      {
        $set: { endTime: new Date(), cost },
      },
      { new: true }
    );
  }
}

export default TicketRepository.getInstance();
