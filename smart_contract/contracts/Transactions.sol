//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {

    //Contador del número de transacciones que se realizan con este contrato
    uint256 contadorTransacciones;

    //Funcion que registrará las transacciones de nuestro contrato
     event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    //Objeto de una transferencia
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    //Array en la que guardo las transacciones
    TransferStruct[] transactions;

    //Añadimos la operacion al blockchain
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        contadorTransacciones +=1;

        /*Usamos el método push para añadir la transaccion a la array, cogemos paramétros de msg ya que es la memoria de la transaccion
        Cogemos la fecha de la memoria del bloque, así no se puede editar*/
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        //Subimos la transferencia
       emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    //Devuelve las transacciones
    function getAllTransactions() public view returns(TransferStruct[] memory){

        return transactions;
    }

    //Devuelve el numero de transacciones realizadas
    function getTransactionCount() public view returns(uint256){

        return contadorTransacciones;
    }
}