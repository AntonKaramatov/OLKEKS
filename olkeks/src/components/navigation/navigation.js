import React from 'react';
import NavLink from './navLink';
import UserPanel from './userPanel';

const Navigation = ({children}, context) => {

    return (
        <div>
            <NavLink to="/recipes">Recipes</NavLink>
            {context.session.userId && (<NavLink to={{pathname: "/recipe", query: {addNew: true} }}>Add Recipe</NavLink>)}

            <UserPanel />
        </div>
    );
}

Navigation.propTypes = {
  children: React.PropTypes.node
}

Navigation.contextTypes = {
    session: React.PropTypes.object
};

export default Navigation;