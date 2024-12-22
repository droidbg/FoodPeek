import User from "./User";
import UserCard from "./UserCard";

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>

      <User name="Binni (from Functional Component)" age={1} />
      <UserCard name="Binni (from Class Component)" />
    </div>
  );
};

export default About;
