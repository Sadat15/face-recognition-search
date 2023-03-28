import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useContext } from "react";
import UserContext from "../../context/user";

function Navigation() {
  const { setUser } = useContext(UserContext);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const handleSignout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    setUser(undefined);
  };

  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      {!cookies.access_token ? (
        <>
          <Link to="/">
            <p className="f3 link dim black underline pa3 pointer">Home</p>
          </Link>
          <Link to="/register">
            <p className="f3 link dim black underline pa3 pointer">Register</p>
          </Link>
          <Link to="/signin">
            <p className="f3 link dim black underline pa3 pointer">Sign In</p>
          </Link>
        </>
      ) : (
        <Link onClick={handleSignout} to="/">
          <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </Link>
      )}
    </nav>
  );
}

export default Navigation;
