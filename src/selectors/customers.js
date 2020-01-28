import { createSelector } from 'reselect';

//Permite ocultar como esta constituido el state 
export const getCustomers = state => state.customers;

//El segundo parametro toma el resultado de las anteriores funciones, asi que obtiene un customer y retornamos ese resultado
export const getCustomerByDni = createSelector(
    (state, props) => state.customers.find( c => c.dni === props.dni),
    customer => customer
);