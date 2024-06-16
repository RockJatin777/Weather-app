1. This is a weather app where react js technology is used and used library like react-icons
and this web app created by using 'npx create-react-app my-app'

2. You need to just need to clone the repository and run 'npm start' to run the project locally

3. There is a Asset component where all the images and icons stored like cloud images, search icon etc

4. moreover In App.js file, whole code structured using class component and maintain state for use functionalities
   a. darkMode is used to store boolean value
   b. weatherData where all data would saved
   c. searchInput is used to control input from the user
   d. dateAndTime is used to store current date and time

5. onChangeMode function is used when use click on the icon and it will change the theme by using ternary operator,
   provide defference className to change the by accessing darkMode from the state

6. onUserInput fuction is used to store user input by using setState method

7. onSearch fuction is used when user click to search icon
   a. if user doesn't fill city name or zip code, be provide alert for feedback to enter the city name or zip code
   b. if user fills invalid city name or zip code, be provide alert for feedback to enter the valid city name or zip code
   c. moreover store weather data in weatherData by using setState method using open weathermap api we fetch data
  
8. componentDidMount is used to initial render curent city  weather details by using onSearch function

9. after that in render we access state values and write html code for ui
    
10. then export app by using export default

11. In app.css file we maintain css styling to desing the UI by using classNames provided in app.js files also media queries is used to make responsiveness of the web app

12. you can visit the web app https://weather-app-theta-five-11.vercel.app/
