import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

//Cogemos los datos de nuestro smart contract
import {contractABI, contractAddress} from '../utils/constants';

//Creamos el contexto
export const TransactionContext = React.createContext();

//Acceso al objeto de ethereum, el cual coge desde el navegador a la hora de tener metamask funcionando
const {ethereum} = window;

//Cogemos el contrato
const getEthereumContract = () => {

    //Le pasamos por parámetro el objeto ethereum.
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
}

//Transferimos los datos necesarios para conectarse al blockchain
export const TransactionProvider = ({ children }) => {
    //Comprobamos si tiene una cuenta conectada y validamos que pueda cambiar de cuenta
    const [currentAccount, setCurrentAccount] = useState('');
    //Cogemos los datos del formulario
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    //Estado de esta cargando
    const [isLoading, setIsLoading] = useState(false);
    //Contador de transacciones que almacenamos en la memoria para que no se reinicie
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () =>{
        try{
            //Validamos si existe una cuenta de metamask y sino lanzo alerta
            if(!ethereum) return alert("Necesita instalar MetaMask");

            const accounts = await ethereum.request({method: 'eth_accounts'});

            //Si hay una wallet conectada la añado a la array de cuentas
            if(accounts.length){
                setCurrentAccount(accounts[0]);

                //getAllTransactions();
            }else{
                console.log("No hay cuentas");
            }

        }catch(error){
            console.log(error);
            
            throw new Error("No hay objeto de Ethereum"); 
        }
    }

    //Funcion para conectar a MetaMask
    const connectWallet = async () =>{
        try {
            if(!ethereum) return alert("Necesita instalar MetaMask");

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            
            throw new Error("No hay objeto de Ethereum"); 
        }
    }

    //Funcion para enviar una transacción
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Necesita instalar MetaMask");

            //Coge los datos del formulario y el contrato 
            const { addressTo, amount, keyword, message } = formData;
            //Asociamos nuestro contrato para poder utilizarlo
            const transactionsContract = getEthereumContract();
            //Parseamos las cantidades ya que se trabaja en hexadecimal a GWEI q es con lo q trabaja ethereum
            const parsedAmount = ethers.utils.parseEther(amount);

            //Enviamos los datos, ponemos la comision y cogemos los datos
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedAmount._hex,
                }],
              });
            
            //Guardamos la transaccion en el blockchain
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            //Mientras carga
            setIsLoading(true);
            console.log(`Cargando - ${transactionHash.hash}`);
            await transactionHash.wait();
            //Cuando ya ha cargada
            setIsLoading(false);
            console.log(`Terminado - ${transactionHash.hash}`);

            //Cogemos el contador de transacciones
            const transactionCount = await s.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
                
                throw new Error("No hay objeto de Ethereum"); 
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);

    return(
        //Pasamos los objetos al contexto para poder utilizarlo
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactionCount }}>
            {children}
        </TransactionContext.Provider>
    )
}