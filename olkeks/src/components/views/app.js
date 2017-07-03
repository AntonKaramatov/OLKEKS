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
    var userId = localStorage.getItem("session_userId");
    var username = localStorage.getItem("session_username");
    this.session = (userId !== null && username !== null ? {userId: userId, username: username} : {});

    this.setSession = this.setSession.bind(this);
  }

  setSession(session) {
    this.session = session;
    if(session.userId) {
      localStorage.setItem("session_userId", session.userId);
      localStorage.setItem("session_username", session.username);
    } else {
      localStorage.removeItem("session_userId");
      localStorage.removeItem("session_username");
    }
    this.forceUpdate();
  }

  getChildContext() {
    return {
      recipeService: this.recipeService,
      userService: this.userService,
      session: this.session,
      setSession: this.setSession,
      apiErrorHandler: (error) => {
        if(error.status === 401) {
          if(this.session.userId) {
            alert("Your session has expired. Please log in.");
          }
          this.setSession({});
          this.context.router.push({ pathname: "/user" });          
          return;
        }
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

App.contextTypes = {
  router: React.PropTypes.object
}

App.childContextTypes = {
  recipeService: React.PropTypes.object,
  userService: React.PropTypes.object,
  session: React.PropTypes.object,
  setSession: React.PropTypes.func,
  apiErrorHandler: React.PropTypes.func
}

export default App;
