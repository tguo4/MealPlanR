import { Component } from 'react';
import { signUp } from "../../utilities/users-service";
import NavBar from '../NavBar/NavBar';
import './SignUpForm.css';

// Class-component
export default class SignUpForm extends Component {
  // a class component's state is always a single object assigned to 
  // a state property on the instance of the component
  // class-fields approach vs using the constructor method
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  // Can't be defined using the usual syntax for defining an instance method of a class because
  // the method will be invoked as a callback and thus will not have 'this' bound to the component instance
  // as necessary if we want to be able to access this.props , this.setState() , etc.
  // This is using class field syntax along with an arrow function which by its very nature fixes the issue 
  // due to the way class fields are actually initialized in the constructor method.
  handleChange = (evt) => {
    // The object passed to setState is merged with the current state object
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    // Prevent form from being submitted to server
    evt.preventDefault();
    try {
      // never want to directly mutate the state object, so make a copy of it
      const formData = { ...this.state };
      // don't want to send the 'error' or 'confirm' property
      delete formData.confirm;
      delete formData.error;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occured
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  // With class-based Components, the render method must be overriden
  // The render method is the equivalent to a function-based component
  // (whose job is to return the UI)
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <NavBar />
        <div className='SignUpForm'>
          <div className="form-container">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <label>Name:</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
              <label>Email:</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
              <label>Password:</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
              <label>Confirm:</label>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
              <button type="submit" disabled={disable}>SIGN UP</button>
            </form>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        </div>
      </div>
    );
  }

}