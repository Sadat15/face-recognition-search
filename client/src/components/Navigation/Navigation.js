import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navigation({ setCurrentUser }) {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const handleSignout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    setCurrentUser(undefined);
  };

  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      {!cookies.access_token ? (
        <>
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
