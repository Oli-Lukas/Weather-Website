const APIURL               = "http://dataservice.accuweather.com";
const citiesAPI            = "locations/v1/cities";
const currentConditionsAPI = "currentconditions/v1";
const APIKey               = "";

const cityForm  = document.querySelector("#city-form");
const cityInput = document.querySelector(".city-input");

cityForm.addEventListener('submit', (event) => {
  event.preventDefault();

  fetch(`${APIURL}/${citiesAPI}/search?q=${cityInput.value}&apikey=${APIKey}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let locationKey = data[0].Key;
      let language    = "pt-br";

      console.log(`Primeiro fetch`);
      console.log(data);

      return fetch(`${APIURL}/${currentConditionsAPI}/${locationKey}?apikey=${APIKey}&language=${language}`);
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data = {...data[0], cityName: cityInput.value};
      console.log(data);  

      showCity(data);
    });
});

function showCity(information) {
  const tempElement = document.querySelector("h1.temperature");
  const cityNameElement = document.querySelector("h2.city-name");
  const additionalInformationElement = document.querySelector("h5.additional-information");

  tempElement.innerHTML = '';
  cityNameElement.innerHTML = '';
  additionalInformationElement.innerHTML = '';

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

  let stringDate = `${stringTime} - ${weekDay}, ${day} de ${month}`;
  stringDate = document.createTextNode(stringDate);


  tempElement.appendChild(temperature);
  cityNameElement.appendChild(cityName);
  additionalInformationElement.appendChild(stringDate);
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