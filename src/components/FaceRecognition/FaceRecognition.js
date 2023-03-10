function FaceRecognition({ imageUrl }) {
  return (
    <div className="">
      <div className="center mt3 mb3">
        <img
          className="center"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
      </div>
    </div>
  );
}

export default FaceRecognition;
