import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

class ContactForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object
  }

  handleSubmit(e) {
    //do stuff here
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
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
export default reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

