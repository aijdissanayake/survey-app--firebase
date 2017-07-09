import Front from './Front';
import Quiz from './Quiz';
var React = require('react');
// var Quiz = require('./Quiz');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class Home extends React.Component {
  render() {
    return (
    	<Router>
	      <div className='container'>
	        <Route exact path = '/' component = {Front}/>
	        <Route path = '/:area' component = {Quiz} />
	      </div>
      </Router>
    )
  }
}

export default Home;