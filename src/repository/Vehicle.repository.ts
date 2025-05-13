import { VehicleTypes } from "../constants/VehicleTypes";
import { Vehicle } from "../models/Vehicle.model";

class VehicleRepository {
  private static instance: VehicleRepository;
  private constructor() {}

  static getInstance(): VehicleRepository {
    if (!this.instance) {
      this.instance = new VehicleRepository();
    }
    return this.instance;
  }

  async findOrCreate(data: { type: VehicleTypes; vehiclePlate: string }) {
    let vehicle = await Vehicle.findOne({ vehiclePlate: data.vehiclePlate });
    if (!vehicle) {
      vehicle = await Vehicle.create(data);
    }
    return vehicle;
  }

  async getVehicleByPlate(vehiclePlate: string) {
    return await Vehicle.findOne({ vehiclePlate });
  }
}

export default VehicleRepository.getInstance();
