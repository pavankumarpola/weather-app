import React, { useState } from 'react';
import './weather.css';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function getWeather() {
        setLoading(true);
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=627005cf2e7eabdf9c050eba6083918d&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                const weather = {
                    location: ` ${data.name}`,
                    temperature: `Temperature: ${data.main.temp}°C`,
                    humidity: `Humidity: ${data.main.humidity}%`,
                    condition: `Weather Condition: ${data.weather[0].description}`,
                    latitude: `Latitude is: ${data.coord.lat}`,
                    longitude: `Longitude is: ${data.coord.lon}`,
                    timezone: `timezone is : ${data.timezone}`
                };
                setWeatherInfo(weather);
                setError(null);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('Invalid City Name');
                setWeatherInfo(null);
                setLoading(false);
            });
    }

    return (
        <div>
            <h1>WEATHER REPORT</h1>
            <div className='pavan'>
                <input
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={getWeather}>Submit</button>
                {loading && (
                    <div className='loading'>
                        <img src='https://i.gifer.com/ZKZg.gif' alt='Loading' style={{ width: "15%" }} />
                    </div>
                )}
                {error && <div className='error'>{error}</div>}
                {weatherInfo && (
                    <div className='pola'>
                        <div className='row'>
                            <div className='col-6'>
                                <h3 style={{color:'gold', fontFamily:'Verdana', fontSize:'50px'}} className='pola'>{weatherInfo.location}</h3>
                                <img src='https://static.vecteezy.com/system/resources/previews/012/066/505/original/sunny-and-rainy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png' className='img' alt='Weather Icon'></img>
                            </div>
                            <div className='col-6 pt-3'>
                                <p>{weatherInfo.temperature}</p>
                                <p>{weatherInfo.humidity}</p>
                                <p>{weatherInfo.condition}</p>
                                <p>{weatherInfo.latitude}</p>
                                <p>{weatherInfo.longitude}</p>
                                <p>{weatherInfo.timezone}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
