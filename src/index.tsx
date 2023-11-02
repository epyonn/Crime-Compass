import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'; 
import store from './redux/store'; // Import your Redux store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
