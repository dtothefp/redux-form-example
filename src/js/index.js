/*eslint react/no-multi-comp:0,react/prop-types:0,semi:0*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux'
import {reducer as formReducer, Field, reduxForm} from 'redux-form'
import {Provider} from 'react-redux';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import './local-main.scss';

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

class ContactForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <Field name="firstName" component={React.DOM.input} type="text"/>
        </div>
        <div>
          <label>Last Name</label>
          <Field name="lastName" component={React.DOM.input} type="text"/>
        </div>
        <div>
          <label>Email</label>
          <Field name="email" component={React.DOM.input} type="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
const Form = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

const props = {
  handleSubmit(e) {
    debugger;
  }
};

const DevTools = () => {
  return createDevTools(
    <DockMonitor
      toggleVisibilityKey="ctrl-H"
      changePositionKey="ctrl-Q">
      <LogMonitor />
    </DockMonitor>
  );
};

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <Form {...props} />
      <DevTools />
    </div>
  </Provider>,
  document.querySelector('[data-react]')
);
