import React, { useEffect, useState } from 'react';

const apiAcessKeyUnplash = process.env.REACT_APP_API_ACCESSKEY;
const apiUrlUnsplash = process.env.REACT_APP_API_URL_UNSPLASH;

const useImageAPI = () => {
    const [image, setImage] = useState('');

    const getImage = async (cityName) => {
        try{
            if(!cityName) return;
            const queryUrl = `${apiUrlUnsplash}query=${cityName}&client_id=${apiAcessKeyUnplash}&lang=en`;
            const response = await fetch(queryUrl);
            const jsonData = await response.json();
            setImage(jsonData.results[0]?.urls?.regular);        
        } catch(error){
            console.log("Erro", error);
        }
    }

  return ({getImage, image})
}

export default useImageAPI
