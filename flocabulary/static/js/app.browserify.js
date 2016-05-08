'use strict';

var ShortenForm = React.createClass({
  initialInputValue: "Enter a URL. e.g. https://www.google.com",

  getInitialState: function() {
    return {
      long_url: this.initialInputValue,
      long_url_error: false
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
    if (validator.isURL(this.state.long_url, { protocols: ['http','https'] })) {
      console.log("Success, save that puppy")
      this.handleUrlSubmit({long_url: this.state.long_url.trim()});
    } else {
      this.setState({
        long_url_error: "Please submit a valid URL."
      });
      this.render()
    }
  },

  handleUrlSubmit: function(url) {
    $.ajax({
      url: "/v1/urls",
      dataType: 'json',
      type: 'POST',
      data: url,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({long_url_error: "Error: " + err.toString()});
        this.render()
      }.bind(this)
    });
  },

  render: function() {
    // TODO: these classes and HTML lead to a misaligned error msg. fix.
    var errorClass = classNames({
      'col-md-8': true,
      'col-centered': true,
      'alert': true,
      'alert-error': true,
      'hidden': !this.state.long_url_error
    });
    return (
      <form id="long-url-form" onSubmit={this.onSubmit}>
        <div className="input-group col-md-8 col-centered">
          <label for="long_url">Url to shorten:</label>
          <input name="long_url" type="text" className="form-control" value={this.state.long_url} onChange={this.handleChange} onFocus={this.onFocus} onBlur={this.onBlur}/>
          <span className="input-group-btn">
            <button className="btn btn-primary">Shorten</button>
          </span>
        </div>
        <div className={errorClass}>
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {this.state.long_url_error}
        </div>
      </form>
    );
  }
});

ReactDOM.render(
  React.createElement(ShortenForm, null),
  document.getElementById('content')
);
