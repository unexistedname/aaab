import { useRef } from "react";
import type { ReactNode } from "react";
import { ImageContext } from "../context/ImageContext";

export default function ImageProvider({ children }: { children: ReactNode }) {
  const imageRef = useRef<HTMLCanvasElement>(null);

  return <ImageContext.Provider value={imageRef}>
    {children}
  </ImageContext.Provider>
}