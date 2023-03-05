import Tilt from "react-parallax-tilt";
import "./Logo.css";

function Logo() {
  return (
    // <div className="ma4 mt0">
    //   <Tilt>
    //     <div
    //       className="Tilt mw4"
    //       style={{
    //         height: "200px",
    //         backgroundColor: "darkgreen",
    //       }}
    //     >
    //       <h1>React Parallax Tilt 👀</h1>
    //     </div>
    //   </Tilt>
    // </div>
    <div className="ma4 mt0 w-25 flex justify-center">
      <Tilt>
        <div
          className="Tilt br2 shadow-2"
          style={{ height: "300px", backgroundColor: "darkgreen" }}
        >
          <h1>React Parallax Tilt 👀</h1>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
