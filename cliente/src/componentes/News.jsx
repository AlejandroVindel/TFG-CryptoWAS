import React from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import moment from "moment";
import Loader from "../componentes/Loader";

//Carta de servicios, para reutilizarlo
const ServicesCard = ({
  color,
  tittle,
  icon,
  subtitle,
  proovedor,
  nombreProovedor,
  enlace,
}) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2  hover:shadow-xl">
    <div
      className={`w-30 h-20 rounded-full flex justify-center items-center ${color}`}
    >
      <img src={icon} className="w-30 h-30 rounded-full" />
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-white text-lg">{tittle}</h1>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
      <a
        className="mt-2 text-white text-sm md:w-9/12"
        target="_blank"
        href={enlace}
      >
        Enlace a la noticia
      </a>
    </div>
    <div className="flex-end">
      <img src={proovedor} className="w-10 h-10 rounded-full flex-end" />
      <p className="text-white flex-end">{nombreProovedor}</p>
    </div>
  </div>
);

const News = ({ simplified }) => {
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  //Cogemos los datos de las noticias
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });

  //Si no tiene datos devolvemos un cargando
  if (!cryptoNews?.value) return <Loader />;

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Noticias
          </h1>
          <div className="flex-1 flex flex-col justify-start items-right">
            {/* Mapeamos las noticias y las mostramos en la página */}
            {cryptoNews?.value.map((news, i) => (
              <ServicesCard
                color="#FFFFFF"
                tittle={`${news.name}`}
                icon={news?.image?.thumbnail?.contentUrl || demoImage}
                subtitle={
                  news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description
                }
                proovedor={
                  news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                }
                nombreProovedor={news.provider[0]?.name}
                enlace={news.url}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
