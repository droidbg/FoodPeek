import React from "react";

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    console.log("Child Constructer");
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    console.log("Child Component Did Mount");
  }

  render() {
    console.log("Child Render");
    const { name } = this.props;
    return (
      <div className="user-card">
        <h1>Count: {this.state.count}</h1>

        <button
          onClick={() => {
            //NEVER UPDATE STATE VARIABLE DIRECTLY -  this.state.count = this.state.count + 1;

            this.setState({
              count: this.state.count + 1,
            });
            console.log(this.state.count); // Value of count is not yet updated, it will re-render after finishing this function call
          }}
        >
          Increase
        </button>
        <h2>{name}</h2>

        <h3>Location : Dehradun</h3>
        <h4>Contact : @droidbg</h4>
      </div>
    );
  }
}

export default UserCard;
