import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getWeather } from '../services/weatherService';
import { useDebounce } from '../../../utils/useDebounce';

const WeatherUpdates = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedLocation]);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Enter Location"
                    onChange={(e)=>setLocation(e.target.value)}
                />
            </div>
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
        </Box>
    )
};

export default WeatherUpdates;