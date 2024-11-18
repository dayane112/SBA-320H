import { useState, useEffect } from 'react';

export default function CurrentLocation() {
  const [weather, setWeather] = useState([]);
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
        console.log('API res:', data);
        setWeather(data);

      } catch (err) {
        setError(err.message)
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
          // console.log(FetchWeatherAuto(latitude, longitude));

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

  return (
    <>
      {weather && !load && !error && (
        <div className="weather-data">
          <h2>Weather of the Day for {weather[0]?.name}, {weather[0]?.country}!</h2>
        </div>
      )}
    </>
  )
}



// async function currentLocation(fetchWeather) {
//     const [lat, setLat] = useState(null);
//     const [long, setLong] = useState(null);
//     const [currentLocation, setCurrentLocation] = useState('');

//     const apiKey = "eb889a65b1d1b573579883315f022ec8";

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(async (position) => {
//             const { latitude, longitude } = position.coords;
//             setLat(latitude);
//             setLong(longitude);

//             const reverseGeocodeUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
//             const res = await fetch(reverseGeocodeUrl);
//             const data = await res.json();


//             setCurrentLocation(data.name);

//             fetchWeather(latitude, longitude);
//         });
//     } else {
//         setError('Location not available');
//     }

//     useEffect(() => {

//         currentLocation(setLat, setLong, setCurrentLocation, fetchWeather);
//       }, []);
// }

// export default currentLocation