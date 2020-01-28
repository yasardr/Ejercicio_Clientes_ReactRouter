import React from 'react';
import PropTypes from 'prop-types';
import CustomerListItem from './CustomerListItem';
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_LIST } from '../constants/permissions';

const CustomerList = ({ customers, urlPath }) => {
    return (
        <div className="customers-list">
            {
                customers.map( c => 
                    <CustomerListItem 
                        key={c.dni}
                        dni={c.dni}
                        name={c.name}
                        editAction={'Editar'}
                        delAction={'Eliminar'}
                        urlPath={urlPath} />
                )
            }
        </div>
    );
};

CustomerList.propTypes = {
    customers: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,
};

export default accessControl([CUSTOMER_LIST])(CustomerList);