import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { insertCustomer } from './../actions/insertCustomer';
import { SubmissionError } from 'redux-form';

class NewCustomerContainer extends Component {

    handleSubmit = values => {
        return this.props.insertCustomer(values).then( r => {
            if (r.error) {
                throw new SubmissionError(r.payload);
            }
        });
    }

    handleOnSumbitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    renderBody = () => {
        const newCustomer = {
            "id": "",
            "dni": "",
            "name": "",
            "age": 0
        };

        return <CustomerEdit {...newCustomer} onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSumbitSuccess}
            onBack={this.handleOnBack} />
    }

    render() {
        return (
            <div>
                <AppFrame header={'Creación de nuevo cliente'}
                    body={this.renderBody()} />
            </div>
        );
    }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { insertCustomer })(NewCustomerContainer));