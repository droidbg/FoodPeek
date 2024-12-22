import React from "react";

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { name } = this.props;
    return (
      <div className="user-card">
        <h1>Count: {this.state.count}</h1>
        <h2>{name}</h2>

        <h3>Location : Dehradun</h3>
        <h4>Contact : @droidbg</h4>
      </div>
    );
  }
}

export default UserCard;
