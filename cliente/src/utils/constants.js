//Json que genera la primera vez que se realiza una operacion con el smart contract
import abi from './Transactions.json';

//Cogemos el abi que se ha generado que tenemos en el json
export const contractABI = abi.abi;
//Cogemos la direccion de transferencia que se genera la primera vez que probamos el smart contract
export const contractAddress = '0x23e2F2BB2E930E3Daf2415b96081FF5DD8C45F1D';