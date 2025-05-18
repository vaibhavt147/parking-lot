import { model, Schema } from "mongoose";
import { VehicleTypes } from "../enums/VehicleTypes";
import { IParkingSpot } from "../interfaces/IParkingSpot";

const parkingSpotSchema = new Schema<IParkingSpot>({
  spotId: { type: String, required: true, unique: true },
  floorNumber: { type: Number, required: true },
  type: { type: String, enum: Object.values(VehicleTypes), required: true },
  isAvailable: { type: Boolean, default: true },
  vehiclePlate: { type: String, default: null },
});

export const ParkingSpot = model<IParkingSpot>(
  "ParkingSpot",
  parkingSpotSchema
);
