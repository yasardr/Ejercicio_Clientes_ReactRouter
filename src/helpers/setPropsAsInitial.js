import React, { Component } from "react";

//Creacion de Higher Order Component
//Funcion que retorna un nuevo componente en base al componente inicial
export const setPropsAsInitial = WrappedComponent => (
    class extends Component {
        render() {
            return <WrappedComponent {...this.props} 
                initialValues={this.props} 
                enableReinitialize />;
        }
    }
);

//initialValues -> solo funciona una vez
//enableReinitialize -> fuerza la re-inicialización