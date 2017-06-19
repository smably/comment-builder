import React from 'react';

class CommentBucketBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: '',
      comments: ['De plus,', 'Pour la prochaine étape,', 'il', 'elle', '__name__ est encouragé à', '__name__ est encouragée à'],
      result: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToResult = this.addToResult.bind(this);
    this.updateResult = this.updateResult.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      value: '',
      comments: this.state.comments.concat(this.state.value),
    });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  updateResult(event) {
    this.setState({ result: event.target.value });
  }

  addToResult(comment) {
    this.setState({
      result: `${this.state.result} ${comment}`,
    });
  }

  renderNewCommentForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add comment: <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleNameSubmit}>
          <label>
            Student name: <input type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
        </form>
        {this.renderNewCommentForm()}
        <h3>Comments</h3>
        <ul>
          {this.state.comments.map((comment, i) => {
            return <li key={comment}>{comment} <button onClick={() => this.addToResult(comment)}>add</button></li>;
          })}
        </ul>
        <h3>Result</h3>
        <div className='result-container'>
          <textarea
            className='result-text'
            value={this.state.result.replace('__name__', this.state.name)}
            onChange={this.updateResult}
          ></textarea><br />
          <button onClick={() => this.setState({ result: '' })}>Reset</button>
        </div>
      </div>
    );
  }
}

export default CommentBucketBuilder;
