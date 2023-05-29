import React, {useState} from 'react';
import GetImage from './getImage';
import styles from './Weather.module.css';
import { MdLocationOn } from "react-icons/md";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const Weather = () => {

    const [city, setCity] = useState('');
    const [searchCity, setsearchCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const getSearchCity = async (url) => {
        try{           
            const response = await fetch(url);

            if(!response.ok){
                throw new Error(response.status);                                
            }

            const jsonData = await response.json();
            setsearchCity(city);
            setWeatherData(jsonData);
            setLoading(false);            
            setErrorMessage('');

        } catch(error){
            //console.error('Erro(Meu):', error.message);
            setErrorMessage("Cidade não encontrada");
            setLoading(false);
        }
    }

    const handleSearch = () => {
        if(city === '')return;        
        setLoading(true);
        const searchWithQuery = `${apiUrl}?key=${apiKey}&q=${city}`;
        getSearchCity(searchWithQuery);
    }
  return (
    <div className={styles.weatherContent}>
        <div className={styles.inputWeather}>
            <input type='text' value={city} onChange={(e) => setCity(e.target.value)}/>
            <button onClick={handleSearch}>
                <MdLocationOn/>
            </button> 
        </div>
        {loading &&(
            <div className={styles.loading}></div>
        )}
        {weatherData && loading === false && !errorMessage ? (
            <div className={styles.cardInfo}>
                <GetImage query={searchCity}/>
                <h2>{weatherData.location.name}</h2>
                <div className={styles.spaceDiv}></div>
                <div className={styles.iconWeather} >
                    <p>{weatherData.current.temp_c}ºC</p>
                    <img src={weatherData.current.condition.icon}/>
                </div>
            </div>
        ): null }
        {errorMessage && (
            <div>
                <p className={styles.alert}>Cidade não encontrada</p>
            </div>
        )}
    </div>
  )
}

export default Weather