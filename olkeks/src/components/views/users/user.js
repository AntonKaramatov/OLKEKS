import React from 'react';

class User extends React.Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {user: {username: "", password: ""}};

        this.handleTextChange = this.handleTextChange.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    handleTextChange(e) {
        let user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({ user: user });
    }

    register(e) {
        e.preventDefault();
        this.context.userService.register(this.state.user).then((user) => {
                this.context.router.push({ pathname: "/" });
                this.context.setSession({userId: user.userId, username: user.username});
            }, this.context.apiErrorHandler);
    }

    login(e) {
        e.preventDefault();
        this.context.userService.login(this.state.user).then((user) => {
                this.context.router.push({ pathname: "/" });
                this.context.setSession({userId: user.userId, username: user.username});
            }, this.context.apiErrorHandler);
    }

    render() {
        let register = (this.props.location && this.props.location.query && this.props.location.query.register === 'true');
        
        return (
            <form onSubmit={register ? this.register : this.login}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" onChange={this.handleTextChange} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={this.handleTextChange} />
                {register && (<button type="submit">Register</button>)}
                {!register && (<button type="submit">Login</button>)}
            </form>
        )
    }
}

User.contextTypes = {
    userService: React.PropTypes.object,
    session: React.PropTypes.object,
    router: React.PropTypes.object,
    setSession: React.PropTypes.func,
    apiErrorHandler: React.PropTypes.func
};

export default User;
