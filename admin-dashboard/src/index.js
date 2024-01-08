import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import store from './component/Redux/store';
import rootReducer from './component/Redux';

// const store = createStore(rootReducer, applyMiddleware(thunk));
// Xác định phần tử ứng dụng
Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
