import React from 'react';

class CommentBucketBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: '',
      comments: ['De plus,', 'Pour la prochaine étape,', 'il', 'elle', '__name__ est encouragé à', '__name__ est encouragée à'],
      customComments: [],
      result: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToResult = this.addToResult.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.remove = this.remove.bind(this);
    this.import = this.import.bind(this);
  }

  componentDidMount() {
    this.setState(JSON.parse(window.localStorage.getItem('commentBuilderState')));
  }

  componentDidUpdate() {
    window.localStorage.setItem('commentBuilderState', JSON.stringify(this.state));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      value: '',
      customComments: this.state.customComments.concat(this.state.value),
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

  remove(comment) {
    this.setState({
      customComments: this.state.customComments.filter(c => c !== comment),
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

  import() {
    const importText = document.getElementById('import').value;
    const importItems = importText.split(/\n+/).filter(i => i !== '');

    this.setState({
      customComments: this.state.customComments.concat(importItems),
    });

    document.getElementById('import').value = '';
  }

  render() {
    return (
      <div>
        <h3>Comments</h3>
        <div className='columns'>
          <form onSubmit={this.handleNameSubmit}>
            <label>
              Student name: <input type="text" value={this.state.name} onChange={this.handleNameChange} />
            </label>
          </form>
          {this.renderNewCommentForm()}
        </div>
        <div className='columns'>
          <ul>
            {this.state.comments.map((comment, i) => {
              return (
                <li key={comment}>
                  {comment}{' '}
                  <button onClick={() => this.addToResult(comment)}>add</button>
                </li>
              );
            })}
          </ul>
          <ul>
            {this.state.customComments.map((comment, i) => {
              return (
                <li key={comment}>
                  {comment}{' '}
                  <button onClick={() => this.addToResult(comment)}>add</button>
                  <button onClick={() => this.remove(comment)}>delete</button>
                </li>
              );
            })}
          </ul>
        </div>
        <h3>Result</h3>
        <div className='container'>
          <textarea
            className='result-text'
            value={this.state.result.replace('__name__', this.state.name)}
            onChange={this.updateResult}
          ></textarea><br />
          <button onClick={() => this.setState({ result: '' })}>Reset</button>
        </div>
        <h3>Import</h3>
        <div className='container'>
          <textarea className='import-text' id='import'></textarea><br />
          <button onClick={this.import}>Import</button>
        </div>
      </div>
    );
  }
}

export default CommentBucketBuilder;
