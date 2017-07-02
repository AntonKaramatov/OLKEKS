import React from 'react';
import {Link} from 'react-router'
import $ from 'jquery'

class Recipe extends React.Component {

    constructor(props, context) {
        super(props, context);
        let state = { };
        if(props.recipe) {
            state.recipe = props.recipe;
        } else {
            state.recipe = {
                name: "",
                text: "",
                createdDate: "",
                user: {_id: "", username: ""}
            };
        }
        
        if(props.params && props.params.recipeId) {
            context.recipeService.get(props.params.recipeId).then((recipe) => {
                var newState = this.state;
                newState.recipe = recipe;
                this.setState(newState);
            });
        }
        
        this.state = state;

        this.handleTextChange = this.handleTextChange.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.leaveEditMode = this.leaveEditMode.bind(this);
        this.resetChanges = this.resetChanges.bind(this);
    }

    handleTextChange(e) {
        let recipe = this.state.recipe;
        recipe[e.target.name] = e.target.value;
        this.setState({ recipe: recipe });
    }

    addRecipe() {
        let recipe = {name: this.state.recipe.name, text: this.state.recipe.text, createdDate: new Date()};
        this.context.recipeService.add(recipe).then((recipe) => {
            this.context.router.push({ pathname: `/recipe/${recipe._id}` });
        }, this.context.apiErrorHandler);
    }

    editRecipe() {
        this.context.recipeService.update(this.state.recipe).then((recipe) => {
            this.setState({recipe: recipe, edit: false});
        }, this.context.apiErrorHandler);
    }

    enterEditMode() {
        let oldRecipe = $.extend(true, {}, this.state.recipe);
        this.setState({recipe: this.state.recipe, oldRecipe: oldRecipe, edit: true});
    }

    leaveEditMode() {
        this.setState({recipe: this.state.oldRecipe, edit: false});
    }

    resetChanges() {
        let oldRecipe = $.extend(true, {}, this.state.oldRecipe);
        this.setState({recipe: this.state.oldRecipe, oldRecipe: oldRecipe, edit: true});
    }

    render() {
        let addNew = (this.props.location && this.props.location.query && this.props.location.query.addNew === 'true');
        let edit = !addNew && this.state.edit === true;
        let showDetails = (this.props.location && this.props.location.query && this.props.location.query.showDetails === 'true') ||
            (this.props.params && this.props.params.recipeId && !addNew && !edit);

        if(addNew || edit) {
            return (
                <div>
                    <label htmlFor="name">Recipe name: </label>
                    <input type="text" name="name" id="name" value={this.state.recipe.name} onChange={this.handleTextChange} />
                    <label htmlFor="text">Recipe text: </label>
                    <textarea name="text" id="text" value={this.state.recipe.text} onChange={this.handleTextChange} />
                    {addNew && (<button onClick={this.addRecipe}>Add</button>)}
                    {edit && (<button onClick={this.editRecipe}>Save</button>)}
                    {edit && (<button onClick={this.resetChanges}>Reset</button>)}
                    {edit && (<button onClick={this.leaveEditMode}>Cancel</button>)}
                </div>
            )
        } else if(showDetails) {
            return (
                <div>
                    <h4>{this.state.recipe.name}</h4>
                    <p>{this.state.recipe.user.username}</p>
                    <p>{this.state.recipe.createdDate}</p>
                    <p>{this.state.recipe.text}</p>
                    {this.context.session.userId === this.state.recipe.user._id && (<button onClick={this.enterEditMode}>Edit</button>)}
                </div>
            )
        } else {
            return (
                <div>
                    <Link to={{ pathname: `/recipe/${this.state.recipe._id}`}}>{this.state.recipe.name}</Link>
                    <p>{this.state.recipe.user.username}</p>
                    <p>{this.state.recipe.createdDate}</p>
                </div>
            )
        }
    }
}

Recipe.contextTypes = {
    recipeService: React.PropTypes.object,
    router: React.PropTypes.object,
    session: React.PropTypes.object,
    apiErrorHandler: React.PropTypes.func
};

export default Recipe;
