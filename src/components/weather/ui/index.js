import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getWeather } from '../services/weatherService';
import { useDebounce } from '../../../utils/useDebounce';
import WeatherCard from './weatherCard';

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
            
            autoComplete="off"
        >
            <div>
                <TextField
                    style = {{width: 280}}
                    required
                    helperText="Enter Location to know Weather Details"
                    id="outlined-required"
                    onChange={(e)=>setLocation(e.target.value)}
                />
            </div>
            {!weather && error && <p>{error}</p>}
            {weather &&  <WeatherCard 
                location={weather.location.name}
                country={weather.location.country}
                time={weather.location.localtime}
                temperature={weather.current.temp_c}
                condition={weather.current.condition.text}
                icon={weather.current.condition.icon}
                weather={weather}
            />}
        </Box>
    )
};

export default WeatherUpdates;