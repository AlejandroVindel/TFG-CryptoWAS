import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { shortDireccion } from '../utils/shortDireccion';
import useFetch from '../hooks/useFetch';

//Carta de transacciones la cual utilizo para mostrar las transacciones
const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
    // Cogemos la url del gif
    const gifUrl = useFetch({keyword});
    return(
        <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
            <div className="flex flex-col items-center 2-full mt-3">
                <div className="w-full mb-6 p-2">
                    {/* Introducimos las direcciones, URL en caso de que se clique sobre la carta reenviara al usuario al control de las transacciones desde la página oficial*/}
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">Enviado desde: {shortDireccion(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">Enviado a: {shortDireccion(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Cantidad: {amount} ETH</p>             
                    {/* Si hay un mensaje para la transaccion lo mostramos */}
                    {message && (
                        <>
                            <br/>
                            <p className="text-white text-base">Mensaje: {message}</p>
                        </>
                    )}
                </div>
                  {/* Introducimos el gif */}
                  <img src={gifUrl || url} alt="gif" className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover" />
                  <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                        <p className="text-[#37c7da] font-bold">{timestamp}</p>
                    </div>
            </div>
        </div>
    )
}

const Transactions = () =>{
    // Cogemos los datos de la cuenta actual conectada si existe
    const { currentAccount, transactions } = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {/* Últimas transacciones, if else dependiendo de si hay una cuenta conectada o no*/}
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">Últimas transacciones</h3>
                ):(
                    <h3 className="text-white text-3xl text-center my-2">Conecta tu cuenta para ver las últimas transacciones</h3>
                )}
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {/* Cogemos los datos, del último al primero y lo introducimos en la carta de transacciones */}
                    {transactions.reverse().map(( transacion, index ) =>(
                        <TransactionCard key={index} {...transacion}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;