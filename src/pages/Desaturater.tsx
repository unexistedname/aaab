import { useEffect, useRef, useState, type ChangeEvent } from "react";
import useImage from "../hooks/useImage";
import useImageReady from "../hooks/useImageReady";

export default function Desaturater() {
  const [redValue, setRedValue] = useState<number>(0);
  const [greenValue, setGreenValue] = useState<number>(0);
  const [blueValue, setBlueValue] = useState<number>(0);
  const imageRef = useImage();
  const [isImageReady] = useImageReady();
  const imageContext = useRef<CanvasRenderingContext2D | null>(null);
  const baseData = useRef<ImageData>(null);

  function valueHandler(setState: React.Dispatch<React.SetStateAction<number>>, event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setState(value);
    
    if (!imageContext.current || !baseData.current) return;
    // Idk what to name it
    const redBob = redValue / 100
    const greenBob = greenValue / 100
    const blueBob = blueValue / 100;
    
    const imgData = new ImageData(
      new Uint8ClampedArray(baseData.current.data),
      baseData.current.width,
      baseData.current.height,
    );
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      data[i] = data[i] * (1 - redBob) + gray * redBob;
      data[i + 1] = data[i + 1] * (1 - greenBob) + gray * greenBob;
      data[i + 2] = data[i + 2] * (1 - blueBob) + gray * blueBob;
    }

    imageContext.current.putImageData(imgData, 0, 0);
  }

  useEffect(() => {
    if (!isImageReady || !imageRef.current) return;

    imageContext.current = imageRef.current.getContext("2d");
    if (!imageContext.current) return;

    baseData.current = imageContext.current.getImageData(
      0,
      0,
      imageRef.current.width,
      imageRef.current.height,
    );
    console.log("srfbuewfij");
  }, [imageRef, isImageReady]);

  return (<div className="flex flex-col">
    <div>Red</div>
    <input
      type="range"
      min="0"
      max="100"
      value={redValue}
      onChange={(e) => valueHandler(setRedValue, e)}
    />
    <div>Green</div>
    <input
      type="range"
      min="0"
      max="100"
      value={greenValue}
      onChange={(e) => valueHandler(setGreenValue, e)}
    />
    <div>Blue</div>
    <input
      type="range"
      min="0"
      max="100"
      value={blueValue}
      onChange={(e) => valueHandler(setBlueValue, e)}
    />
  </div>
  );
}
