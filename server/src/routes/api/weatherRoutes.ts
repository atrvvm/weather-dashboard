import { Router, type Request, type Response } from "express";
const router = Router();

import HistoryService from "../../service/historyService.js";
import WeatherService from "../../service/weatherService.js";

// ✅ POST Request: Retrieve weather data and save to history
router.post("/", async (req: Request, res: Response) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    // ✅ GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(city);

    // ✅ Save city to search history
    await HistoryService.addCity(city);

    return res.json(weatherData);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

// ✅ GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    return res.json(history);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to retrieve search history' });
  }
});

// ✅ BONUS: DELETE city from search history
router.delete("/history/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const removed = await HistoryService.removeCity(id);
    if (!removed) {
      return res
        .status(404)
        .json({ error: "City not found in search history" });
    }

    return res.json({ message: "City removed successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({
        error: error.message || "Failed to delete city from search history",
      });
  }
});

export default router;
