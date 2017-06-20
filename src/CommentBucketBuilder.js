import React from 'react';

class CommentBucketBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      value: '',
      name: '',
      gender: '',
      comments: ['__name__', 'De plus,', 'Pour la prochaine étape,', 'il', 'elle', '__name__ est encouragé à', '__name__ est encouragée à'],
      customComments: [],
      result: '',
    };

    this.state = this.initialState;

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

  edit(comment) {
    const customComments = this.state.customComments;
    const commentIndex = customComments.indexOf(comment);

    const editedComment = prompt("Edit comment", comment);

    if (editedComment !== null) {
      customComments[commentIndex] = editedComment;
      this.setState({ customComments });
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  updateResult(event) {
    this.setState({ result: event.target.value });
  }

  addToResult(comment) {
    this.setState({
      result: `${this.state.result} ${comment.trim()}`,
    });
  }

  remove(comment) {
    this.setState({
      customComments: this.state.customComments.filter(c => c !== comment),
    });
  }

  renderNewCommentForm() {
    return (
      <form className='bigColumn' onSubmit={this.handleSubmit}>
        <label>
          Add comment: <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => this.setState(this.initialState)}>Reset</button>
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
                <li key={`comment-${comment}`}>
                  <a href="#" onClick={(event) => { this.addToResult(comment); event.preventDefault(); }}>{comment}</a>
                </li>
              );
            })}
          </ul>
          <ul className='bigColumn'>
            {this.state.customComments.map((comment, i) => {
              return (
                <li key={`customComment-${comment}`}>
                  <a href="#" onClick={(event) => { this.addToResult(comment); event.preventDefault(); }}>{comment}</a>{' '}
                  <button onClick={() => this.remove(comment)}>delete</button>
                  <button onClick={() => this.edit(comment)}>edit</button>
                </li>
              );
            })}
          </ul>
        </div>
        <h3>Result</h3>
        <div className='container'>
          <textarea
            className='result-text'
            value={this.state.result.replace(/__name__/g, this.state.name)}
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
