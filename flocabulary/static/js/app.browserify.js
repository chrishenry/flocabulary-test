'use strict';

var ShortenForm = React.createClass({
  initialInputValue: "Enter a URL. e.g. https://www.google.com",

  getInitialState: function() {
    return {
      long_url: this.initialInputValue
    };
  },

  handleChange: function(evt) {
    this.setState({
      long_url: evt.target.value
    });
  },

  reset: function() {
    this.setState({
      long_url: this.initialInputValue
    });
  },

  alertValue: function() {
    alert(this.state);
  },

  onFocus: function () {
    if(this.state.long_url == this.initialInputValue) {
      this.setState({
        long_url: ""
      });
    }
  },

  onBlur: function () {
    if(this.state.long_url.trim() == "") {
      this.setState({
        long_url: this.initialInputValue
      });
    }
  },

  onSubmit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(this.state.long_url)
  },

  render: function() {
    return (
      <form id="long-url-form" onSubmit={this.onSubmit}>
        <div className="input-group col-md-8 col-centered">
          <label for="long_url">Url to shorten:</label>
          <input name="long_url" type="text" className="form-control" value={this.state.long_url} onChange={this.handleChange} onFocus={this.onFocus} onBlur={this.onBlur}/>
          <span className="input-group-btn">
            <button className="btn btn-primary">Shorten</button>
          </span>
        </div>
      </form>
    );
  }
});

ReactDOM.render(
  React.createElement(ShortenForm, null),
  document.getElementById('content')
);
