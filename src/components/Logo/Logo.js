import Tilt from "react-parallax-tilt";
import "./Logo.css";
import { BiBrain } from "react-icons/bi";

function Logo() {
  return (
    <div className="ma4 mt0 w-10">
      <Tilt>
        <div
          className="Tilt br2 shadow-2 flex justify-center align-center"
          style={{
            height: "auto",
            backgroundColor: "darkgreen",
          }}
        >
          <BiBrain style={{ fontSize: "150px" }} />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
