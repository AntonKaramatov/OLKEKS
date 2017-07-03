import React from 'react';
import {Link} from 'react-router'

class UserPanel extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.context.userService.logout().then((res) => {
            this.context.router.push({ pathname: "/" });
            this.context.setSession({});
        });
    }

    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                {this.context.session.username && (<li className="nav-item"><span className="navbar-text">Welcome, {this.context.session.username}!</span></li>)}
                {this.context.session.username && (<li className="nav-item"><button className="btn btn-default navbar-btn" onClick={this.logout}>Logout</button></li>)}

                {!this.context.session.username && (<li className="nav-item"><p className="navbar-btn"><Link className="btn btn-default" to="/user">Log in</Link></p></li>)}
                {!this.context.session.username && (<li className="nav-item"><p className="navbar-btn"><Link className="btn btn-default" to={{pathname: "/user", query: {register: true} }}>Sign up</Link></p></li>)}
            </ul>
        )
    }
}

UserPanel.contextTypes = {
    userService: React.PropTypes.object,
    session: React.PropTypes.object,
    setSession: React.PropTypes.func,
    router: React.PropTypes.object
};

export default UserPanel;
