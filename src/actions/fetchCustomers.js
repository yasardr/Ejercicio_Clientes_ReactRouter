import { FETCH_CUSTOMERS } from './../constants'
import { createAction } from 'redux-actions';
import { apiGet } from './../api';
import { urlCustomers } from './../api/urls';

//Toma como parametros el nombre de la accion y el payload como segundo a traves de una promise que obtiene el fetch (gracias al middlware redux-promise cuando detecta la promise, la ejecuta y despues continua la accion)
export const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(urlCustomers));