import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './components/reducers/filmReducer';
import userReducer from './components/reducers/userReducer';

const store = configureStore({
	reducer: {
		films: filmReducer,
		user: userReducer,
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
