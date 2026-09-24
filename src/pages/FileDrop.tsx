import { useRef, useState} from "react";
import type { DragEvent, ChangeEvent } from "react";
import "./style/FileDrop.css";
import { useNavigate } from "react-router-dom";

export default function FileDrop() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [onDropArea, setOnDropArea] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  function handleClick() {
    if (!inputRef.current) return;
    inputRef.current.click();
  }

  function handleDrag(event: DragEvent<HTMLDivElement>, isOnArea: boolean) {
    event.preventDefault()
    setOnDropArea(isOnArea);
  }
  function handleImage(image: File) {
    if (!image.type.startsWith("image/")) {
      alert("Please upload a valid image format!");
      return;
    }
    const imageURL = URL.createObjectURL(image);
    setTransition(true);
    setTimeout(() => navigate("/edit", {
      state: {
        image: imageURL
      }
    }), 1000)
    // navigate("/edit");
  }
  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setOnDropArea(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleImage(event.dataTransfer.files[0]);
    }
  }
  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      handleImage(event.target.files[0]);
    }
  }

  return (
    <div className="relative bg-gray">
      <div className={`absolute transition ${transition ? "transition-active" : ""}`}></div>
      <div
        className={`flex flex-col gap-4 bg-white py-24 px-48 text-black rounded-2xl drop-area ${onDropArea ? "drop-area-active" : ""}`}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
      >
        Drop image here...
        <input
          ref={inputRef}
          onChange={handleInput}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
        <button
          type="button"
          className={`bg-black text-white rounded-2xl cursor-pointer py-1 sf-button active:bg-white`}
          onClick={handleClick}
        >
          Select File
        </button>
      </div>
    </div>
  );
}
