import VehicleRepository from "../repository/Vehicle.repository";
import { getVehicleType } from "../utils/VehicleTypes";

export class VehicleService {
  async createVehicle(type: string, vehiclePlate: string) {
    return await VehicleRepository.findOrCreate({
      type: getVehicleType(type),
      vehiclePlate,
    });
  }
}
