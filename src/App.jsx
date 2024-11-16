import { useState, useEffect } from 'react';

import './App.css'

function App() {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [load, setload] = useState(true)


  const apiKey = "eb889a65b1d1b573579883315f022ec8";

  useEffect(() => {


    async function FetchWeather(latitude, longitude) {

      const limit = 1;

      try {
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=${limit}&appid=${apiKey}`);

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err)
      } finally {
        setload(false)
      }

    function location() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{

        })
      }
    }

      
    }

    console.log(FetchWeather())
  }, []);




  return (
    <>

    </>
  )
}

export default App
