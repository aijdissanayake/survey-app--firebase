// import React, { Component } from 'react';
// import fire from './fire';
// var Link = require('react-router-dom').Link;

// class User extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { messages: [] }; // <- set up react state
//   }

//   componentWillMount(){

//   }

//   getUser(e){
//     e.preventDefault();
//   }


//   render() {

//     return (
//       <div>
//       <h3><b> Enter Your Details</b></h3>
//       <form onSubmit={this.getUser.bind(this)} >
//       <label for="">Name :</label>
//       <input name="name" id="name" type="text" required/><br/><br/>
//       <label for="">E-mail: </label>
//       <input type="email" required/><br/><br/>
//       <Link className = 'button' to='/surveys'><input type="submit"/></Link>
//       </form>
//       </div>
//       );
//   }
// }

// export default User;


import api from '../utils/api';
var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;


class User extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      title: null,
      selectedSurvey: "not-selected",
      surveys:null
    };
  }

  componentDidMount(){

    api.fetchtitle().then(function(title) {

      this.setState(function() {
        return {
          title:title
        }
      });

    }.bind(this));

    api.fetchSurveys().then(function(areaTitles) {
      var newsurveys = areaTitles;

      this.setState(function() {
        return {
          surveys:newsurveys
        }
      });

    }.bind(this));

  }


  render() {

    var surveys = this.state.surveys;
    
    if(this.state.surveys === null){
      return (<div> Loading..</div>)
    }

    else{
        return (
          <div>
          <h3><b> Enter Your Details</b></h3>
          <form  >
          <label for="">Name :</label>
          <input name="name" id="name" type="text" required/><br/><br/>
          <label for="">E-mail: </label>
          <input type="email" required/><br/><br/>
          </form>
          <Link className = 'button' to='/surveys'>Next</Link>
          
          </div>
          )
        }
      
    
  }
}


export default User;