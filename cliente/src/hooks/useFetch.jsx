// Renderizamos los gifs
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      // Cogemos la url que utilizaremos. Buscada en la documentacion de Giphy
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { datos } = await response.json();

      setGifUrl(datos[0]?.images?.downsized_medium?.url);
    } catch (error) {
      // En el caso de que el gif introducido sea erróneo introduciremos uno
      setGifUrl(
        "https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif"
      );
    }
  };

  // Si hay un gif llamamos a la funcion
  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};
export default useFetch;
