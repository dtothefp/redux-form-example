import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

class ContactForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object
  }

  handleSubmit(e) {
    debugger;
  }

  render() {
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
export default reduxForm({
  form: 'contact', // a unique name for this form
  fields: ['firstName', 'lastName', 'email']
})(ContactForm);

