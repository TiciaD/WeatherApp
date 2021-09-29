# Weather App Pseudocode
## Functionality
**Main Goal**: User should be able to enter their location and receive information on the weather in their area including City name, current weather conditions, current temperature (in Celsius, Kelvin and Fahrenheit) and unique icons based on weather condition.

### Things to Keep in Mind
- If request for weather info is unsuccessful, return an error message
- Should be displayed in Mobile App format
- User should be allowed to keep entering new ZIP codes to get new weather data
- Try to reduce amount of times user needs to request data from API (pretend 0.25 cents per request)
- Keep in mind non-tech-savvy users for UI

### MoSCoW
Must Have
- Display input bar for user to put zip code in
- Have a button to submit what's in input bar
- Display location when given data
- Display Temperature in Celsius, Kelvin and Fahrenheit when given data
- Display weather condition when given data
- Display icon based on weather condition

Should Have
- parse user input to make sure it is a valid ZIP so it doesn't waste a request
- only show location, temperaute and condition display AFTER data is obtained
- accept user input after user presses Submit button OR presses ENTER on keyboard

Could Have
- accept user input after user submits valid ZIP code without having to press a button
- Display loading icon while requesting data



## Objects
1. Weather
    - When given a zip code, state should change to display weather conditions based on that zip code and the data retrieved from weather API
    - Should display error if had trouble getting data from API
    - Store weather condition, temperature and location in object

## Define Objects and Functions
State
    - INIT onLoad() ---> function to run when webpage is first loaded, should contain initial display with input bar and submit button
    - INIT onSubmit() ---> function to run when Submit button is pressed (or when ENTER key is pressed), should perform GET request with user input data
    - INIT newWeather() ---> function to run when data retrieved from API, should display location, temperature and weather condition from weather object
    - (OPTIONAL) INIT loading() ---> function to run while fetching data, should display loading bar

Weather{}
    - currentZip ---> user input zipCode, needs to be parsed to make sure it's a valid ZIP
    - currentWeather ---> assigned weather condition from weather.main in API
    - temperature ---> assigned temperature from main.temp in API
    - location ---> assigned location from city name in API
    - tempC ---> calculate temperature in Celsius from API data or get assigned form API data
    - tempF ---> calculate temperature in Fahrenheit from API data or get assigned from API data
    - icon ---> assigned icon from weather.icon in API