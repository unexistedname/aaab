import { useLocation } from "react-router-dom";
import ImageCanvas from "./ImageCanvas";

export default function ImageEditor() {
  const location = useLocation();
  const imageURL = location.state.image;

  return (
    <div className=" bg-amber-200 w-screen h-screen grid grid-cols-5 grid-rows-1">
      <div className="bg-gray-950 col-span-4 relative flex justify-center align-middle overflow-hidden">
        <ImageCanvas imageURL={imageURL} />
      </div>
      <div className="bg-white outline-2 outline-white -outline-offset-2 py-5 px-2 hover:outline-offset-8 transition-all duration-200 ease-out z-10 overflow-x-hidden overflow-y-auto flex flex-col gap-3">
        <div className="text-3xl font-bold">Colors</div>
        <div>halo</div>
      </div>
    </div>
  );
}
