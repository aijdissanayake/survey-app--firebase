import React, { Component } from 'react';
import {Form, Field} from 'simple-react-forms';
var Link = require('react-router-dom').Link;

class User extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      user: {}
    }; // <- set up react state
  }

  componentWillMount(){

  }

  getUser(e){

    if(this.refs['simpleForm'].isValid()){
      var user = {};
      user["name"] = this.refs['simpleForm'].getFormValues()["name"];
      user["email"] = this.refs['simpleForm'].getFormValues()["email"];
      window.name = this.refs['simpleForm'].getFormValues()["name"];
      window.email = this.refs['simpleForm'].getFormValues()["email"];
      window.user = user;
    }
    else{e.preventDefault();}
    
  }

  validateEmail(value) {
    var atpos = value.indexOf("@");
    var dotpos = value.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=value.length) {
      return false;
    }
    else return true;
  }


  render() {
    return (
      <div>
      <h3><b>Please Enter the Product Details</b></h3>
      <Form ref='simpleForm'>
      <Field
      name='name'
      label='Product Name : '
      type='text'
      validators={['required']}
      />
      <Field
      name='email'
      label='E-mail :'
      type='text'
      validators={[
        'required',
        (value) => {
          if (this.validateEmail(value)) {
            return {valid: true}
          }
          else {
            return {valid: false, error: 'Enter a valid E-mail'}
          }
        }
        ]}
        />
        </Form>
        <Link to='/surveys' user={this.state.user}><button onClick={this.getUser.bind(this)}>Submit</button></Link>
        </div>

        );
  }
}

export default User;