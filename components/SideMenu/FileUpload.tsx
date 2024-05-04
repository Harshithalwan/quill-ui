import { list } from "postcss";
import { useCallback, useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import "./styles.css";

const API_URL = process.env.API_URL || "";

const FileUpload = ({}) => {
  const [files, setFiles] = useState<(string | Blob)[]>([]);
  const [uploadResponse, setUploadResponse] = useState<
    {
      code?: string;
      message?: string;
      id?: string;
    }[]
  >([]);
  // const { selectedFiles, setSelectedFiles } = useContext<any>(FilesContext);
  const removeFile = useCallback(
    (fileToRemove: { name: string }) => {
      const updatedFiles = files.filter((file) => {
        //@ts-ignore
        return file.name !== fileToRemove.name;
      });
      setFiles(updatedFiles);
    },
    [files]
  );
  const removeAllFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const fileMutation = useMutation<unknown, unknown, string | Blob>({
    mutationFn: (fileList: string | Blob) => {
      const formdata = new FormData();
      formdata.append("file", fileList);
      return fetch(API_URL + "/prepareDocuments", {
        method: "POST",
        body: formdata,
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      //@ts-ignore
      setUploadResponse(data);
    },
  });
  const prepareDocuments = useCallback(
    async (fileToUpload: string | Blob) => {
      fileMutation.mutate(fileToUpload);
    },
    [fileMutation]
  );
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-4 opacity-50 pointer-events-none">
      <div className="text-text font-bold text-wrap">Coming Soon</div>
      {/* <div className="text-text font-bold text-wrap">Add file</div> */}
      <input
        type="file"
        id="fileUpload"
        accept=".pdf"
        onChange={(e) => {
          const newFiles =
            e && e.target && e.target.files ? e.target.files : [];
          let iterator = newFiles[Symbol.iterator]();
          let list = [];
          // @ts-ignore
          for (let file of iterator) {
            list.push(file);
          }
          // fileMutation.mutate(list);
          setFiles([...files, ...list]);
        }}
        className="file-input file-input-primary opacity-30"
      ></input>
      <FilesList
        files={files}
        removeFile={removeFile}
        removeAllFiles={removeAllFiles}
        prepareDocuments={prepareDocuments}
        readOnly={"success" === fileMutation.status}
      />
    </div>
  );
};

const FilesList = ({
  files,
  removeFile,
  removeAllFiles,
  prepareDocuments,
  readOnly,
}: {
  files: (string | Blob)[];
  removeFile: Function;
  removeAllFiles: Function;
  prepareDocuments: Function;
  readOnly: boolean;
}) => {
  if (!files || !files.length) return <></>;
  return (
    <>
      <div className="flex flex-col gap-2 border rounded-lg">
        {files.map((file) => {
          return (
            //@ts-ignore
            <div key={file.name} className="rounded-xl">
              <div className="flex items-center justify-between flex-wrap">
                <div className="p-4 w-auto link text-blue-400">
                  {
                    //@ts-ignore
                    file?.name
                  }
                </div>
                <div className="p-4">
                  {readOnly ? (
                    <FaCheckCircle color="green" size={24} />
                  ) : (
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        removeFile(file);
                      }}
                    >
                      <MdDelete color="red" size={24} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {!readOnly ? (
          <div className="p-4 flex flex-row justify-center gap-4">
            <button
              className="btn w-2/3 btn-primary bg-primary hover:bg-primary hover:shadow-lg"
              onClick={() => {
                prepareDocuments(files[0]);
              }}
            >
              Upload
            </button>
            <button
              className="btn btn-ghost border border-text hover:shadow-lg"
              onClick={() => removeAllFiles()}
            >
              Remove All
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default FileUpload;
