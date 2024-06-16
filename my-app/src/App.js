// import component from react so that we can use state which changes over a time
import { Component } from "react";

// import dark mode and light mode icon from react icons
import { CgDarkMode } from "react-icons/cg";
import { MdLightMode } from "react-icons/md";

// import images used for degsining for reference we can refer to the name of icon
import search_icon from './Assets/search.png'
import cloud_icon from './Assets/cloud.png'
import humidity_icon from './Assets/humidity.png'
import wind_icon from './Assets/wind.png'
import clear_icon from './Assets/clear.png'
import rain_icon from './Assets/rain.png'
import snow_icon from './Assets/snow.png'
import drizzle_icon from './Assets/drizzle.png'

// importing css functionality to design the app
import './App.css'

// so the data foolows some code for weather condition so it will help to provide valid image
// according to weather
const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "50d": drizzle_icon,
    "50n": drizzle_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }
  

class App extends Component {
  // here maintain the state object, like weatherData for storing weather data for a specific city
  // searchInput is used to control the input from the user, it can be city name or zip code
  // darkMode is used changing theme of app from light to dark and vice-versa
  // dateAndTime is storing current date and time by using toLocalString function
  state = {
    weatherData: {},
    searchInput: 'Delhi',
    darkMode: false,
    dateAndTime: new Date().toLocaleString()
  }
  // onChangeMode function is used change light to dark mode by using setState when user click on the icon
  onChangeMode = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

// here we store search input from the user
  onUserInput = event => {
    this.setState({searchInput: event.target.value})
  }

/* when user click on icon onSearch this function is triggerd, it is used fetch data using openweathermap api and
also providing some functionality like whether user provide empty input then we provide alert and same for 
invalid city name or zip code, moreover here we store weather data by using setState in waetherData,
and updating current date and time */
  onSearch = async() => {
    const {searchInput} = this.state
    if(searchInput === ''){
      alert("Please Enter City Name")
    } else {
      try {
        // the ApiKey for fetching data from Openwheathermap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=c41d46b4d9a52682a2bdbed0907667d1`
        const response = await fetch(url)
        const data = await response.json()
        if(!response.ok){
          alert("Please Enter Valid City Name")
        }
        console.log(data)
        this.setState({ weatherData: {
          humidity: data.main.humidity,
          temperature: Math.floor(data.main.temp),
          windspeed: data.wind.speed,
          icon: allIcons[data.weather[0].icon],
          description: data.weather[0].main,
          location: data.name,
      }, searchInput: '', dateAndTime: new Date().toLocaleString()},)
    } catch(error){
      console.log(error)
    }
  }
  }
 // it is lifecyclemethod of react used for getting data from api for first render
  componentDidMount(){
    this.onSearch()
    this.setState({searchInput: '', dateAndTime: new Date().toLocaleString()})
  }

  render(){
    // here we access state data to use in UI
    const {weatherData, searchInput, dateAndTime, darkMode} = this.state
    return(
      /* app-container a parent container also by using ternary operator we provide defferent background colors for
        light as well as dark mode by using onChangeMode function*/
        <div className={darkMode ? 'app-conatiner app-conatiner-dark-mode' : 'app-conatiner'}>
          <div className={darkMode ? 'header  header-dark-mode' : 'header'}>
            <h1>Weather Conditions </h1>
            {darkMode ? (<MdLightMode className="theme-icon" onClick={this.onChangeMode} size={30} />) : (<CgDarkMode  className="theme-icon" onClick={this.onChangeMode} size={30} />)}
          </div>
          <div className={darkMode ? 'weather-details-container weather-details-container-dark-mode' : 'weather-details-container'}>
            <div className='search-bar-container'>
              <input type='search' className='search-input' placeholder="Enter City Name or Pin Code" value={searchInput} onChange={this.onUserInput} />
              <img className="search-icon" src={search_icon} onClick={this.onSearch} alt="" />
            </div>
            <div className="city-and-date-container">
              <div>
              <p className="location">{weatherData.location}</p>
              <p className="update-desc">Update few minutes ago</p>
              </div>
              <p className="date-time">{dateAndTime}</p>
            </div>
            <div className="weather-condition-container">
              <img className="weather-condition-icon" src={weatherData.icon} alt="" />
              <div>
                <p><span className="temp">{weatherData.temperature}</span>&deg; C</p>
                <p>{weatherData.description}</p>
              </div>
            </div>
            <div className='wether-data-container'>
                <div className='details-container'>
                  <img className="weather-icon" src={humidity_icon} alt="" />
                  <div>
                    <p>{weatherData.humidity} %</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className='details-container'>
                  <img className="weather-icon" src={wind_icon} alt="" />
                  <div>
                    <p>{weatherData.windspeed} KMPH</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
    )
  }
}

// here we use export default, when we want to export single component

export default App;
