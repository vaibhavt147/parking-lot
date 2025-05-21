import { VehicleTypes } from "../enums/VehicleTypes";

export const VehicleTypesMap = {
  car: VehicleTypes.CAR,
  bike: VehicleTypes.BIKE,
  truck: VehicleTypes.TRUCK,
} as const;

export const VehicleRates: Record<VehicleTypes, number> = {
  [VehicleTypes.CAR]: 10,
  [VehicleTypes.BIKE]: 5,
  [VehicleTypes.TRUCK]: 15,
};
