//react-redux 공부 
//https://react-redux.js.org/docs/introduction/quick-start
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import '../../css/components/common.css'

import { createStore } from 'redux';
import reducers from './reducers'; // './reducers/index 같은 뜻'

import { Provider } from 'react-redux';
import App from './App'

const store = createStore(reducers);
const rootElement = document.getElementById("main-body");

// state 가 변할때마다 로그 retun 은 unsubscribe() 함수입니다.
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
        <Provider store={store}>
                <BrowserRouter>
                        <App></App>
                </BrowserRouter>
        </Provider>
 , rootElement) || {};

