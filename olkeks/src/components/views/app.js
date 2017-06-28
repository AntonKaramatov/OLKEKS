import React from 'react';
import Navigation from '../navigation/navigation'

import RecipeService from '../../services/recipeService'

const RECIPE_SERVICE_URL = '/api/recipes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.recipeService = new RecipeService(RECIPE_SERVICE_URL);
  }

  getChildContext() {
    return {
      recipeService: this.recipeService
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
  recipeService: React.PropTypes.object
}

export default App;
