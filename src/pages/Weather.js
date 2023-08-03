import React, {useState} from 'react';
//Hooks
import useWeatherAPI from '../hooks/useWeatherAPI';
import useImageAPI from '../hooks/useImageAPI';
//Icons
import sunrise from '../assets/imgs/sunrise_96.png'
import sunset from '../assets/imgs/sunset_96.png'
import moonrise from '../assets/imgs/moonrise-96.png'
import moonset from '../assets/imgs/moonset-96.png'

const Weather = () => {

    const [city, setCity] = useState('');    
    const [loading, setLoading] = useState(false);
    const {weatherData, errorMessage, getWeatherData} = useWeatherAPI();
    const {getImage, image} = useImageAPI()

    const handleSearch = async () => {
        try{
            setLoading(true)
            if(city === '') return;

            await getWeatherData(city);
            await getImage(city);
            console.log(weatherData);
            setLoading(false);
            console.log(loading);
        } catch (error){
            setLoading(false);
            console.log(error);
        }
    }
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#16181F]">
        <div className="flex items-center justify-center bg-[#BBBBBB] w-3/4 h-3/4 p-2 rounded-lg md:w-2/6 md:p-6">
            <input className="rounded-lg w-full p-2 outline-none" type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='Search a city....'/>
            <button onClick={handleSearch} className='ml-[-40px] rounded-lg p-1 bg-white text-[#457B9D]'>    
                <svg className="text-white" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3_6)">
                    <path d="M20.6667 18.6667H19.6133L19.24 18.3067C20.84 16.44 21.6667 13.8933 21.2133 11.1867C20.5867 7.48 17.4933 4.52 13.76 4.06667C8.12001 3.37333 3.37334 8.12 4.06668 13.76C4.52001 17.4933 7.48001 20.5867 11.1867 21.2133C13.8933 21.6667 16.44 20.84 18.3067 19.24L18.6667 19.6133V20.6667L24.3333 26.3333C24.88 26.88 25.7733 26.88 26.32 26.3333C26.8667 25.7867 26.8667 24.8933 26.32 24.3467L20.6667 18.6667ZM12.6667 18.6667C9.34668 18.6667 6.66668 15.9867 6.66668 12.6667C6.66668 9.34667 9.34668 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z" fill="black"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_3_6">
                    <rect width="32" height="32" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>        
            </button> 
        </div>
        {loading &&(
            <div className="m-5">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>                    
                </div>
            </div>
        )}
        {weatherData && loading === false && !errorMessage ? (
            <div className="flex flex-col justify-center items-center w-3/4  md:flow-row my-8 rounded-[32px] bg-white md:h-2/6 md:w-2/6 md:grid md:grid-cols-3">
                    <div className='flex flex-col h-full items-center justify-center font-roboto gap-1'>
                        <img src={weatherData.current.condition.icon}/>
                        <p className='text-2xl'>{weatherData.current.temp_c}ºC</p>
                        <h2 className='font-medium text-2xl'>{weatherData.location.name}</h2>
                        <p className='font-light text-lg'>{weatherData.current.condition.text}</p>
                    </div>                                  
                    <div className="flex flex-col items-center text-center font-light text-sm gap-4 md:grid md:grid-cols-2 md:items-center md:justify-center md:py-2">
                        <div className='md:flex md:flex-col md:items-center md:justify-center'>
                            <img className="md:h-16 md:w-16" src={sunrise}></img>
                            <p>{weatherData.forecast.forecastday[0].astro.sunrise}</p>
                            <p>Sunrise</p>
                        </div>
                        <div className='md:flex md:flex-col md:items-center md:justify-center'>
                            <img className="md:h-16 md:w-16" src={sunset}></img>
                            <p>{weatherData.forecast.forecastday[0].astro.sunset}</p>
                            <p>Sunset</p>
                        </div>
                        <div className='md:flex md:flex-col md:items-center md:justify-center'>
                            <img className="md:h-16 md:w-16" src={moonrise}></img>
                            <p>{weatherData.forecast.forecastday[0].astro.moonrise}</p>
                            <p>Moonrise</p>
                        </div>
                        <div className='md:flex md:flex-col md:items-center md:justify-center'>
                            <img className="md:h-16 md:w-16" src={moonset}></img>
                            <p>{weatherData.forecast.forecastday[0].astro.moonset}</p>
                            <p>Moonset</p>
                        </div>
                    </div>
                <div className="w-full h-full mt-4 md:mt-0 md:w-3/4 md:h-3/4 md:flex md:items-center md:justify-self-center">
                    <img className="object-cover h-full rounded-bl-[32px] rounded-br-[32px] md:rounded-lg" src={image} alt="Imagem"></img>                
                </div>                
            </div>
        ): null }
        {errorMessage && (
            <div>
                <p className="m-5 text-red-400">City not found.</p>
            </div>
        )}
    </div>
  )
}

export default Weather