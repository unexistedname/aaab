import { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

export default function useImage() {
  const context = useContext(ImageContext)
  if (!context) throw new Error("https://www.w3schools.com/react/react_usecontext.asp");
  return context;
}