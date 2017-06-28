import React from 'react';

class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recipe: props.recipe };
    }

    render() {
        return (
            <div>
                <h4>{this.state.recipe.name}</h4>
                <p>{this.state.recipe.text}</p>
            </div>
        )
    }
}

export default Recipe;
