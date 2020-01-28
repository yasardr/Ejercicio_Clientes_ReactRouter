import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersAction from './../components/CustomersActions';
import { Prompt } from 'react-router-dom';
import { Component } from 'react';
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_EDIT } from '../constants/permissions';

/*Validaciones a nivel de field
const isRequired = value => (
    !value && "Este campo es requerido"
);*/

const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
);

//Validaciones a nivel Global
//Las validaciones a nivel de field tienen mayor prioridad
const validate = values => {
    //Objeto con los errores de validacion encontrados
    const error = {}; 

    if(!values.name) {
        error.name = "El campo nombre es requerido";
    }

    if (!values.dni) {
        error.dni = "El DNI es un campo obligatorio";
    }

    return error;
};

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
/*const onlyGrow = (value, previousValue, values) => 
        value && (!previousValue ? value : (value > previousValue ? value : previousValue));*/

//handleSubmit es propiedad de reaxForm y onSubmit es propio de reduxForm, ...submiting
class CustomerEdit extends Component {

    componentDidMount() {
        if (this.txt) {
            this.txt.focus();
        }
    }

    renderField = ({input, meta, type, label, name, withFocus}) => (
        <div>
            <label htmlFor={name}>{label}: </label>
            <input {...input} 
                type={!type ? "text" : type}
                ref={withFocus && (txt => this.txt =txt)} />
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }
        </div>
    );
    

    render () {
        const {handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
        return (
            <div>
                <h2>Edición del cliente</h2>
                <form onSubmit={handleSubmit}>
                    <Field 
                        withFocus
                        name="name" 
                        component={this.renderField} 
                        type="text" 
                        //validate={isRequired}
                        label="Nombre" 
                        parse={toUpper}
                        format={toLower} />
                    <Field 
                        name="dni" 
                        component={this.renderField} 
                        type="text" 
                        //validate={[isNumber, isRequired]} 
                        label="DNI" />
                    <Field 
                        name="age" 
                        component={this.renderField}
                        type="number" 
                        validate={isNumber} 
                        label="Edad" 
                        parse={toNumber}
                        //normalize={onlyGrow} 
                    />
                    <CustomersAction>
                        <button type="submit" disabled={pristine || submitting}>
                            Aceptar
                        </button>
                        <button type="button" disabled={submitting} onClick={onBack}>
                            Cancelar
                        </button>
                    </CustomersAction>
                    <Prompt
                        when={!pristine && !submitSucceeded}
                        message="Se perderán los datos si continúa" />
                </form>
            </div>
        );
    }
}

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};
const CustomerEditForm = reduxForm(
    { 
        form: 'CustomerEdit', 
        validate
    })(CustomerEdit);

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm));