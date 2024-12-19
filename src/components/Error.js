import { useRouteError } from "react-router";
import Header from "./Header";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <Header />
      <h1>Oops, Something Went Wrong</h1>

      <h4>
        {err.status} Page {err.statusText}
      </h4>
    </div>
  );
};
export default Error;
