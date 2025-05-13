export enum VehicleTypes {
  CAR = "Car",
  BIKE = "Bike",
  TRUCK = "Truck",
}

export const VehicleTypesMap = {
  car: VehicleTypes.CAR,
  bike: VehicleTypes.BIKE,
  truck: VehicleTypes.TRUCK,
} as const;

export type VehicleTypeKey = keyof typeof VehicleTypesMap;

export const getVehicleType = (input: string): VehicleTypes => {
  const key = input.toLowerCase() as keyof typeof VehicleTypesMap;
  const value = VehicleTypesMap[key];
  if (!value) throw new Error(`Invalid vehicle type: ${input}`);
  return value;
};

export const VehicleRates: Record<VehicleTypes, number> = {
  [VehicleTypes.CAR]: 10,
  [VehicleTypes.BIKE]: 5,
  [VehicleTypes.TRUCK]: 15,
};
