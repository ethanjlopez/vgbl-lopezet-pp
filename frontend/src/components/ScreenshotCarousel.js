import React, { useState, useEffect } from "react";
import "../css/ScreenshotCarousel.css";

export const ScreenshotCarousel = ({ images, carousel, setCarousel }) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (images) {
      const url = images[carousel.index].url.replace("thumb", "1080p");
      setUrl(url);
    }
  }, [images]);

  return (
    <div className="carousel">
      <div className="images">{url ? <img src={url}></img> : null}</div>
      <div className="overlay" onClick={() => setCarousel(false)}></div>
    </div>
  );
};
