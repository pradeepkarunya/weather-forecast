import React, { useState, useEffect } from 'react';
import { getWeather } from './services/weatherService';
import { useDebounce } from '../../utils/useDebounce';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const debouncedLocation = useDebounce(location, 500);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (location !== '') {
                    const data = await getWeather(debouncedLocation);
                    setWeather(data);
                }
            } catch (err) {
                setError('Failed to fetch weather data');
            }
        };

        if(debouncedLocation) fetchWeather();
    }, [debouncedLocation]);

    return (
        <div>
            <h1>Weather Report</h1>
            <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Enter location"
            />
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <p>Location: {weather.location.name}</p>
                    <p>Country: {weather.location.country}</p>
                    <p>Time Currently in that Location: {weather.location.localtime}</p>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Condition: {weather.current.condition.text}</p>
                    <img src={weather.current.condition.icon} alt="Weather icon" />
                </div>
            )}
        </div>
    );
};

export default Weather;