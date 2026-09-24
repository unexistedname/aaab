import { useLocation } from "react-router-dom";
import ImageCanvas from "./ImageCanvas";
import ImageReadyProvider from "../provider/ImageReadyProvider";
import ColorInformation from "./ColorInformation";
import { useEffect, useState, type ReactNode } from "react";
import NormalInformation from "./NormalInformation";
import "./style/ImageEditor.css";

type sectionState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export default function ImageEditor() {
  const location = useLocation();
  const imageURL = location.state.image;
  const [load, setLoad] = useState<boolean>(false);
  const [information, setInformation] = useState<boolean>(true);
  const [adjustment, setAdjustment] = useState<boolean>(true);

  function handleSection([state, setState]: sectionState) {
    setState(!state);
  }

  useEffect(() => {
    (() => setLoad(true))();
  }, []);

  return (
    <ImageReadyProvider>
      <div className=" bg-white w-screen h-screen grid grid-cols-5 grid-rows-1">
        <div className="bg-white col-span-4 relative flex justify-center align-middle overflow-hidden">
          <div className="absolute top-1 left-3">
            1280px x 2160px (222222px2)
          </div>
          <div className={`relative flex justify-center align-middle w-full mb-6 mt-8 bg-gray-950 rounded-r-2xl viewport ${load ? "viewport-loaded" : ""}`}>
            <div className="absolute text-white text-2xl top-1/2 z-0 font-bold">
              Loading...
            </div>
            <ImageCanvas imageURL={imageURL} />
          </div>
        </div>
        <div className={`bg-white outline-2 outline-white -outline-offset-2 py-5 px-2 hover:outline-offset-8 transition-all duration-200 ease-out z-50 overflow-x-hidden overflow-y-auto flex flex-col gap-4 editor ${load ? "editor-loaded" : ""}`}>
          <SectionHeader
            text="Information"
            onClick={() => {
              handleSection([information, setInformation]);
            }}
          />
          <Section state={information}>
            <div className="text-2xl font-bold">RGB</div>
            <ColorInformation />
            <div className="text-2xl font-bold">HSV</div>
            <NormalInformation />
          </Section>
          <SectionHeader
            text="Adjustment"
            onClick={() => {
              handleSection([adjustment, setAdjustment]);
            }}
          />
          <Section state={adjustment}>
            <div>giugigg</div>
          </Section>
        </div>
      </div>
    </ImageReadyProvider>
  );
}

function Section({ children, state }: { children: ReactNode; state: boolean }) {
  return (
    <div
      className={`flex flex-col gap-3 transition-[height] ${state ? "h-fit" : "h-0 opacity-0"}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <div
      className="text-3xl font-bold hover:bg-gray-200 py-2 transition-all duration-300 cursor-pointer select-none"
      onClick={onClick}
    >
      {text}
    </div>
  );
}
