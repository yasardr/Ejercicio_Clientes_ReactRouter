import { handleActions } from 'redux-actions';
import { FETCH_CUSTOMERS, INSERT_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../constants';

//Recibe un objeto de actions y el segundo parametro es el valor inicial del state
export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [ ...action.payload],
    [INSERT_CUSTOMER]: (state, action) => [ ...state, action.payload],
    [UPDATE_CUSTOMER]: (state, action) => {
        const customerPayload = action.payload;
        const { id } = customerPayload;
        const customers = state;
        const initalValue = [];
        //Va iterando cada elemento y construyendo un array a partir de la condicion
        const newCustomers = customers.reduce( (acumulador, customer) => {
            if (customer.id === id) {
                return [ ...acumulador, customerPayload];
            } else {
                return [ ...acumulador, customer];
            }
        }, initalValue);
        //Valor inicial

        return newCustomers;
    },
    [DELETE_CUSTOMER]: (state, action) => state.filter(c => c.id !== action.payload)
}, []);