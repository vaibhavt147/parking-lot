import { VehicleTypes } from "../constants/VehicleTypes";
import { IVehicle, Vehicle } from "../models/Vehicle.model";

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

  async getVehicleById(vehicleId: IVehicle["_id"]) {
    return await Vehicle.findById(vehicleId);
  }
}

export default VehicleRepository.getInstance();
