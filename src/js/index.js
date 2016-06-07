/*eslint react/no-multi-comp:0,react/prop-types:0,semi:0*/
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {Provider} from 'react-redux';
import ContactForm from './components/contact-form';
import DevTools from './component-utils/make-devtools.js';
import './local-main.scss';

const reducers = {
  // ... your other reducers here ...
  form: formReducer
};
const reducer = combineReducers(reducers);
const store = compose(DevTools.instrument())(createStore)(reducer);

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <ContactForm />
      <DevTools />
    </div>
  </Provider>,
  document.querySelector('[data-react]')
);
