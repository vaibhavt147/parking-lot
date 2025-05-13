import { Document, model, Schema } from "mongoose";
import { VehicleTypes } from "../constants/VehicleTypes";

export interface IparkingSpot extends Document {
  spotId: string;
  floorNumber: number;
  type: VehicleTypes;
  isAvailable: boolean;
  vehiclePlate: string | null;
}

const parkingSpotSchema = new Schema<IparkingSpot>({
  spotId: { type: String, required: true, unique: true },
  floorNumber: { type: Number, required: true },
  type: { type: String, enum: Object.values(VehicleTypes), required: true },
  isAvailable: { type: Boolean, default: true },
  vehiclePlate: { type: String, default: null },
});

export const ParkingSpot = model<IparkingSpot>(
  "ParkingSpot",
  parkingSpotSchema
);
