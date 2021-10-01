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
}


let userZip = document.getElementById("userZip").value;

let btn = document.getElementById('myform');
btn.addEventListener('submit', function (event) {
    event.preventDefault();
    alert("submitted!");
});


function isValid(zip) {
    if(zip.length === 5 && isNaN(zip) === false) {
        console.log('good ZIP');
        return true;
    } else {
        console.log('Enter a Valid ZIP code')
    }
}


function onSearch(zip) {
    if(isValid(zip) === true) {
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
        console.log('Reenter ZIP')
        alert('Enter valid ZIP code')
    }
}
