import { useState } from "react";
import type { ReactNode } from "react";
import { ImageReadyContext } from "../context/ImageReadyContext";

export default function ImageReadyProvider({ children }: { children: ReactNode }) {
  
  const [isReady, setReady] = useState<boolean>(false);
  return <ImageReadyContext.Provider value={[isReady, setReady]}>
    {children}
  </ImageReadyContext.Provider>
}