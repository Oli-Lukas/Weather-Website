import { temperatureNode, dateTimeNode } from './functions.js';

const cityForm  = document.querySelector("#city-form");
const cityInput = document.querySelector(".city-input");

cityForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let cityName = cityInput.value;

  let rawResponse = await fetch(`/city-information/${cityName}`);
  let response = await rawResponse.json();

  response = {
    ...response,
    cityName: cityInput.value
  };

  showCity(response);
});

function showCity(information) {
  let tagTitleElements = {
    cityName   : document.querySelector("div.field.name > p.title"),
    temperature: document.querySelector("div.field.temperature > p.title"),
    datetime   : document.querySelector("div.field.datetime > p.title"),
    conditions : document.querySelector("div.field.conditions > p.title")
  }

  tagTitleElements.cityName.innerHTML = '';
  tagTitleElements.temperature.innerHTML = '';
  tagTitleElements.datetime.innerHTML = '';
  tagTitleElements.conditions.innerHTML = '';

  let titlesTextNode = {
    cityName   : document.createTextNode("City Name"),
    temperature: document.createTextNode("Temperature"),
    datetime   : document.createTextNode("Date & Time"),
    conditions : document.createTextNode("Current Conditions")
  };

  tagTitleElements.cityName.appendChild(titlesTextNode.cityName);
  tagTitleElements.temperature.appendChild(titlesTextNode.temperature);
  tagTitleElements.datetime.appendChild(titlesTextNode.datetime);
  tagTitleElements.conditions.appendChild(titlesTextNode.conditions);

  let tagDataElements = {
    cityName   : document.querySelector("div.field.name > p.data"),
    temperature: document.querySelector("div.field.temperature > p.data"),
    datetime   : document.querySelector("div.field.datetime > p.data"),
    conditions : document.querySelector("div.field.conditions > p.data")
  };

  let dataTextNode = {
    cityName   : document.createTextNode(information.cityName),
    temperature: temperatureNode(information.Temperature.Metric.Value),
    datetime   : dateTimeNode(new Date(information.LocalObservationDateTime)),
    conditions : document.createTextNode(information.WeatherText)
  };

  tagDataElements.cityName.innerHTML    = '';
  tagDataElements.temperature.innerHTML = '';
  tagDataElements.datetime.innerHTML    = '';
  tagDataElements.conditions.innerHTML  = '';

  tagDataElements.cityName.appendChild(dataTextNode.cityName);
  tagDataElements.temperature.appendChild(dataTextNode.temperature);
  tagDataElements.datetime.appendChild(dataTextNode.datetime);
  tagDataElements.conditions.appendChild(dataTextNode.conditions);
}