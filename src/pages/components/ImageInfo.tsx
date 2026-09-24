import { useEffect, useState } from "react";
import useImage from "../../hooks/useImage";
import useImageReady from "../../hooks/useImageReady";

type size = {
  width: number,
  height: number,
}

export default function ImageInfo() {
  const imageRef = useImage();
  const [isImageReady] = useImageReady();
  const [size, setSize] = useState<size>();

  useEffect(() => {
    if (!isImageReady || !imageRef.current) return;
    setSize({
      width: imageRef.current.width,
      height: imageRef.current.height,
    });
  }, [imageRef, isImageReady]);
  return <div>{size ? `${size.width}px x ${size.height}px (${size.width * size.height}px^2)` : "Loading..."}</div>;
}
