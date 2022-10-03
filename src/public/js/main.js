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

function dayName(dayNumber) {
  switch(dayNumber) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda-Feira";
    case 2:
      return "Terça-Feira";
    case 3:
      return "Quarta-Feira";
    case 4:
      return "Quinta-Feira";
    case 5:
      return "Sexta-Feira";
    case 6:
      return "Sábado";
  }
}

function monthName(monthNumber, shortName) {
  switch(monthNumber) {
    case 0:
      return shortName ? "Janeiro" : "Jan";
    case 1:
      return shortName ? "Fevereiro" : "Fev";
    case 2:
      return shortName ? "Março" : "Mar";
    case 3:
      return shortName ? "Abril" : "Abr";
    case 4:
      return shortName ? "Maio" : "Mai";
    case 5:
      return shortName ? "Junho" : "Jun";
    case 6:
      return shortName ? "Julho" : "Jul";
    case 7:
      return shortName ? "Agosto" : "Ago";
    case 8:
      return shortName ? "Setembro" : "Set";
    case 9:
      return shortName ? "Outubro" : "Out";
    case 10:
      return shortName ? "Novembro" : "Nov";
    case 11:
      return shortName ? "Dezembro" : "Dez";
  }
}