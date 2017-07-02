import React from 'react';
import Navigation from '../navigation/navigation'

import RecipeService from '../../services/recipeService'
import UserService from '../../services/userService'

const RECIPE_SERVICE_URL = '/api/recipes';
const USER_SERVICE_URL = '/api/users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.recipeService = new RecipeService(RECIPE_SERVICE_URL);
    this.userService = new UserService(USER_SERVICE_URL);
    this.session = {};

    this.setSession = this.setSession.bind(this);
  }

  setSession(session) {
    this.session = session;
    this.forceUpdate();
  }

  getChildContext() {
    return {
      recipeService: this.recipeService,
      userService: this.userService,
      session: this.session,
      setSession: this.setSession,
      apiErrorHandler: (error) => {
        var message = "Something went wrong!";
        if(error.responseText) {
          var errorMessage = JSON.parse(error.responseText);
          if(errorMessage.message) {
            message = errorMessage.message;
          }
        }
        alert(message);
      }
    };
  }

  render() {
    return (
      <div>
        <Navigation />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

App.childContextTypes = {
  recipeService: React.PropTypes.object,
  userService: React.PropTypes.object,
  session: React.PropTypes.object,
  setSession: React.PropTypes.func,
  apiErrorHandler: React.PropTypes.func
}

export default App;
