import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, combineReducers,applyMiddleware } from "redux"
import bookingReducer from "./Reducers/bookingReducer"
import roomReducer from "./Reducers/roomReducer"
import userReducer from "./Reducers/userReducer"
import { BrowserRouter as Router } from 'react-router-dom';
import catReducer from './Reducers/catReducer';
import RangeReducer from './Reducers/RangeReducer';
import formReducer from './Reducers/formReducer';
import thunk from "redux-thunk"
import feedbackReducer from './Reducers/feedbackReducer'
// import store from './Components/core copy/store';
// import 'tachyons';


const rootReducer = combineReducers({
  bookingReducer, 
  roomReducer, 
  categories: catReducer,
  ranges: RangeReducer,
  userReducer,
  formReducer,
  feedbackReducer
})
 const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
          <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')                
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
