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
    id: "0df6e99b-869f-4884-987d-1fc96b1f8b8b",
  },
  {
    src: "./DesignPrinciplesAndPatterns.pdf",
    cover: "./robertMartin.jpg",
    name: "Design Principles And Patterns",
    id: "42363066-149e-4a63-a317-dff6b8c6e4ff",
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
