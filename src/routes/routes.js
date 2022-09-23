import express     from "express";
import * as dotenv from "dotenv";
import axios       from "axios";

dotenv.config();
const router = express.Router();

router.get('/', (request, response) => {  
  response.render('home');
});

router.get('/city-information/:cityName', async (request, response) => {
  const cityName = request.params.cityName;

  const APIBaseURL           = "http://dataservice.accuweather.com";
  const citiesAPI            = "locations/v1/cities";
  const currentConditionsAPI = "currentconditions/v1";
  const APIKey               = process.env.API_SECRET_KEY;

  const cities = await axios.get(`${APIBaseURL}/${citiesAPI}/search?q=${cityName}&apikey=${APIKey}`);
  
  const locationKey = cities.data[0].Key;
  const language    = 'pt-br';

  const currentConditions = await axios.get(`${APIBaseURL}/${currentConditionsAPI}/${locationKey}?apikey=${APIKey}&language=${language}`);
  const clientResponse    = currentConditions.data[0];

  response.json(clientResponse);
});

export default router;