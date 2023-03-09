import "./ImageLinkForm.css";
import { useState } from "react";

function ImageLinkForm({ onSubmit, setImageUrl }) {
  const [term, setTerm] = useState("");

  const handleSubmit = () => {
    onSubmit(term);
    setImageUrl(term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <p className="f3 center">
        This brain will detect faces in your pictures.
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            value={term}
            onChange={handleChange}
            className="f4 pa2 w-70 center"
            type="text"
          />
          <button
            onClick={handleSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
