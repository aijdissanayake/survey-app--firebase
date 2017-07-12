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
      console.log(user);
      this.setState(function() {
        return {
          user : user
        }      
      });

      console.log("not submitted yet");
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

    // return (
    //   <div>
    //   <h3><b> Enter Your Details</b></h3>
    //   <form onSubmit={this.getUser.bind(this)} >
    //   <label for="">Name :</label>
    //   <input name="name" id="name" type="text" required/><br/><br/>
    //   <label for="">E-mail: </label>
    //   <input type="email" required/><br/><br/>
    //   <Link className = 'button' to='/surveys'><input type="submit"/></Link>
    //   </form>
    //   </div>
    //   );

    return (
      <div>
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


// import api from '../utils/api';
// var React = require('react');
// var PropTypes = require('prop-types');
// var Link = require('react-router-dom').Link;


// class User extends React.Component {

//   constructor (props) {
//     super(props);
//     this.state = {
//       title: null,
//       selectedSurvey: "not-selected",
//       surveys:null
//     };
//   }

//   componentDidMount(){

//     api.fetchtitle().then(function(title) {

//       this.setState(function() {
//         return {
//           title:title
//         }
//       });

//     }.bind(this));

//     api.fetchSurveys().then(function(areaTitles) {
//       var newsurveys = areaTitles;

//       this.setState(function() {
//         return {
//           surveys:newsurveys
//         }
//       });

//     }.bind(this));

//   }


//   render() {

//     var surveys = this.state.surveys;

//     if(this.state.surveys === null){
//       return (<div> Loading..</div>)
//     }

//     else{
//         return (
//           <div>
//           <h3><b> Enter Your Details</b></h3>
//           <form  >
//           <label for="">Name :</label>
//           <input name="name" id="name" type="text" required/><br/><br/>
//           <label for="">E-mail: </label>
//           <input type="email" required/><br/><br/>
//           </form>
//           <Link className = 'button' to='/surveys'>Next</Link>

//           </div>
//           )
//         }


//   }
// }


// export default User;