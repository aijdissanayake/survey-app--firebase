import Front from './Front';
import Quiz from './Quiz';
import User from './User';
var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class Home extends React.Component {
  render() {
    return (
    	<Router>
	      <div className='container'>
          <Route exact path = '/' component = {User}/>
	        <Route exact path = '/surveys' component = {Front}/>
	        <Route exact path = '/survey/:area' component = {Quiz} />
	      </div>
      </Router>
    )
  }
}

export default Home;