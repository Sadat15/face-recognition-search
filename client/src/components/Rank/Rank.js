import { useContext } from "react";
import UserContext from "../../context/user";
// import { useCookies } from "react-cookie";

function Rank() {
  const { user } = useContext(UserContext);
  // const [cookies] = useCookies(["access_token"]); // eslint-disable-line

  if (user) {
    const message = `Welcome ${user.name}. Your current rank is...
    ${user.entries.entries}`;
    console.log(user);
    return (
      <div>
        <div className="white f3 center">{message}</div>
        <div className="white f1 center"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="white f3 center">Enter any image!</div>
    </div>
  );
}

export default Rank;
