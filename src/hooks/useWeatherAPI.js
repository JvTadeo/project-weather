import {useState, useEffect} from 'react'

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const useWeatherAPI = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

const getWeatherData = async (city) => {
    try {
        const url = `${apiUrl}?key=${apiKey}&q=${city}&lang=en`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const jsonData = await response.json();
        setWeatherData(jsonData);
        setErrorMessage("");
    } catch (error) {
        //console.error('Erro(Meu):', error.message);
        setErrorMessage("Cidade não encontrada");
    }
}

  return ({weatherData, errorMessage, getWeatherData})
}

export default useWeatherAPI
