import { useState, useEffect } from 'react';
import CurrentLocation from './components/currentLocation'
import CurrentWeather from './components/currentWeather'
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
    setError('');

    const response = await fetch(url);
    const data = await response.json();

    setWeatherData(data);
    setLoad(false); 
  }

  useEffect(() => {
    async function location() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              fetchWeather(latitude, longitude);
            }
          )
          } else {
            setError('Location not available')
            setLoad(false)
          }
        }
        location();
  }, [])

  function handleChange(e) {
    setArea(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(area) {
      fetchWeather(null, null);
    }
  }

  function fahrenheitData (celsius) {
    return (celsius * 9) / 5 + 32;
  } 
  
  console.log(weatherData)

  function formatTime(timestamp, timezoneOffset) {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <>
    
        <div>
        {weatherData && !load && !error ? (
          <>
          <div className='currentLocation'>
            <CurrentLocation/>
            <CurrentWeather/>
          </div>
          <br />
          <form onSubmit={handleSubmit} >
            <input placeholder='Location...' type="text" value={area} onChange={handleChange} />
            <button type="submit">search</button>
          </form>
          </>
         ) : null}
        </div>
        
        <br />

      {weatherData && !load && !error && (
        <div className="weatherData">
          <h2>Weather for {weatherData.name}!</h2>
          <div className='columns'>
            <span className='left'>
              <h3>City: </h3>
              <h3>Description: </h3> 
              <h3>Temperature: </h3>
              <h3>Feels like: </h3>
              <h3>Humidity: </h3>
              <h3>Wind: </h3>
              <h3>Sunrise: </h3>
              <h3>Sunset: </h3>

            </span>
            <span className='right'>
              <p>{weatherData.name}</p>
              <p>{weatherData.weather[0].description}</p>
              <p>{weatherData?.main?.temp ? fahrenheitData(weatherData.main.temp).toFixed(1) : 'Unable to retrieve data'} °F</p>
              <p>{weatherData.main.feels_like}</p>
              <p>{weatherData.main.humidity}%</p>
              <p>{weatherData.wind.speed} mph</p>
              <p>{formatTime(weatherData.sys.sunrise, weatherData.timezone)}</p>
              <p>{formatTime(weatherData.sys.sunset, weatherData.timezone)}</p>

              
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default App

        {/* <div style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </div> */}


  // const [weather, setWeather] = useState([]);


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