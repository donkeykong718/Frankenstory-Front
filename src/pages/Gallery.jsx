import * as backendFunctions from "../services/stories";
import { useState, useEffect } from "react";
import Thumbnail from "../components/Gallery/Thumbnail";

import "../components/Gallery/gallery.css";
import LabBackdrop from "./laboratory1920a.jpg";


function Gallery() {
  const [finstories, setFinStories] = useState([]);

  useEffect(() => {
    const displayGallery = async () => {
      const allStories = await backendFunctions.getStories();
      const finishedStories = allStories.filter(
        (story) => story.completed === true
      );
      setFinStories(finishedStories);
    };
    displayGallery();
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${LabBackdrop})` }}
      className="gallery-page"
    >
      <h1
        style={{
          fontFamily: 'Creepster',
          color: "#A6CFD5",
          textAlign: "center",
          margin: "60px",
          fontSize: "80px",
          textShadow: "#963484 1px 1px 0px, rgb(170, 170, 170) 2px 2px 0px",
        }}
      >
        Gallery
      </h1>
      <ul className="gallery-list">
        {finstories.map((story, index) => (<Thumbnail story={story} key={index} index={index}
        />))}
      </ul>
    </div>
  );
}

export default Gallery;
