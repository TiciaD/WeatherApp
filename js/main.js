// initialize a class to hold weather data from API
class Weather{
    constructor(city, tempK, condition, description, icon, humidity, realFeel){
        this.city = city;
        this.tempK = tempK;
        this.condition = condition;
        this.description = description;
        this.icon = icon;
        this.humidity = humidity;
        this.realFeel = realFeel;
    }
    // function to convert Kelvin temperature to Celsius
    celsius() {
        return this.tempK - 273.15;
    }
    // function to convert Kelvin temperature to fahrenheit
    fahrenheit() {
        return this.tempK * (9/5) - 459.67;
    }
    // function to change state with values from weather class
    updateView() {
        newAlert.remove();

        // display first table and change text to city name from API
        table1.style.visibility = "visible";
        let newLocation = document.getElementById('loc');
        newLocation.innerText = this.city;

        // display second table and change text to temperature value from API
        table2.style.visibility = "visible";
        let newTempF = document.getElementById('Ftemp');
        // call fahrenheit function, round it and add an F
        newTempF.innerText = Math.round(this.fahrenheit()) + ' \xB0' + 'F' ;
        let newTempK = document.getElementById('Ktemp');
        newTempK.innerText = Math.round(this.tempK) + ' K';
        // call celsius function, round it and add a C
        let newTempC = document.getElementById('Ctemp');
        newTempC.innerText = Math.round(this.celsius()) + ' \xB0' + 'C';

        // display third table and change text to weather condition value from API
        table3.style.visibility = "visible";
        let newCondition = document.getElementById('con');
        newCondition.innerText = `${this.condition}
        ${this.description}`;

        // add icon image to HTML, change text to Humidity
        let newHumidity = document.getElementById('pic');
        newHumidity.innerText = `Humidity: ${this.humidity}`
        var newIcon = document.createElement('img');
        newIcon.src = `./img/${this.icon}.png`;
        document.getElementById('pic').appendChild(newIcon);    
    }
};

var table1 = document.getElementById('table1');
var table2 = document.getElementById('table2');
var table3 = document.getElementById('table3');
let newAlert = '';

// onLoad function to run when page is first loaded
window.onload = function() {
    // hide all tables, only display search bar
    table1.style.visibility = "hidden";
    table2.style.visibility = "hidden";
    table3.style.visibility = "hidden";
}

// create an alert for when user enters invalid ZIP
function myAlert(message){
    newAlert = document.createElement("div");
    newAlert.innerHTML = message;
    newAlert.class = "alert alert-danger alert-dismissible fade show";
    newAlert.role = "alert";
    newAlert.id = "alertDiv";

    // add newAlert div to end of #error element
    let newError = document.querySelector('#error');
    // set to empty first in case HTML was already filled so it doesn't create multiple alerts
    newError.innerHTML = '';
    // append after set to empty
    newError.append(newAlert);
};

// function to check if user input is valid ZIP code
function isValid(zip) {
    // if the input is 5 characters and isNaN value is false then it passes
    if(zip.length === 5 && isNaN(zip) === false) {
        console.log('good ZIP');
        return true;
    } else {
        // if input doesn't meet criteria, call myAlert to message user
        myAlert('Enter a Valid ZIP code!');
        console.log('Enter a Valid ZIP code');
    }
};

// create event listener to submit form when user inputs a value
let btn = document.getElementById('myform');
btn.addEventListener('submit', function (event) {
    // when SEARCH button pressed, the value is taken from input
    const myZip = document.querySelector('input').value;
    console.log(myZip);
    // prevent default stops the default action of a submit event that reloads the page/navigates to new page
    event.preventDefault();
    // call isValid function to make sure user input is valid, then perform fetch request
    if(isValid(myZip) === true) {
        console.log('it worked!')
        // Make a request for a user with a given ID
        axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${myZip}&appid=c5616fb2308859555306704133216429`)
        .then(function (res) {
            // handle success;
            console.log(res)
            // if request successful, create new class with data from API assigned to Weather objects
            let userWeather = new Weather(
                res.data.name,
                res.data.main.temp,
                res.data.weather[0].main,
                res.data.weather[0].description,
                res.data.weather[0].icon,
                res.data.main.humidity,
                res.data.main.feels_like,
                )
            console.log(userWeather)
            console.log(userWeather.celsius())
            // run update view function to display the new data that's been requested
            userWeather.updateView();
        })
        .catch(function (error) {
            // handle error
            alert('Error occurred, refresh!');
            console.log(error);
        })
        .then(function () {
            // always executed
            console.log("Did it work?");
        });
    } else {
        console.log('Reenter ZIP');
    }
});

