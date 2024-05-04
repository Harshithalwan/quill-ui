"use client";
import { Suspense, useContext } from "react";
import { useQuery } from "react-query";
import FileUpload from "./FileUpload";
import ExistingFiles from "./ExistingFiles";
import { FilesContext } from "@/app/chat/page";

const SideMenu = ({ socketInstance }: { socketInstance: any }) => {
  const { selectedFiles, setChatStarted, chatStarted, setSelectedFiles } =
    useContext<any>(FilesContext);
  const onAddToChat = () => {
    setChatStarted(true);
    socketInstance.connect();
  };
  const onCancel = () => {
    setSelectedFiles([])
  };

  return (
    <div className="border border-text rounded-lg flex flex-col overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <div className="p-4 text-xl font-bold text-text">
          Start by adding a file
        </div>
        <ExistingFiles />
        <details className="dropdown flex flex-grow-0 p-4">
          <summary className="btn opacity-70">Add new files</summary>
          <FileUpload />
        </details>
        {selectedFiles.length > 0 && !chatStarted && (
          <div className="text-text flex gap-4 flex-grow p-4 justify-center items-end">
            <button
              className="btn btn-primary bg-primary flex-grow"
              onClick={onAddToChat}
            >
              Add to chat
            </button>
            <button className="btn btn-ghost border border-text" onClick={onCancel}>Cancel</button>
          </div>
        )}
      </Suspense>
    </div>
  );
};

const DummyData = ({}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      fetch("https://dummyjson.com/products/1").then((r) => r.json()),
    suspense: true,
  });
  return <div>{JSON.stringify(data)}</div>;
};

function Loading() {
  return <h2>Loading...</h2>;
}
export default SideMenu;