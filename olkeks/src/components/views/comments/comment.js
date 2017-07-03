import React from 'react';

class Comment extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">{this.props.comment.text}</div>
                <div className="panel-footer">Published on {new Date(this.props.comment.createdDate).toDateString()} by {this.props.comment.user.username}</div>
            </div>
        )
    }
}

export default Comment;
