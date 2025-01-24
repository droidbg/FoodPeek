import UserContext from "../utils/UserContext";
import UserCard from "./UserCard";

import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor.");
  }

  componentDidMount() {
    console.log("Parent Component Did Mount.");
  }

  render() {
    console.log("Parent Render.");

    return (
      <div className="about-page m-2">
        <h1 className="font-bold text-2xl my-2">About Us</h1>

        <UserContext.Consumer>
          {({ name }) => {
            return name;
          }}
        </UserContext.Consumer>

        <UserCard name="First" />
        <UserCard name="Second" />
      </div>
    );
  }
}

export default About;

/* Output in thi order:

Parent Constructor.
Parent Render.

First Child Constructer
First Child Render

Second Child Constructer
Second Child Render

First Child Component Did Mount
Second Child Component Did Mount
Parent Component Did Mount



--- It will Batch update render and it will do DOM manipulation also in batch
*/
