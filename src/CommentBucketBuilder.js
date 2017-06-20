import React from 'react';

class CommentBucketBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      value: '',
      name: '',
      newCategory: '',
      categories: [],
      comments: ['__name__', 'il', 'elle', 'De plus,', 'Pour la prochaine étape,', '__name__ est encouragé à', '__name__ est encouragée à'],
      customComments: [],
      customCommentCategories: [],
      result: '',
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.addToResult = this.addToResult.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.remove = this.remove.bind(this);
    this.import = this.import.bind(this);
    this.move = this.move.bind(this);
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

  handleCategoryChange(event) {
    this.setState({ newCategory: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      value: '',
      customComments: this.state.customComments.concat(this.state.value),
    });
  }

  handleCategorySubmit(event) {
    event.preventDefault();

    if (this.state.newCategory !== '') {
      this.setState({
        newCategory: '',
        categories: this.state.categories.concat(this.state.newCategory),
      });
    }
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

  move(comment, event) {
    const category = event.target.value;
    const customComments = this.state.customComments;
    const commentIndex = customComments.indexOf(comment);
    const customCommentCategories = this.state.customCommentCategories;

    customCommentCategories[commentIndex] = category;

    this.setState({ customCommentCategories });
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
          <div>
            <form onSubmit={this.handleNameSubmit}>
              <label>
                Student name: <input type="text" value={this.state.name} onChange={this.handleNameChange} />
              </label>
            </form>
          </div>
          <div className='bigColumn row'>
            <form onSubmit={this.handleSubmit}>
              <label>
                Add comment: <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" /><br />
            </form>
            <form onSubmit={this.handleCategorySubmit}>
              <label>
                Add category: <input type="text" value={this.state.newCategory} onChange={this.handleCategoryChange} />
              </label>
              <input type="submit" value="Submit" /><br />
            </form>
            <button onClick={(event) => { this.setState(this.initialState); event.preventDefault(); }}>Reset</button>
          </div>
        </div>
        <div className='columns'>
          <ul>
            {this.state.comments.map((comment, i) => {
              return (
                <li key={`comment-${comment}`}>
                  <a href="#addComment" onClick={(event) => { this.addToResult(comment); event.preventDefault(); }}>{comment}</a>
                </li>
              );
            })}
          </ul>
          <div className='bigColumn'>
            {['Uncategorized'].concat(this.state.categories).map(category => {
              const title = <h3>{category}</h3>;

              const items = this.state.customComments.filter((comment, i) => {
                const commentCategory = this.state.customCommentCategories[this.state.customComments.indexOf(comment)] || 'Uncategorized';
                return commentCategory === category;
              }).map((comment) => {
                const commentCategory = this.state.customCommentCategories[this.state.customComments.indexOf(comment)] || 'Uncategorized';
                return (
                  <li key={`customComment-${comment}`}>
                    <a href="#addCustomComment" onClick={(event) => { this.addToResult(comment); event.preventDefault(); }}>{comment}</a>{' '}
                    <button onClick={() => this.remove(comment)}>delete</button>
                    <button onClick={() => this.edit(comment)}>edit</button>
                    <select onChange={(event) => this.move(comment, event)} value={commentCategory}>
                      <option value='Uncategorized'>Uncategorized</option>
                      {this.state.categories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                  </li>
                );
              });

              if (items.length == 0) {
                return null;
              }

              return (
                <div key={category}>
                  {title}
                  <ul>{items}</ul>
                </div>
              );
            })}
          </div>
        </div>
        <h3>Result</h3>
        <div className='container'>
          <textarea
            className='result-text'
            value={this.state.result.replace(/__name__/g, this.state.name).trim()}
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
