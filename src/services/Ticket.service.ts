import { toVehicleType, VehicleRates } from "../constants/VehicleTypes";
import { IparkingSpot } from "../models/ParkingSpot.model";
import { ITicket } from "../models/Ticket.model";
import { IVehicle } from "../models/Vehicle.model";
import TicketRepository from "../repository/Ticket.repository";
import VehicleRepository from "../repository/Vehicle.repository";

export class TicketService {
  async openTicket(vehicle: IVehicle["_id"], spot: IparkingSpot["_id"]) {
    return await TicketRepository.createTicket({ vehicle, spot });
  }

  async getTicketById(ticketId: ITicket["_id"]) {
    return await TicketRepository.findById(ticketId);
  }

  async getVehicleById(vehicle: IVehicle["_id"]): Promise<IVehicle | null> {
    return await VehicleRepository.getVehicleById(vehicle);
  }

  async getActiveTicketById(ticketId: ITicket["_id"]): Promise<ITicket | null> {
    return await TicketRepository.findById(ticketId);
  }

  hoursBetween(start: Date, end: Date) {
    const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());
    const diffInHours = Math.ceil(diffInMilliseconds / (1000 * 60 * 60));
    return diffInHours;
  }

  async closeTicket(ticket: ITicket): Promise<ITicket | null> {
    const vehicle = await this.getVehicleById(ticket.vehicle);
    const vehicleType = toVehicleType(vehicle!.type);
    const endTime = new Date();
    const totalHours = this.hoursBetween(endTime, ticket!.startTime!);
    const totalCost = totalHours * VehicleRates[vehicleType];
    return await TicketRepository.closeTicket(ticket?.["_id"], totalCost);
  }
}
