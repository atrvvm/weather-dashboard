import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

// DONE: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
class HistoryService {
  // DONE: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile("db/searchHistory.json", {
      flag: "a+",
      encoding: "utf8",
    });
  }

  // DONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(city: City[]) {
    return await fs.writeFile(
      "db/searchHistory.json",
      JSON.stringify(city, null, "\t")
    );
  }

  // DONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((city) => {
      let parsedCity: City[];

      // If feedback isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedCity = [].concat(JSON.parse(city));
      } catch (err) {
        parsedCity = [];
      }

      return parsedCity;
    });
  }

  // DONE: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string, id: string) {
    if (!name || !id) {
      throw new Error("City name cannot be blank");
    }

    // DONE: Add unique ID to the state using uuid package
    const newCity: City = {
      name: name,
      id: uuidv4(),
    };

    // Get all feedbacks, add the new feedback, write all the updated feedbacks, return the newFeedback
    return await this.getCities()
      .then((city) => {
        return [...city, newCity];
      })
      .then((updatedFeedback) => this.write(updatedFeedback))
      .then(() => newCity);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
