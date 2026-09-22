import { createContext } from "react";

type longAhhType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
export const ImageReadyContext = createContext<longAhhType | undefined>(undefined);

