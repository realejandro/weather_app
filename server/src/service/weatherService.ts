import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon:number;
}

// TODO: Define a class for the Weather object question
interface Weather {
  city?:string,
  date?: string,
  tempF:number,
  pressure?:number,
  humidity?:number,
  windSpeed?: number,
  iconDescription: string,
  icon: string, 
}


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private API_KEY: string;
  private city: string;
  private url:string;

  constructor() {
    this.city = '';
    this.API_KEY = process.env.API_KEY || '';
    this.url = process.env.API_BASE_URL|| '';
  }

  private setCity(city:string) {
    return this.city = city;
  }

  private celsiusToFahrenheit(celsius: number) : number {
    return  parseFloat( Math.fround(celsius * 1.8 + 32).toFixed(2) ) ;
  }

  // TODO: Create fetchLocationData method 
  private async fetchLocationData(query: string) {
    
    const buildGeocodeQuery = this.buildGeocodeQuery(query);
    const resp  = await fetch(`${this.url}/geo/1.0/direct?${ buildGeocodeQuery }`);
    const data = await resp.json();
    return data;

  }

  
  //TODO: Create destructureLocationData method 
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return {lat, lon};

  }
  
  // TODO: Create buildGeocodeQuery method 
  private buildGeocodeQuery(query: string): string {  
    return `q=${ encodeURIComponent(query) }&limit=5&appid=${this.API_KEY}`; 
  }

  // TODO: Create buildWeatherQuery method 
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `lat=${lat}&lon=${lon}&cnt=40&appid=${this.API_KEY}&units=metric`;  
  }
  

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(query);
    const { lat, lon } = locationData[0]; 
    return { lat, lon };
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = await this.buildWeatherQuery(coordinates);
    const resp = await fetch(`${this.url}/data/2.5/forecast?${weatherQuery}`);
    const { list } = await resp.json();  
    const currentWeather = this.parseCurrentWeather(list[0]);
    const forecastWeather = this.buildForecastArray(currentWeather, list);
    return forecastWeather;
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {

    const currentWeatherData : Weather = {
      city: this.city,
      date: dayjs.unix(response.dt).format('MM-DD-YYYY'),
      tempF: this.celsiusToFahrenheit(response.main.temp),
      windSpeed: response.wind.speed,
      humidity:response.main.humidity,
      iconDescription: response.weather[0].description,
      icon: response.weather[0].icon
    }
  
    return currentWeatherData;
    
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherForecast: Weather[] = [currentWeather];
    const dailyWeather = [];

    weatherData.slice(1).forEach((data: any) => {
        const parsedWeather = this.parseCurrentWeather(data);
        weatherForecast.push(parsedWeather);
    });

    for(let i = 0; i < weatherForecast.length; i+=8) {
      dailyWeather.push(weatherForecast[i]);
    }

    return dailyWeather;
  }

  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try{
      const currentCity = this.setCity(city);
      const locationData = await this.fetchLocationData(currentCity); 
      const { lat, lon } = locationData[0];
      const weatherData = await this.fetchWeatherData( { lat , lon } )
      return weatherData;
    } catch(error) {
        console.log(error);
    }
     
  }
}

export default new WeatherService();
