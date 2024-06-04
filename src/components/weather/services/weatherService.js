import axios from 'axios';

const API_KEY = '553ea0b140954113b0a131432240406'; // Replace with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeather = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}&lang=en`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
