import { Link } from "react-router-dom";

function Navigation() {
  // return (
  // <nav style={{ display: "flex", justifyContent: "flex-end" }}>
  //   <p className="f3 link dim black underline pa3 pointer">Register</p>
  //   <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
  // </nav>
  // );

  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Link to="/register">
        <p className="f3 link dim black underline pa3 pointer">Register</p>
      </Link>
      <Link>
        <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </Link>
    </nav>
  );
}

export default Navigation;
