import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesComponent from "./components/Particles/Particles";

import { useState } from "react";

import { fetchBoundingBox } from "./components/api";

export default function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [border, setBorder] = useState({});

  const calculateFace = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    const { top_row, bottom_row, left_col, right_col } = data;

    return {
      leftCol: left_col * width,
      topRow: top_row * height,
      rightCol: width - right_col * width,
      bottomRow: height - bottom_row * height,
    };
  };

  const getBoundingBox = async (imageUrl) => {
    const boundingBox = await fetchBoundingBox(imageUrl);
    setBorder(calculateFace(boundingBox));
  };

  const onSubmit = (imageUrl) => {
    setImageUrl(imageUrl);
    getBoundingBox(imageUrl);
  };

  return (
    <div className="App">
      <ParticlesComponent />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onSubmit={onSubmit} />
      <FaceRecognition imageUrl={imageUrl} border={border} />
    </div>
  );
}
