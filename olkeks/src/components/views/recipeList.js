import React from 'react';
import Recipe from './recipe'

class RecipeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {recipes: []};
    }

    componentDidMount() {
        this.context.recipeService.getAll().then(
            (recipes) => {this.setState({recipes: recipes});}
        );
    }

    render() {
        let recipeNodes = this.state.recipes.map((recipe) => {
            return (
                <Recipe recipe={recipe} key={recipe._id} />
            )
        });

        return (
        <div>
            {recipeNodes}
        </div>
        );
    }
}

RecipeList.contextTypes = {
    recipeService: React.PropTypes.object
};

export default RecipeList;
