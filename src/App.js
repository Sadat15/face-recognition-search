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

  const onSubmit = (searchTerm) => {
    fetchBoundingBox(
      "https://cdn.facesofopensource.com/wp-content/uploads/2017/07/23193713/brendaneich25607.web_.jpg"
    );
  };

  return (
    <div className="App">
      <ParticlesComponent />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onSubmit={onSubmit} setImageUrl={setImageUrl} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
