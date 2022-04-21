import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

//Cogemos los datos de nuestro smart contract
import {contractABI, contractAddress} from '../utils/constants';
import { BsWindowSidebar } from 'react-icons/bs';

//Creamos el contexto
export const TransactionContext = React.createContext();

//Acceso al objeto de ethereum, el cual coge desde el navegador a la hora de tener metamask funcionando
const { ethereum } = window;

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
    //Cogemos los datos del formulario
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: ""});

    //Comprobamos si tiene una cuenta conectada y validamos que pueda cambiar de cuenta
    const [currentAccount, setCurrentAccount] = useState("");
    
    //Estado de esta cargando
    const [isLoading, setIsLoading] = useState(false);
    //Contador de transacciones que almacenamos en la memoria para que no se reinicie
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);


    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Necesita instalar MetaMask");

            const transactionsContract = getEthereumContract();

            //Llamamos a la funcion de devolver todas las transacciones de nuestro smart contract
            const availableTransactions = await transactionsContract.getAllTransactions();

            //Realizamos la estructura de las transacciones para despues mostrarlas.
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));

            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
            
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try{
            //Validamos si existe una cuenta de metamask y sino lanzo alerta
            if(!ethereum) return alert("Necesita instalar MetaMask");

            const accounts = await ethereum.request({method: 'eth_accounts'});

            //Si hay una wallet conectada la añado a la array de cuentas
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                //Obtenemos todas las transacciones
                getAllTransactions();
            }else{
                console.log("No hay cuentas");
            }

        }catch(error){
            console.log(error);
            
            throw new Error("No hay objeto de Ethereum"); 
        }
    }

    //Comprobamos que existan transacciones para mostrarlas
    const checkIfTransactionsExist = async() => {
        try {
            //Cogemos el contract
            const transactionsContract = getEthereumContract();
            const transactionCount = await transactionsContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
            
        } catch (error) {
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
            const transactionCount = await transactionsContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

            window.reload();

        } catch (error) {
            console.log(error);
                
                throw new Error("No hay objeto de Ethereum"); 
        }
    }

    //Llamamos a los métodos una vez se utilice el contexto, al cargar la página
    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[]);

    return(
        //Pasamos los objetos al contexto para poder utilizarlo
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactionCount, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    );
};