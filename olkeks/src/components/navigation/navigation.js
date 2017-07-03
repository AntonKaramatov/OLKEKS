import React from 'react';
import NavLink from './navLink';
import UserPanel from './userPanel';
import SearchPanel from './searchPanel'

const Navigation = ({children}, context) => {

    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <NavLink className="navbar-brand" to="/recipes">OLKEKS</NavLink>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {context.session.userId && (<NavLink className="nav-item nav-link" to={{pathname: "/recipes", query: {userId: context.session.userId} }}>My Recipes</NavLink>)}
                    <NavLink className="nav-item nav-link" to="/recipes">All Recipes</NavLink>
                    {context.session.userId && (<NavLink className="nav-item nav-link" to={{pathname: "/recipe", query: {addNew: true} }}>Add Recipe</NavLink>)}
                </div>
            </div>

            <SearchPanel />
            <UserPanel />
        </nav>
    );
}

Navigation.propTypes = {
  children: React.PropTypes.node
}

Navigation.contextTypes = {
    session: React.PropTypes.object
};

export default Navigation;