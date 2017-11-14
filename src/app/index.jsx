import React from "react"
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Routers} from './routes/index'
import store from './redux/store'
import "./app.css"


ReactDOM.render(
	<Provider store={store}>
		<Routers/>
	</Provider>
	, document.getElementById('root'));

