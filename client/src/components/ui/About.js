import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="about-page m-2 h-full">
        <h1 className="mt-2 text-2xl font-bold">About Us</h1>
        <div className="flex h-5/6 items-center justify-center">
          Coming Soon....
        </div>
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
