import "./FaceRecognition.css";

function FaceRecognition({ imageUrl, border }) {
  let { topRow, bottomRow, leftCol, rightCol } = border;

  return (
    <div className="container center mt3 mb3">
      <div className="absolute mt2">
        <img
          id="inputimage"
          className="center"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
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
