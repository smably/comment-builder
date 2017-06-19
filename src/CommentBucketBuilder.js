import React from 'react';

class CommentBucketBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      comments: [],
      result: '',
    };

    this.handleChange = this.handleChange.bind(this);
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

  updateResult(event) {
    this.setState({ result: event.target.value });
  }

  addToResult(comment) {
    this.setState({
      result: `${this.state.result} ${comment}`,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add comment: <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h3>Comments</h3>
        <ul>
          {this.state.comments.map((comment, i) => {
            return <li key={comment}>{comment} <button onClick={() => this.addToResult(comment)}>add</button></li>;
          })}
        </ul>
        <h3>Result</h3>
        <div className='result-container'>
          <textarea className='result-text' value={this.state.result} onChange={this.updateResult}></textarea><br />
          <button onClick={() => this.setState({ result: '' })}>Reset</button>
        </div>
      </div>
    );
  }
}

export default CommentBucketBuilder;
