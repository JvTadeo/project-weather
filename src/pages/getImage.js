import React, { useEffect, useState } from 'react';

const apiAcessKeyUnplash = process.env.REACT_APP_API_ACCESSKEY;
const apiUrlUnsplash = process.env.REACT_APP_API_URL_UNSPLASH;

const GetImage = ({query}) => {

    const [image, setImage] = useState('');

    const getSearchImage = async (query) => {
        try{
            if(!query) return;

            const queryUrl = `${apiUrlUnsplash}query=${query}&client_id=${apiAcessKeyUnplash}&lang=pt`;
            const response = await fetch(queryUrl);
            const jsonData = await response.json();
            setImage(jsonData.results[0]?.urls?.regular);
            console.log(image);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getSearchImage(query);
    }, [query]);
  return (
    <div>
         {image && <img src={image} alt="Imagem" />}
    </div>
  )
}

export default GetImage