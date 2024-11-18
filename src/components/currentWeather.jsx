import { useState, useEffect } from 'react';

export default function CurrentWeather() {
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
  
      if (!url) {
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
  
    function fahrenheitData(celsius) {
      return (celsius * 9) / 5 + 32;
    }
  
    return (
      <>
        <div>
          {weatherData && !load && !error ? (
            <>
              <div>
                <h2>{weatherData.main && weatherData.main.temp ? fahrenheitData(weatherData.main.temp).toFixed(1) : 'Unable to retrieve data'} °F</h2>
                <p>{weatherData.main && weatherData.main.temp_max ? fahrenheitData(weatherData.main.temp_max).toFixed(1) : 'Unable to retrieve data'} °F / {weatherData.main && weatherData.main.temp_min ? fahrenheitData(weatherData.main.temp_min).toFixed(1) : 'Unable to retrieve data'} °F</p>
              </div>
            </>
          ) : null}
        </div>
      </>
    )
}