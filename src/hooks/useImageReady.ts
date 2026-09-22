import { useContext } from "react";

import { ImageReadyContext } from "../context/ImageReadyContext";

export default function useImageReady() {
  const context = useContext(ImageReadyContext)
  if (!context) throw new Error("https://www.w3schools.com/react/react_usecontext.asp");
  return context; 
}