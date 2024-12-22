import User from "./User";
import UserCard from "./UserCard";
import { useState } from "react";

const About = () => {
  const [isClassComp, setIsClassComp] = useState(true);

  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div className="component-buttons">
        <button
          onClick={() => {
            setIsClassComp(false);
          }}
        >
          Functional
        </button>
        <button
          onClick={() => {
            setIsClassComp(true);
          }}
        >
          Class
        </button>
      </div>
      {isClassComp ? (
        <UserCard name="Binni (from Class Component)" />
      ) : (
        <User name="Binni (from Functional Component)" age={1} />
      )}
    </div>
  );
};

export default About;
