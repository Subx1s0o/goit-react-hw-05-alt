import { useState } from "react";

function useImageLoaded() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);

  return { imageLoaded, handleImageLoad };
}

export default useImageLoaded;
