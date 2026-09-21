import { createContext, type RefObject } from "react";

export const ImageContext = createContext<RefObject<HTMLCanvasElement | null> | null>(null);
