import { Outlet } from "react-router-dom";
import Login from "./login";

const Auth = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;
