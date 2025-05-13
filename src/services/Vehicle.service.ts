import { getVehicleType } from "../constants/VehicleTypes";
import VehicleRepository from "../repository/Vehicle.repository";

export class VehicleService {
  async createVehicle(type: string, vehiclePlate: string) {
    return await VehicleRepository.findOrCreate({
      type: getVehicleType(type),
      vehiclePlate,
    });
  }
}
