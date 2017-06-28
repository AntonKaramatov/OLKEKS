import React from 'react';
import NavLink from './navLink';

const Navigation = ({hildren}, context) => {

    return (
        <div>
            <NavLink to="/recipes">Recipes</NavLink>
        </div>
    );
}

Navigation.propTypes = {
  children: React.PropTypes.node
}

export default Navigation;