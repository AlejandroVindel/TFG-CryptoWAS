import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from "./";
import { useDebugValue } from "react";
//Importamos la direccion abreviada
import { shortDireccion } from "../utils/shortDireccion";

//Variable que contiene estilos que reutilizaremos para las features del proyecto en los bloques dinámicos del className}
const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

//Input que reutilizo en el formulario
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  //Cogemos el valor del contexto
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);

  //Pasamos los datos del formulario
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    //Cancelamos que la pagina se recargue cuando enviamos el formulario
    e.preventDefault();

    //Si no hay datos en todos los campos no devolvemos nada
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Enviar Crypto <br /> por todo el mundo
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explora el mundo Crypto. Compra y vente Crypto de manera fácil en
            CRYPTOWAS
          </p>
          {/* Boton para conectar la wallet y validar si no hay una cuenta conectada*/}
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Conectar Wallet
              </p>
            </button>
          )}
          {/* Features de la aplicacion */}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Fiabilidad</div>
            <div className={commonStyles}> Seguridad</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}> Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}> Wallet</div>
            <div className={commonStyles}> Bajas Comisiones</div>
            <div className={`rounded-br-2xl ${commonStyles}`}> Blockchain</div>
          </div>
        </div>
        {/* Parte derecha de la página, conectar wallet */}
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          {/* Carta de Ethereum, añadida en el css */}
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  {/* Icono de ethereum de la tarjeta */}
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <div>
                  <BsInfoCircle fontSize={17} color="fff" />
                </div>
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {/* Cogemos la cuenta del usuario en el caso de que esté conectado */}
                  {shortDireccion(currentAccount)};
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          {/* Formulario de cartera */}
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {/* Mientras carga*/}
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Enviar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
