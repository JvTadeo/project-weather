import React, {useState} from 'react';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const Weather = () => {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);


    const getSearchCity = async (url) => {
        try{
            const response = await fetch(url);
            const jsonData = await response.json();
            setWeatherData(jsonData);
        } catch(error){
            console.log(error);
        }
    }

    const handleSearch = () => {
        const searchWithQuery = `${apiUrl}?key=${apiKey}&q=${city}`;
        getSearchCity(searchWithQuery);
        console.log(weatherData);
    }

  return (
    <div>
        <input type='text' value={city} onChange={(e) => setCity(e.target.value)}/>
        <button onClick={handleSearch}>Pesquisar</button> 
        {weatherData && (
            <div>
                <h2>Temos Dados</h2>
                <p>{weatherData.location.name}</p>
                <p>{weatherData.current.temp_c}ºC</p>
                <img src={weatherData.current.condition.icon}/>
            </div>
        )}
    </div>
  )
}

export default Weather