import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id : PropTypes.number.isRequired,
    url : PropTypes.string.isRequired,
    text : PropTypes.string,
    onPlus : PropTypes.func
};

const defaultProps = {
    text : 'Hello World',
    onPlus : () => console.wran("onplus is not defined"),
    onMinus : createWarning('onMinus')
};

function createWarning(funcName){
    return () => console.warn( funcName + ' is not defined');
}

class MyComponent extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (<div>MyComponent</div>);
    };
}

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

export default MyComponent;