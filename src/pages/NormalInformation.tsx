import { useEffect, useState } from "react";

import useImage from "../hooks/useImage";
import useImageReady from "../hooks/useImageReady";
import NormalChart from "./components/NormalChart";
import ChartLoading from "./components/ChartLoading";

function RGBtoHSV(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const v = Math.round(max * 100);

  if (max !== 0) {
    s = Math.round((delta / max) * 100);
  }

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else if (max === b) {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
  }

  return [h, s, v];
}

export default function NormalInformation() {
  const imageRef = useImage();
  const [isImageReady] = useImageReady();
  const [statReady, setStatReady] = useState<boolean>(false);
  const [hueData, setHueData] = useState<number[]>([]);
  const [saturationData, setSaturationData] = useState<number[]>([]);
  const [valueData, setValueData] = useState<number[]>([]);

  useEffect(() => {
    console.log("fwooop");
    if (!isImageReady || !imageRef.current) return;

    const imageContext = imageRef.current.getContext("2d");
    if (!imageContext) return;

    const imgData = imageContext.getImageData(
      0,
      0,
      imageRef.current.width,
      imageRef.current.height,
    );
    const hueTemp: number[] = new Array(361).fill(0);
    const saturationTemp: number[] = new Array(101).fill(0);
    const valueTemp: number[] = new Array(101).fill(0);

    for (let i = 0; i < imgData.data.length; i += 4) {
      const [h, s, v] = RGBtoHSV(
        imgData.data[i],
        imgData.data[i + 1],
        imgData.data[i + 2],
      );
      hueTemp[h] += 1;
      saturationTemp[s] += 1;
      valueTemp[v] += 1;
    }
    setValueData(valueTemp);
    setHueData(hueTemp);
    setSaturationData(saturationTemp);
    setStatReady(true);
  }, [imageRef, isImageReady]);

  return statReady ? (
    <div className="w-full flex flex-col h-fit">
      <div className="font-medium">Hue</div>
      <NormalChart data={hueData} isHue={true} />
      <div className="font-medium">Saturation</div>
      <NormalChart data={saturationData} />
      <div className="font-medium">Value</div>
      <NormalChart data={valueData} />
    </div>
  ) : (
    <ChartLoading />
  );
}
