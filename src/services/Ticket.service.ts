import { toVehicleType, VehicleRates } from "../constants/VehicleTypes";
import { IparkingSpot } from "../models/ParkingSpot.model";
import { ITicket } from "../models/Ticket.model";
import { IVehicle } from "../models/Vehicle.model";
import TicketRepository from "../repository/Ticket.repository";
import VehicleRepository from "../repository/Vehicle.repository";

export class TicketService {
  async openTicket(vehicle: IVehicle["_id"], spot: IparkingSpot["_id"]) {
    await TicketRepository.createTicket({ vehicle, spot });
  }

  async getVehicleByPlate(vehiclePlate: string): Promise<IVehicle | null> {
    return await VehicleRepository.getVehicleByPlate(vehiclePlate);
  }

  async getActiveTicketByVehicle(
    vehicleId: IVehicle["_id"]
  ): Promise<ITicket | null> {
    return await TicketRepository.findByVehicle(vehicleId);
  }

  hoursBetween(start: Date, end: Date) {
    const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());
    const diffInHours = Math.ceil(diffInMilliseconds / (1000 * 60 * 60));
    return diffInHours;
  }

  async closeTicket(vehiclePlate: string) {
    const vehicle = await this.getVehicleByPlate(vehiclePlate);
    const vehicleId = vehicle?.["_id"];
    const vehicleType = toVehicleType(vehicle!.type);
    const ticket = await this.getActiveTicketByVehicle(vehicleId);
    const endTime = new Date();
    const totalHours = this.hoursBetween(endTime, ticket!.startTime!);
    const totalCost = totalHours * VehicleRates[vehicleType];
    await TicketRepository.closeTicket(ticket?.["_id"], totalCost);
  }
}
