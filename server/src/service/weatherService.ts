import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// ✅ Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// ✅ Define a class for the Weather object
class Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;

  constructor(data: any) {
    this.temperature = data.main.temp;
    this.humidity = data.main.humidity;
    this.windSpeed = data.wind.speed;
    this.description = data.weather[0].description;
    this.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
}

class WeatherService {
  private baseURL: string = "https://api.openweathermap.org/data/2.5/";
  private apiKey: string = process.env.OPENWEATHER_API_KEY || "";

  // ✅ Build URL query for fetching city coordinates
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  }

  // ✅ Fetch location data for a city (convert city to lat/lon)
  private async fetchLocationData(city: string): Promise<any> {
    const url = this.buildGeocodeQuery(city);
    const response = await axios.get(url);
    if (response.data.length === 0) {
      throw new Error(`City "${city}" not found.`);
    }
    return response.data[0]; // Returns first match
  }

  // ✅ Extract and return coordinates from location data
  private destructureLocationData(locationData: any): Coordinates {
    return { lat: locationData.lat, lon: locationData.lon };
  }

  // ✅ URL query for fetching weather data
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${this.apiKey}`;
  }

  // ✅ Fetch & destructure coordinates in one method
  private async fetchAndDestructureLocationData(
    city: string
  ): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }

  // ✅ Fetch weather data for given coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await axios.get(url);
    return response.data;
  }

  // ✅ Parse current weather from API response
  private parseCurrentWeather(response: any): Weather {
    return new Weather(response.list[0]); // Current weather in first index
  }
  // ✅ Build a 5-day forecast array
  private buildForecastArray(weatherData: any[]): Weather[] {
    return weatherData
      .filter((_, index) => index % 8 === 0) // Extract data every 24 hours
      .map((data) => new Weather(data));
  }

  // ✅ Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);

    return {
      city: city,
      currentWeather: this.parseCurrentWeather(weatherData),
      forecast: this.buildForecastArray(weatherData.list),
    };
  }
}

export default new WeatherService();
