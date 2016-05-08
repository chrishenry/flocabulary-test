'use strict';

var TestApp = React.createClass({
  render: function() {
    console.log("herer")
    return (
      <form id="long-url-form">
        <div className="input-group col-md-8 col-centered">
          <label for="long_url" class="sr-only">Url to shorten:</label>
          <input name="long_url" type="text" className="form-control" defaultValue="Enter a URL. e.g. https://www.google.com" />
          <span className="input-group-btn">
            <button className="btn btn-primary">Shorten</button>
          </span>
        </div>
      </form>
    );
  }
});

ReactDOM.render(
  React.createElement(TestApp, null),
  document.getElementById('content')
);
