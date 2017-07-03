import React from 'react';
import Recipe from './recipe'

class RecipeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {recipes: []};

        this.getRecipes = this.getRecipes.bind(this);
    }

    componentDidMount() {
        var query = {};
        if(this.props.location && this.props.location.query && this.props.location.query.userId) {
            query.userId = this.props.location.query.userId;
        }
        if(this.props.location && this.props.location.query && this.props.location.query.search) {
            query.search = this.props.location.query.search;
        }
        this.getRecipes(query);
    }
    
    componentWillReceiveProps(nextProps) {
        var query = {};
        if(nextProps.location && nextProps.location.query && nextProps.location.query.userId) {
            query.userId = nextProps.location.query.userId;
        }
        if(nextProps.location && nextProps.location.query && nextProps.location.query.search) {
            query.search = nextProps.location.query.search;
        }
        this.getRecipes(query);
    }

    getRecipes(query) {        
        this.context.recipeService.getAll(query).then(
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
                {this.state.recipes.length === 0 && <span>No recipes found.</span>}
                {recipeNodes}
            </div>
        );
    }
}

RecipeList.contextTypes = {
    recipeService: React.PropTypes.object
};

export default RecipeList;
