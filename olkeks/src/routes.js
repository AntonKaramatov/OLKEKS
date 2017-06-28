import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/views/app';
import RecipeList from './components/views/recipeList';
import NotFound from './components/views/notFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} >
        <IndexRoute component={RecipeList} />
        <Route path="/recipes" component={RecipeList} />
        <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;