import { useState, useEffect } from 'react';

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [area, setArea] = useState('')
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  
  const apiKey = "eb889a65b1d1b573579883315f022ec8";

  async function fetchWeather(latitude, longitude) {
    setLoad(true);
    setError('');

     function weatherUrl(latitude, longitude, area) {
      if (latitude && longitude) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      }
      return `https://api.openweathermap.org/data/2.5/weather?q=${area}&units=metric&appid=${apiKey}`;
    } 

    const url = weatherUrl(latitude, longitude, area);

    if(!url) {
      setError('No data available')
      setLoad(false);
      return;
    }
    setLoad(true);
    setError('')

    const response = await fetch(url);
    const data = await response.json();

    setWeatherData(data);
    setLoad(false); 

  }



  return (
    <>
      <span>
        <div style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </div>
        <input placeholder='Location...' type="text" />
      </span>
      {weatherData && !load && !error && (
        <div className="weather-data">
          <h2>Weather for the Day!</h2>
          <p>Location: {weatherData[0]?.name}, {weatherData[0]?.country}</p>
          <p>Latitude: {weatherData[0]?.lat}</p>
          <p>Longitude: {weatherData[0]?.lon}</p>
          {/* <p>Weather: {weather[0]?.weather[0]?.description}</p> */}
          {/* <p>Temperature: {weather[0]?.main?.temp}°C</p> */}
          {/* <p>Humidity: {weather[0]?.main?.humidity}%</p> */}
          {/* <p>Wind Speed: {weather[0]?.wind?.speed} m/s</p> */}
        </div>
      )}
    </>
  )
}

export default App

  // const [weather, setWeather] = useState([]);
  // const [lat, setLat] = useState(null);
  // const [long, setLong] = useState(null);

// Codes below only gave the location 
// async function fetchWeather() {
  //   const cnt = 1;

  //   const url = `http://api.openweathermap.org/data/2.5/weather?q=${lat}&lon=${long}&cnt=${cnt}&appid=${apiKey}`

  //   // const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${apiKey}`

    
  //       const res = await fetch(url);
  //       const data = await res.json();
        
  //       console.log(data);
  //       setWeatherData(data)
  //       setArea('')

  // }



  // async function FetchWeatherAuto(latitude, longitude) {

  //   if (latitude && longitude) {
  //     const limit = 1;

  //     const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${apiKey}`

  //     try {
  //       const res = await fetch(url);

  //       if (!res.ok) {
  //         throw new Error('Bad response')
  //       }

  //       const data = await res.json();
  //       console.log('API res:', data);
  //       setWeather(data);

  //     } catch (err) {
  //       setError(err.message)
  //       console.error(err)
  //     } finally {
  //       setload(false)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   async function location() {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLat(latitude);
  //         setLong(longitude);
  //         // console.log(FetchWeatherAuto(latitude, longitude));

  //       });
  //     } else {
  //       setload(false)
  //     }
  //   }
  //   location();

  // }, [])

  // useEffect(() => {
  //   if (lat && long) {
  //     FetchWeatherAuto(lat, long);
  //   }
  // }, [lat, long]);

  // useEffect(() => {
  //   if (weather) {
  //     console.log("Weather:", weather);
  //   }
  // }, [weather]);

  // useEffect(() => {

  //   async function FetchWeatherAuto(latitude, longitude) {

  //     if (latitude && longitude) {
  //       const limit = 1;
  //       const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${apiKey}`

  //       try {
  //         const res = await fetch(url);

  //         if (!res.ok) {
  //           throw new Error('Bad response')
  //         }

  //         const data = await res.json();
  //         setWeather(data);

  //       } catch (err) {
  //         setError(err.msg)
  //         console.error(err)
  //       } finally {
  //         setload(false)
  //       }
  //     }
  //   }
  //   if(lat && long){
  //   FetchWeatherAuto(lat, long)
  //   console.log(FetchWeatherAuto(lat, long))
  //   }
  // }, [lat, long]);

  // function locationIcon(props) {
  //   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={preprocessCSS.className} viewBox="0 0 16 16">
  //     <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
  //     <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
  //   </svg>
  // }

  // function handleIconClick() {

  // }
  // console.log('Weather:', weather);
  // console.log('Load:', load);
  // console.log('Error:', error);