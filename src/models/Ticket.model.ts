import { model, Schema } from "mongoose";
import { ITicket } from "../interfaces/ITicket";

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
