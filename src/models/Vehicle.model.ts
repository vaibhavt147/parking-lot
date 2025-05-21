import { model, Schema } from "mongoose";
import { IVehicle } from "../interfaces/IVehicle";
import { VehicleTypes } from "../enums/VehicleTypes";

const VehicleSchema = new Schema<IVehicle>({
  vehiclePlate: { type: String, required: true, unique: true },
  type: { type: String, enum: Object.values(VehicleTypes), required: true },
});

export const Vehicle = model<IVehicle>("Vehicle", VehicleSchema);
