import { useState, useEffect } from 'react';

import './App.css'

function App() {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [load, setload] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "eb889a65b1d1b573579883315f022ec8";

  async function FetchWeatherAuto(latitude, longitude) {

    if (latitude && longitude) {
      const limit = 1;
      const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${apiKey}`

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Bad response')
        }

        const data = await res.json();
        setWeather(data);

      } catch (err) {
        setError(err.msg)
        console.error(err)
      } finally {
        setload(false)
      }
    }
  }

  useEffect(() => {
    async function location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLong(longitude);
          // FetchWeatherAuto(latitude, longitude);

        });
      } else {
        setload(false)
      }
    }
    location();

  }, [])

  useEffect(() => {
    if (lat && long) {
      FetchWeatherAuto(lat, long);
    }
  }, [lat, long]);

  useEffect(() => {
    if (weather) {
      console.log("Weather:", weather); 
    }
  }, [weather]);

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
    </>
  )
}

export default App
