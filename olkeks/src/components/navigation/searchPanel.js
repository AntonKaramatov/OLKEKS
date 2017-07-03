import React from 'react';

class SearchPanel extends React.Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {search: ""};

        this.search = this.search.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        this.setState({ search: e.target.value });
    }

    search(e) {
        e.preventDefault();
        if(this.state.search !== "") {
            let search = this.state.search;
            this.setState({search: ""});
            this.context.router.push({ pathname: "/recipes", query: {search: search} });
        }
    }

    render() {
        return (
            <form onSubmit={this.search}>
                <input type="text" name="search" id="search" onChange={this.handleTextChange} />
                <button type="submit">Search</button>
            </form>
        )
    }
}

SearchPanel.contextTypes = {
    router: React.PropTypes.object
};

export default SearchPanel;
