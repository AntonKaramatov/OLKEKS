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
            <div>
                {this.context.session.username && (<span>Welcome, {this.context.session.username}!</span>)}
                {this.context.session.username && (<button onClick={this.logout}>Logout</button>)}

                {!this.context.session.username && (<Link to="/user">Log in</Link>)}
                {!this.context.session.username && (<Link to={{pathname: "/user", query: {register: true} }}>Sign up</Link>)}
            </div>
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
