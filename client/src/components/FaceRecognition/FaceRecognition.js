import "./FaceRecognition.css";

function FaceRecognition({ imageUrl, border }) {
  let { topRow, bottomRow, leftCol, rightCol } = border;

  return (
    <div className="container center">
      <div className="absolute mt3">
        <img
          id="inputimage"
          className="center mb3"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className={border ? "bounding-box-true" : "bounding-box-false"}
          style={{
            top: topRow,
            bottom: bottomRow,
            right: rightCol,
            left: leftCol,
          }}
        ></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
