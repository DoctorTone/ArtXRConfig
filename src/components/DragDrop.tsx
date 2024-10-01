import { FileUploader } from "react-drag-drop-files";
import useStore from "../state/store";

const fileTypes = ["gltf", "glb"];

const DragDrop = () => {
  const setFile = useStore((state) => state.setFile);
  const handleChange = (file: File) => {
    console.log("Dropped", file.name);
    setFile(file);
  };

  return (
    <div id="dropIt" className="panel">
      <h1>Drag and drop here</h1>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
    </div>
  );
};

export default DragDrop;
