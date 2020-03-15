import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './i18n.js';
import { toast } from 'react-toastify';

const root = document.getElementById('root');
toast.configure({
    position: toast.POSITION.TOP_CENTER
});

ReactDOM.render(
    <App />,
    root);