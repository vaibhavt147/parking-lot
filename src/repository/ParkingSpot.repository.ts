import { VehicleTypes } from "../enums/VehicleTypes";
import { IParkingSpot } from "../interfaces/IParkingSpot";
import { ParkingSpot } from "../models/ParkingSpot.model";

class ParkingSpotRepository {
  private static instance: ParkingSpotRepository;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ParkingSpotRepository();
    }
    return this.instance;
  }

  async createParkingSpot(data: {
    spotId: string;
    floorNumber: number;
    type: VehicleTypes;
  }): Promise<IParkingSpot> {
    return await ParkingSpot.insertOne(data);
  }

  async getSpotBySpotId(spotId: string) {
    return await ParkingSpot.findOne({ spotId });
  }

  async getAvailableSpots(type: VehicleTypes) {
    const spot = await ParkingSpot.findOne({ type, isAvailable: true });
    return spot;
  }

  async assignVehicleToSpot(spotId: string, vehiclePlate: string) {
    return await ParkingSpot.findOneAndUpdate(
      { spotId },
      { $set: { isAvailable: false, vehiclePlate } },
      { new: true }
    );
  }

  async deAssignVehicleToSpot(spotId: string) {
    return await ParkingSpot.findOneAndUpdate(
      { spotId },
      { $set: { isAvailable: true, vehiclePlate: null } },
      { new: true }
    );
  }
}

export default ParkingSpotRepository.getInstance();
