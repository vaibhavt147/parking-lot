import express from "express";
import { VehicleService } from "../services/Vehicle.service";
import { toVehicleType } from "../constants/VehicleTypes";
import { ParkingSpotService } from "../services/ParkingSpot.service";
const router = express.Router();

const vehicleService: VehicleService = new VehicleService();
const parkingSpotService: ParkingSpotService = new ParkingSpotService();

router.post("/park", async (req, res) => {
  try {
    const { type, vehiclePlate } = req.body;
    const vehicleType = toVehicleType(type.toLowerCase());
    await vehicleService.createVehicle(vehicleType, vehiclePlate);
    const spot = await parkingSpotService.getAvailableSpot(vehicleType);
    const spotId = spot?.spotId;
    if (!spotId) {
      throw new Error("No Parking spots available");
    }
    await parkingSpotService.parkVehicle(spot.spotId, vehiclePlate);
  } catch (error) {}
});
