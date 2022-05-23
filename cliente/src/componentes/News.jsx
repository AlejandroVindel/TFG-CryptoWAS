import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
//Importamos el servicio que nos ofrece las noticias
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

//Imagen de demo por si la noticia no lleva una imagen agregada
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

//Carta de servicios, para reutilizarlo
const ServicesCard = ({ color, tittle, icon, subtitle, proovedor, nombreProovedor, url }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-30 h-20 rounded-full flex justify-center items-center ${color}`}>
      <img src={icon}/>
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-white text-lg">{tittle}</h1>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
      <img src={proovedor} className='w-10 h-10'/>
      <p className="mt-2 text-white text-sm md:w-9/12">{nombreProovedor}</p>
    </div>
  </div>
);

const News = ({ simplified }) => {
  //Cogemos los datos de las noticias
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });

  //Validamos que haya datos y sino devolvemos un cargando
  if (!cryptoNews?.value) return "Loading...";

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Noticias
          </h1>

            {cryptoNews.value.map((news, i) => (
              <ServicesCard
              color='bg-[#83FF33]'
              tittle={`${news.name}`}
              icon={news?.image?.thumbnail?.contentUrl || demoImage}
              subtitle={news.description.length > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description
              }
              proovedor={news.provider[0]?.image?.thumbnail?.contentUrl ||
              demoImage}
              nombreProovedor={news.provider[0]?.name}
              url={news.url}
              key={i}
            />
            ))}
          </div> 
        </div>
    </div>
  );
};

export default News;
