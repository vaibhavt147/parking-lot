import { Document, model, Schema } from "mongoose";
import { IVehicle } from "./Vehicle.model";
import { IparkingSpot } from "./ParkingSpot.model";

export interface ITicket extends Document {
  vehicle: IVehicle["_id"];
  spot: IparkingSpot["_id"];
  startTime: Date;
  endTime?: Date;
  cost?: number;
}

const TicketSchema = new Schema<ITicket>({
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  spot: {
    type: Schema.Types.ObjectId,
    ref: "ParkingSpot",
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  cost: {
    type: Number,
  },
});

export const Ticket = model<ITicket>("Ticket", TicketSchema);
