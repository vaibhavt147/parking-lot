import { Document } from "mongoose";
import { IParkingSpot } from "./IParkingSpot";
import { IVehicle } from "./IVehicle";

export interface ITicket extends Document {
  vehicle: IVehicle["_id"];
  spot: IParkingSpot["_id"];
  startTime: Date;
  endTime?: Date;
  cost?: number;
}
