import React from 'react'
import ReactDOM from 'react-dom'
import './screens/style.css'
import App from './screens/App'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/got-api-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


