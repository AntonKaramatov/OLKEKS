import React from 'react';
import NavLink from './navLink';
import UserPanel from './userPanel';
import SearchPanel from './searchPanel'

const Navigation = ({children}, context) => {

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/recipes">OLKEKS</NavLink>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        {context.session.userId && (<li className="nav-item"><NavLink className="nav-item nav-link" to={{pathname: "/recipes", query: {userId: context.session.userId} }}>My Recipes</NavLink></li>)}
                        <li className="nav-item"><NavLink className="nav-item nav-link" to="/recipes">All Recipes</NavLink></li>
                        {context.session.userId && (<li className="nav-item"><NavLink className="nav-item nav-link" to={{pathname: "/recipe", query: {addNew: true} }}>Add Recipe</NavLink></li>)}
                    </ul>
            
                    <SearchPanel />
                    <UserPanel />
                </div>
            </div>
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