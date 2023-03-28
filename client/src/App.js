import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesComponent from "./components/Particles/Particles";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound";
import axios from "axios";
import { useCookies } from "react-cookie";

import { useState } from "react";

import { fetchBoundingBox } from "./components/api";

import { useContext } from "react";
import UserContext from "./context/user";

export default function App() {
  const { user, setUser } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState("");
  const [border, setBorder] = useState({});
  const [cookies] = useCookies(["access_token"]); // eslint-disable-line

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
    try {
      const boundingBox = await fetchBoundingBox(imageUrl);
      setBorder(calculateFace(boundingBox));
      if (Object.keys(cookies).length !== 0) {
        const id = localStorage.getItem("userId");
        const updatedEntries = await axios.put("http://localhost:8080/image", {
          id,
        });
        setUser({ ...user, entries: updatedEntries.data });
      }
    } catch (error) {
      setBorder(false);
    }
  };

  const onSubmit = (imageUrl) => {
    setImageUrl(imageUrl);
    getBoundingBox(imageUrl);
  };

  return (
    <>
      <ParticlesComponent />
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Logo />
              <Rank />
              <ImageLinkForm onSubmit={onSubmit} />
              <FaceRecognition imageUrl={imageUrl} border={border} />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <Signin />
            </>
          }
        />

        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
