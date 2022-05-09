import React from 'react';
import ReactDOM from 'react-dom';
//Importamos el proovedor de nuestros datos de estadisticas
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
//Importamos el transaction provider, de esta manera toda la app puede tener acceso
import {TransactionProvider} from './context/TransactionContext';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
// Importamos el almacenamiento de nuestra app para recoger los datos
import store from './app/store';

ReactDOM.render(
  <TransactionProvider>
    <Provider store={store}> 
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </Provider> ,
  </TransactionProvider>,
  document.getElementById('root')
);