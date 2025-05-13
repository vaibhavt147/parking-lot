import { toVehicleType } from "../constants/VehicleTypes";
import VehicleRepository from "../repository/Vehicle.repository";

export class VehicleService {
  async createVehicle(type: string, vehiclePlate: string) {
    return await VehicleRepository.findOrCreate({
      type: toVehicleType(type),
      vehiclePlate,
    });
  }
}
