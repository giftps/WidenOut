import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

import reportWebVitals from './reportWebVitals';

import DataProvider from './redux/store';

// style + assets
import './styles/global.css';
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <BrowserRouter>
        <DataProvider>
            <App />
        </DataProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
