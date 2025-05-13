import { Document, model, Schema } from "mongoose";
import { VehicleTypes } from "../constants/VehicleTypes";

export interface IVehicle extends Document {
  type: VehicleTypes;
  vehiclePlate: string;
}

const VehicleSchema = new Schema<IVehicle>({
  vehiclePlate: { type: String, required: true, unique: true },
  type: { type: String, enum: Object.values(VehicleTypes), required: true },
});

export const Vehicle = model<IVehicle>("Vehicle", VehicleSchema);
