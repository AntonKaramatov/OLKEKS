import React from 'react';

class CommentForm extends React.Component {
    render() {
        return (
            <form className="comment-from">
                <textarea name="comment-text" id="comment-text" className="form-control" value={this.props.comment} onChange={this.props.onCommentChange} />                
                <button className="btn btn-default" onClick={this.props.submitComment}>Submit</button>
            </form>
        )
    }
}

export default CommentForm;
