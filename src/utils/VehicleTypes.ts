import { VehicleTypesMap } from "../constants/VehicleTypes";
import { VehicleTypes } from "../enums/VehicleTypes";

export const getVehicleType = (input: string): VehicleTypes => {
  const key = input.toLowerCase() as keyof typeof VehicleTypesMap;
  const value = VehicleTypesMap[key];
  if (!value) throw new Error(`Invalid vehicle type: ${input}`);
  return value;
};
