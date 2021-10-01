class Weather{
    constructor(city, tempK, condition, description, icon){
        this.city = city;
        this.tempK = tempK;
        this.condition = condition;
        this.description = description;
        this.icon = icon;
    }
    celsius() {
        return this.tempK - 273.15;
    }
    fahrenheit() {
        return this.tempK * (9/5) - 459.67;
    }
    updateView() {
        table1.style.display = "block";
        let newLocation = document.getElementById('loc');
        newLocation.innerText = this.city;
        table2.style.display = "block";
        let newTempF = document.getElementById('Ftemp');
        newTempF.innerText = Math.round(userWeather.fahrenheit());
        let newTempK = document.getElementById('Ktemp');
        newTempK.innerText = Math.round(this.tempK);
        let newTempC = document.getElementById('Ctemp');
        newTempC.innerText = Math.round(userWeather.celsius());
        table3.style.display = "block";
    }
}

var table1 = document.getElementById('table1');
var table2 = document.getElementById('table2');
var table3 = document.getElementById('table3');
newAlert = null;

window.onload = function() {
    table1.style.display = "none";
    table2.style.display = "none";
    table3.style.display = "none";
}

function myAlert(message){
    newAlert = document.createElement("div");
    newAlert.innerHTML = message;
    newAlert.class = "alert alert-danger alert-dismissible fade show";
    newAlert.role = "alert";
    newAlert.id = "alertDiv";

    document.querySelector('#myform').append(newAlert);
}

function isValid(zip) {
    if(zip.length === 5 && isNaN(zip) === false) {
        console.log('good ZIP');
        return true;
    } else {
        myAlert('Enter a Valid ZIP code!');
        console.log('Enter a Valid ZIP code');
    }
}


let btn = document.getElementById('myform');
btn.addEventListener('submit', function (event) {
    const myZip = document.querySelector('input').value;
    console.log(myZip);
    event.preventDefault();
    if(isValid(myZip) === true) {
        console.log('it worked!')
        // Make a request for a user with a given ID
        axios.get('https://api.openweathermap.org/data/2.5/weather?zip=40509&appid=c5616fb2308859555306704133216429')
        .then(function (res) {
            // handle success;
            console.log(res)
            let userWeather = new Weather(
                res.data.name,
                res.data.main.temp,
                res.data.weather[0].main,
                res.data.weather[0].description,
                res.data.weather[0].icon
                )
            console.log(userWeather)
            console.log(userWeather.celsius())
            userWeather.updateView();
        })
        .catch(function (error) {
            // handle error
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


// function onSearch(zip) {
//     if(isValid(zip) === true) {
//         console.log('it worked!')
//         // Make a request for a user with a given ID
//         axios.get('https://api.openweathermap.org/data/2.5/weather?zip=40509&appid=c5616fb2308859555306704133216429')
//         .then(function (res) {
//             // handle success;
//             console.log(res)
//             let userWeather = new Weather(
//                 res.data.name,
//                 res.data.main.temp,
//                 res.data.weather[0].main,
//                 res.data.weather[0].description,
//                 res.data.weather[0].icon
//                 )
//             console.log(userWeather)
//             console.log(userWeather.celsius())
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
//         .then(function () {
//             // always executed
//             console.log("Did it work?");
//         });
//     } else {
//         console.log('Reenter ZIP');
//     }
// }
