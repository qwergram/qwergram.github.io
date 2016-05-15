// tutorial17.js
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" method="Post" />
      </form>
    );
  },
  getInitialState: function() {
    return {
      author: "Anonymous",
      text: ''
    };
  },
  handleAuthorChange: function(e) {
    this.setState({
      author: e.target.value
    });
  },
  handleTextChange: function(e) {
    this.setState({
      text: e.target.value
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author ) {
      // if there is no text/author
      return;
    };
    // Actually send the request here
    this.setState({author: "", text: ""});
  },
});

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup }
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      data: [
        {id: 1, author: "Norton Pengra", text: "`print(\"Hello World!\")`"},
        {id: 2, author: "Oliver Collins", text: "Python is *the coolest language*"}
      ]
    };
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comment Box</h1>
        <CommentList data={this.state.data}/>
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
)
