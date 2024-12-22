const User = (props) => {
  const { name } = props;
  console.log(typeof props.age);

  return (
    <div className="user-card">
      <h2>{name}</h2>
      <h3>Location : Dehradun</h3>
      <h4>Contact : @droidbg</h4>
    </div>
  );
};

export default User;
