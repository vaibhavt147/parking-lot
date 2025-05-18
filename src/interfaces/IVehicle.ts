import { Document } from "mongoose";
import { VehicleTypes } from "../enums/VehicleTypes";

export interface IVehicle extends Document {
  type: VehicleTypes;
  vehiclePlate: string;
}
