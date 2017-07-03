import React from 'react';
import {Link} from 'react-router'
import $ from 'jquery'
import Alert from 'react-s-alert';

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

    componentWillReceiveProps(nextProps) {
        if(nextProps.location && nextProps.location.query && nextProps.location.query.addNew === 'true') {
            this.setState({recipe: {name: "", text: ""}});            
        }
    }

    handleTextChange(e) {
        let recipe = this.state.recipe;
        recipe[e.target.name] = e.target.value;
        this.setState({ recipe: recipe });
    }

    addRecipe(e) {
        e.preventDefault();
        let recipe = {name: this.state.recipe.name, text: this.state.recipe.text, createdDate: new Date()};
        this.context.recipeService.add(recipe).then((recipe) => {
            recipe.user = {_id: this.context.session.userId, username: this.context.session.username};
            this.setState({recipe: recipe});
            this.context.router.push({ pathname: `/recipe/${recipe._id}` });
            Alert.success("Recipe added successfully.", {position: "top-left"});
        }, this.context.apiErrorHandler);
    }

    editRecipe(e) {
        e.preventDefault();
        this.context.recipeService.update(this.state.recipe).then((recipe) => {
            recipe.user = {_id: this.context.session.userId, username: this.context.session.username};
            this.setState({recipe: recipe, edit: false});
            Alert.success("Recipe edited successfully.", {position: "top-left"});
        }, this.context.apiErrorHandler);
    }

    enterEditMode() {
        let oldRecipe = $.extend(true, {}, this.state.recipe);
        this.setState({recipe: this.state.recipe, oldRecipe: oldRecipe, edit: true});
    }

    leaveEditMode(e) {
        e.preventDefault();
        this.setState({recipe: this.state.oldRecipe, edit: false});
    }

    resetChanges(e) {
        e.preventDefault();
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
                <form>
                    <label className="form-label" htmlFor="name">Recipe name: </label>
                    <input className="form-control" type="text" name="name" id="name" value={this.state.recipe.name} onChange={this.handleTextChange} />
                    <label className="form-label" htmlFor="text">Recipe text: </label>
                    <textarea className="form-control recipe-text" name="text" id="text" value={this.state.recipe.text} onChange={this.handleTextChange} />
                    {addNew && (<button className="btn btn-info" onClick={this.addRecipe}>Add</button>)}
                    {edit && (<button className="btn btn-info" onClick={this.editRecipe}>Save</button>)}
                    {edit && (<button className="btn btn-warning" onClick={this.resetChanges}>Reset</button>)}
                    {edit && (<button className="btn btn-danger" onClick={this.leaveEditMode}>Cancel</button>)}
                </form>
            )
        } else if(showDetails) {
            return (
                <div>
                    <h2>{this.state.recipe.name}</h2>
                    <p>Published on {new Date(this.state.recipe.createdDate).toDateString()} by {this.state.recipe.user.username}</p>
                    <pre>{this.state.recipe.text}</pre>
                    {this.context.session.userId === this.state.recipe.user._id && (<button className="btn btn-info" onClick={this.enterEditMode}>Edit</button>)}
                </div>
            )
        } else {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <Link to={{ pathname: `/recipe/${this.state.recipe._id}`}}>{this.state.recipe.name}</Link>    
                    </div>        
                    <div className="panel-body">
                        <p>Published on {new Date(this.state.recipe.createdDate).toDateString()} by {this.state.recipe.user.username}</p>
                    </div>
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
