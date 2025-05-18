import { Document } from "mongoose";
import { VehicleTypes } from "../enums/VehicleTypes";

export interface IParkingSpot extends Document {
  spotId: string;
  floorNumber: number;
  type: VehicleTypes;
  isAvailable: boolean;
  vehiclePlate: string | null;
}
