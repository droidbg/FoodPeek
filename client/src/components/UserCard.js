import React from "react";

class UserCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }
  componentDidMount() {}

  render() {
    const { name } = this.props;
    return (
      <div className="user-card m-2 rounded-xl border border-black bg-purple-100 p-2">
        <h1 className="text-2xl font-bold">Count: {this.state.count}</h1>

        <button
          className="rounded-lg border bg-slate-600 px-2 py-1 text-white"
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
      </div>
    );
  }
}

export default UserCard;
