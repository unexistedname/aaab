import { useEffect, useState } from "react";

import useImage from "../hooks/useImage";
import useImageReady from "../hooks/useImageReady";
import ColorChart from "./components/ColorChart";

export default function ColorInformation() {
  const imageRef = useImage();
  const [isImageReady,] = useImageReady();
  const [redData, setRedData] = useState<number[]>([]);
  const [greenData, setGreenData] = useState<number[]>([]);
  const [blueData, setBlueData] = useState<number[]>([]);

  useEffect(() => {
    if (!isImageReady || !imageRef.current) return;
    
    const imageContext = imageRef.current.getContext('2d');
    if (!imageContext) return;
    
    const imgData = imageContext.getImageData(
      0,
      0,
      imageRef.current.width,
      imageRef.current.height,
    );
    const redTemp: number[] = new Array(256).fill(0);
    const greenTemp: number[] = new Array(256).fill(0);
    const blueTemp: number[] = new Array(256).fill(0);
    
    for (let i = 0; i < imgData.data.length; i += 4) {
      redTemp[imgData.data[i]] += 1;
      greenTemp[imgData.data[i+1]] += 1;
      blueTemp[imgData.data[i+2]] += 1;
    }

    setRedData(redTemp);
    setGreenData(greenTemp);
    setBlueData(blueTemp);
    
  }, [imageRef, isImageReady]);
  
  return (
    <div className="w-full flex flex-col">
      <div className="font-medium">Red</div>
      <ColorChart data={redData} color="red"/>
      <div className="font-medium">Green</div>
      <ColorChart data={greenData} color="green"/>
      <div className="font-medium">Blue</div>
      <ColorChart data={blueData} color="blue"/>
    </div>
  );
}
