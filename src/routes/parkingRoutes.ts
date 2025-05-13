import express from "express";
import { getVehicleType } from "../constants/VehicleTypes";
import { ParkingSpotService } from "../services/ParkingSpot.service";
import { TicketService } from "../services/Ticket.service";
import { VehicleService } from "../services/Vehicle.service";
const router = express.Router();

const vehicleService: VehicleService = new VehicleService();
const parkingSpotService: ParkingSpotService = new ParkingSpotService();
const ticketService: TicketService = new TicketService();

router.post("/park", async (req, res) => {
  try {
    const { type, vehiclePlate } = req.body;
    const vehicleType = getVehicleType(type.toLowerCase());
    if (!vehicleType && !vehiclePlate) {
      res.status(400);
      res.send({ message: "Invalid Request" });
      return;
    }
    const vehicle = await vehicleService.createVehicle(
      vehicleType,
      vehiclePlate
    );
    const spot = await parkingSpotService.getAvailableSpot(vehicleType);
    const spotId = spot?.spotId;
    if (!spotId) {
      throw new Error("No Parking spots available");
    }
    await parkingSpotService.parkVehicle(spot.spotId, vehiclePlate);
    const ticket = await ticketService.openTicket(vehicle._id, spot._id);
    res.status(200);
    res.send({
      success: 1,
      spotId: spot.spotId,
      ticketId: ticket._id,
      message: "Vehicle parked successfully",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500);
    res.send({ success: 0, message: `Internal error occured ${error}` });
  }
});

router.post("/unpark", async (req, res) => {
  try {
    const { ticketId } = req.body;
    const ticket = await ticketService.getTicketById(ticketId);
    if (!ticket) {
      res.status(400);
      res.send({ message: "Invalid Request" });
      return;
    }
    await parkingSpotService.unParkVehicle(ticketId.spot);
    const updatedTicket = await ticketService.closeTicket(ticket);
    res.status(200);
    res.send({ message: `Total Fare ${updatedTicket?.cost}` });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500);
    res.send({ success: 0, message: `Internal error occured ${error}` });
  }
});

router.post("/addSpot", async (req, res) => {
  try {
    const { floor, type, number } = req.body;
    const vehicleType = getVehicleType(type);
    await parkingSpotService.createSpot(floor, vehicleType, number);
    res.status(200);
    res.send({ success: 1, message: "Parking Spot created successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500);
    res.send({ success: 0, message: `Internal error occured ${error}` });
  }
});
