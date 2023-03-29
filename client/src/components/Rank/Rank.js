import { useContext } from "react";
import UserContext from "../../context/user";

function Rank() {
  const { user } = useContext(UserContext);

  if (user) {
    console.log(user);
    const message = `Welcome ${user.name}. Your current rank is...
    ${user.entries}`;
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
