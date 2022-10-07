import { dayName, monthName } from './functions.js';

const cityForm  = document.querySelector("#city-form");
const cityInput = document.querySelector(".city-input");

cityForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let cityName = cityInput.value;

  let rawResponse = await fetch(`/city-information/${cityName}`);
  let response = await rawResponse.json();

  response = {...response, cityName: cityInput.value};

  showCity(response);
});

function showCity(information) {
  const tempElement = document.querySelector("div.field.temperature > p.data");
  const cityNameElement = document.querySelector("div.field.name > p.data");
  const additionalInformationElement = document.querySelector("div.field.datetime > p.data");
  const conditionsElement = document.querySelector("div.field.conditions > p.data");

  tempElement.innerHTML = '';
  cityNameElement.innerHTML = '';
  additionalInformationElement.innerHTML = '';
  conditionsElement.innerHTML = '';

  let currentConditions = document.createTextNode(information.WeatherText);


  let temperature = information.Temperature.Metric.Value;

  temperature = Math.ceil(Number(temperature));
  temperature = String(temperature) + "º";
  temperature = document.createTextNode(temperature);

  let cityName = information.cityName;
  cityName = document.createTextNode(information.cityName);
  
  let date = new Date(information.LocalObservationDateTime);

  let hours      = date.getHours().toString().padStart(2, '0');
  let minutes    = date.getMinutes().toString().padStart(2, '0');
  let stringTime = `${hours}:${minutes}`;
  let weekDay    = dayName(date.getDay());
  let day        = date.getDate();
  let month      = monthName(date.getMonth(), true);
  let year       = date.getFullYear();

  let stringDate = `${stringTime} - ${weekDay}, ${day} de ${month} de ${year}`;
  stringDate = document.createTextNode(stringDate);


  tempElement.appendChild(temperature);
  cityNameElement.appendChild(cityName);
  additionalInformationElement.appendChild(stringDate);
  conditionsElement.appendChild(currentConditions);
}