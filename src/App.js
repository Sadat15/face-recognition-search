import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesComponent from "./components/Particles/Particles";

import { useState } from "react";

import { fetchBoundingBox } from "./components/api";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [border, setBorder] = useState({});

  const onSubmit = (imageUrl) => {
    setImageUrl(imageUrl);

    setBorder(fetchBoundingBox(imageUrl));
  };

  return (
    <div className="App">
      <ParticlesComponent />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onSubmit={onSubmit} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
