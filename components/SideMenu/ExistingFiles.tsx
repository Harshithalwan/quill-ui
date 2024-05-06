import { FilesContextType, FilesContext } from "@/context/FilesContext";
import { useCallback, useContext } from "react";

const ExistingFiles = () => {
  const { selectedFiles, setSelectedFiles } = useContext<FilesContextType>(FilesContext);
  return (
    <div>
      <p className="p-4 text-text font-bold">
        {/* Add from one of the example files */}
      </p>
      <FilesList
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </div>
  );
};

const FILES = [
  {
    src: "./Metamorphosis.pdf",
    cover: "./Metamorphosis-cover.jpg",
    name: "Metamorphosis",
    id: "32d9435a-bf00-4b33-b529-e83205899917",
  },
  {
    src: "./Metamorphosis.pdf",
    cover: "./java-cover.jpg",
    name: "Functional Programming in Java",
    id: "e2f411e2-5719-419a-b917-ba0115c92860",
  },
  {
    src: "./DesignPrinciplesAndPatterns.pdf",
    cover: "./robertMartin.jpg",
    name: "Design Principles And Patterns",
    id: "54da159d-8ca9-43e9-8117-8c8dc91b0c84",
  },
  {
    src: "./DesignPrinciplesAndPatterns.pdf",
    cover: "./hitchhikers-cover.jpg",
    name: "Hitchhiker's guide to the galaxy",
    id: "0c03eb5a-978a-4b24-913a-ea706799bec4",
  },
  {
    src: "./DesignPrinciplesAndPatterns.pdf",
    cover: "./leoTolstoy.jpg",
    name: "How much land does a man need",
    id: "7c8d6898-46fb-4cb5-bb42-c86c55c919b3",
  },
  {
    src: "./DesignPrinciplesAndPatterns.pdf",
    cover: "./theStranger.png",
    name: "The Stranger",
    id: "c7463c6a-abf2-41ba-93d8-6f8d7ad3f1e6",
  },
];

const FilesList = ({
  selectedFiles,
  setSelectedFiles,
}: {
  selectedFiles: any;
  setSelectedFiles: any;
}) => {
  const { chatStarted } = useContext<FilesContextType>(FilesContext);
  const onFileSelect = useCallback(
    (checkbox: { checked: any }, file: any) => {
      if (checkbox.checked) {
        setSelectedFiles([...selectedFiles, file]);
      } else {
        setSelectedFiles(
          selectedFiles.filter(
            (selectedFile: any) => selectedFile.id !== file.id
          )
        );
      }
    },
    [selectedFiles, setSelectedFiles]
  );
  return (
    <div className="overflow-x-auto text-text p-2">
      <table className="table">
        <tbody>
          {FILES.map((file) => {
            return (
              <tr key={file.id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      disabled={chatStarted}
                      className="checkbox checkbox-primary"
                      onChange={(e) => onFileSelect(e.target, file)}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={file.cover} alt={file.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{file.name}</div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExistingFiles;
