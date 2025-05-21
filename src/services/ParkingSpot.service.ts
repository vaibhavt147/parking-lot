import ParkingSpotRepository from "../repository/ParkingSpot.repository";
import { getVehicleType } from "../utils/VehicleTypes";

export class ParkingSpotService {
  private generateSpotID(floor: number, type: string, number: number): string {
    return `${floor}-${type.toLowerCase()[0]}-${number}`;
  }

  async createSpot(floor: number, type: string, number: number) {
    const spotId = this.generateSpotID(floor, type, number);
    const existingSpot = await ParkingSpotRepository.getSpotBySpotId(spotId);

    if (existingSpot) {
      throw new Error(`A parking spot with the ID ${spotId} already exists.`);
    }

    return await ParkingSpotRepository.createParkingSpot({
      spotId,
      floorNumber: floor,
      type: getVehicleType(type),
    });
  }

  async getAvailableSpot(type: string) {
    return await ParkingSpotRepository.getAvailableSpots(getVehicleType(type));
  }

  async parkVehicle(spotId: string, vehiclePlate: string) {
    return await ParkingSpotRepository.assignVehicleToSpot(
      spotId,
      vehiclePlate
    );
  }
  async unParkVehicle(spotId: string) {
    return await ParkingSpotRepository.deAssignVehicleToSpot(spotId);
  }
}
