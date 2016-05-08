'use strict';

console.log(React)
console.log(ReactDOM)

var TestApp = React.createClass({
  render: function() {
    console.log("herer")
    return (
      <div className="page">
        <h1>Oh shit! React works!</h1>
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(TestApp, null),
  document.getElementById('content')
);

console.log(TestApp)
console.log(React)
