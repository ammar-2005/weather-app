// ^ HTML Elements
const searchInput = document.querySelector("input");
const cityNameField = document.querySelector(".cityName");
const status = document.querySelector(".status");
const statusIcon = document.querySelector(".icon img");
const temp = document.querySelector(".temp span");
const humidity = document.querySelector(".humidityValue");
const wind = document.querySelector(".windValue span");
// API 

const baseUrl = `
http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=
`;


// get data

 async function getWeather(cityName){
     const res = await fetch(baseUrl + cityName);
     const weatherData = await res.json();
     return weatherData;
     }


 async function renderWeather(cityName){
    const weatherData = await getWeather(cityName);
       
  const { current, location } = weatherData;
  const { humidity: humidityValue, wind_kph, temp_c, condition } = current;
  const { text, icon } = condition;
  const { name } = location;

  cityNameField.innerHTML = name;
   status.innerHTML = text;
   statusIcon.setAttribute("src" , icon);
   temp.innerHTML = temp_c;
   humidity.innerHTML = humidityValue + "%";
   wind.innerHTML = wind_kph;
    
 }

//  search input 
 let searchTimeOut;
searchInput.addEventListener("input", function(){
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(() => {
        renderWeather(searchInput.value);
    },500); 
   

});