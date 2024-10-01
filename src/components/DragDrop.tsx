import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["gltf", "glb"];

const DragDrop = () => {
  const handleChange = (file: unknown) => {
    console.log("Dropped file", file);
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
