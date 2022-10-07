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
  let tag_elements = {
    cityName   : document.querySelector("div.field.name > p.data"),
    temperature: document.querySelector("div.field.temperature > p.data"),
    datetime   : document.querySelector("div.field.datetime > p.data"),
    conditions : document.querySelector("div.field.conditions > p.data")
  };

  tag_elements.cityName.innerHTML    = '';
  tag_elements.temperature.innerHTML = '';
  tag_elements.datetime.innerHTML    = '';
  tag_elements.conditions.innerHTML  = '';

  let textNodes = {
    cityName   : document.createTextNode(information.cityName),
    temperature: temperatureNode(information.Temperature.Metric.Value),
    datetime   : dateTimeNode(new Date(information.LocalObservationDateTime)),
    conditions : document.createTextNode(information.WeatherText)
  };

  tag_elements.cityName.appendChild(textNodes.cityName);
  tag_elements.temperature.appendChild(textNodes.temperature);
  tag_elements.datetime.appendChild(textNodes.datetime);
  tag_elements.conditions.appendChild(textNodes.conditions);
}