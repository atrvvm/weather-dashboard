import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "node:url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define a City class with name and id properties
class City {
  id: string;
  name;

  constructor(name: string) {
    this.id = uuidv4(); // Generates unique ID for each city
    this.name = name;
  }
}

class HistoryService {
  private filePath = path.join(__dirname, '../db/searchHistory.json');

  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data) as City[];
    } catch (error) {
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8');
  }

  async getCities(): Promise<City[]> {
    return await this.read();
  }

  async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      throw new Error(`City "${cityName}" is already in history.`);
    }

    const newCity = new City(cityName);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  async removeCity(id: string): Promise<boolean> {
    let cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);

    if (cities.length === updatedCities.length) {
      return false;
    }

    await this.write(updatedCities);
    return true;
  }
}

export default new HistoryService();
