import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();



// TODO: POST Request with city name to retrieve weather data
router.get('/', async(req, res) => {
  const weatherData = await WeatherService.getWeatherForCity( req.body.cityName );
  res.json( weatherData );
})

router.get('/test', async(_req: Request, res:Response) => {
  console.log("you are at test");
  const data = await HistoryService.test();
  res.send(data);
})

router.post('/', async( req: Request, res:Response ) => {
  // TODO: GET weather data from city name // TODO: save city to search history
  try {
    const city = req.body.cityName;
    const weatherData = await WeatherService.getWeatherForCity(city);
    HistoryService.addCity(city);
    res.json(weatherData);

  } catch(error){
    console.log(error);
  }
  
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  const cities = await HistoryService.getCities();
  res.json(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  
});

export default router;
