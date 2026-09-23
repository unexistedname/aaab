import { useEffect, useRef } from "react";
import useImage from "../hooks/useImage";
import useImageReady from "../hooks/useImageReady";

export default function ImageCanvas({ imageURL }: { imageURL: string }) {
  const imageRef = useImage();
  const [, setImageReady] = useImageReady();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const img = new Image();
    img.src = imageURL;
    const canvas = canvasRef.current;
    if (!canvas) return;

    imageRef.current = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (!canvasContext) return;

      canvasContext.drawImage(img, 0, 0);
      setImageReady(true);
    };
  }, [imageURL, imageRef, setImageReady]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain z-20"
    ></canvas>
  );
}
