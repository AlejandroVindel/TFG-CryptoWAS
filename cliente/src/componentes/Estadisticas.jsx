import React, { useState, useEffect } from "react";
import millify from "millify";
//Importamos la query para obtener los datos de las criptomonedas
import { useGetCryptosQuery } from "../services/cryptoApi";
//Importamos iconos para utilizar en las cartas de las estadisticas
import {
  GiAbstract030,
  Gi3DGlasses,
  GiAmplitude,
  GiArmorDowngrade,
  GiArrowWings,
} from "react-icons/gi";
//Importamos el loader
import Loader from '../componentes/Loader';

//Carta de servicios, para reutilizarlo
const ServicesCard = ({ color, tittle, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      <img src={icon} />
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-white text-lg">{tittle}</h1>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);
//Carta de servicios con la cual mostraremos iconos
const ServicesCardIcons = ({ color, tittle, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-white text-lg">{tittle}</h1>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Estadisticas = ({ simplified }) => {
  //Contador para mostrar las monedas
  const count = simplified ? 10 : 100;

  //Cogemos los datos de las criptomonedas
  const { data, isFetching } = useGetCryptosQuery(5);
  // Creamos una variables donde guardamos los
  const globalStats = data?.data?.stats;

  // //Cogemos la lista de las criptomonedas para el top de las criptomonedas
  const { lista: cryptoList, isFetching2 } = useGetCryptosQuery(count);
  const cryptos = data?.data?.coins;

  //Buscador
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {}, [cryptos, searchTerm]);

  if (isFetching) return <Loader/>;

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Estadísticas de Cryptomonedas
          </h1>

          <div className="flex-1 flex flex-col justify-start items-right">
            {/* Cogemos los valores de las criptomonedas reales y las mostramos en la página, utilizaremos millify para hacer los valores mas leibles*/}
            <ServicesCardIcons
              color="bg-[#8000FF]"
              tittle="Total Cryptocurrencias"
              icon={<GiAbstract030 fontSize={21} className="text-white" />}
              subtitle={globalStats.total}
            />
            <ServicesCardIcons
              color="bg-[#83FF33]"
              tittle="Total Exchanges"
              icon={<Gi3DGlasses fontSize={21} className="text-white" />}
              subtitle={millify(globalStats.totalExchanges)}
            />
            <ServicesCardIcons
              color="bg-[#FF7733]"
              tittle="Total Market Cap"
              icon={<GiAmplitude fontSize={21} className="text-white" />}
              subtitle={millify(globalStats.totalMarketCap)}
            />
            <ServicesCardIcons
              color="bg-[#3334FF]"
              tittle="Volumen total 24h"
              icon={<GiArmorDowngrade fontSize={21} className="text-white" />}
              subtitle={millify(globalStats.total24hVolume)}
            />
            <ServicesCardIcons
              color="bg-[#C70039]"
              tittle="Total Mercados"
              icon={<GiArrowWings fontSize={21} className="text-white" />}
              subtitle={millify(globalStats.totalMarkets)}
            />
          </div>
          {/* Mostramos el top 5 de critpomonedas */}
          <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Top 5 Criptomonedas
              </h1>
              <div className="flex-1 flex flex-col justify-start items-right">
                {cryptos?.map((currency) => (
                  <ServicesCard
                    color={currency.color}
                    tittle={`${currency.rank}. ${currency.name}`}
                    icon={currency.iconUrl}
                    subtitle={`Precio: ${millify(currency.price)}
                                                Market Cap: ${millify(
                                                  currency.marketCap
                                                )}
                                                Daily Change: ${millify(
                                                  currency.change
                                                )}%
                                                `}
                    key={currency.uuid}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
