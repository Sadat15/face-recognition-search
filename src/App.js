import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// import Clarifai from "clarifai";

// const app = new Clarifai.App({
//   apiKey: "",
// });

const particlesOptions = {
  background: {},
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      directions: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 30,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};

function App() {
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = (searchTerm) => {
    console.log("click");

    // app.models
    //   .predict(
    //     {
    //       id: "face-detection",
    //       name: "face-detection",
    //       version: "6dc7e46bc9124c5c8824be4822abe105",
    //       type: "visual-detector",
    //     },
    //     "https://samples.clarifai.com/dog2.jpeg"
    //   )
    //   .then((response) => console.log(response.outputs[0]));
  };

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);

    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div className="App">
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />

      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onSubmit={onSubmit} setImageUrl={setImageUrl} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
