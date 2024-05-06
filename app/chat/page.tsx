"use client";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import SideMenu from "@/components/SideMenu/SideMenu";
import { FilesContext } from "@/context/FilesContext";
import { socket } from "@/utils/socket";
import { useContext, useEffect, useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { QueryClient, QueryClientProvider } from "react-query";

const Page = () => {
  const queryClient = new QueryClient();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [socketInstance] = useState(socket);
  const [chatStarted, setChatStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    }
  }, [])

  useEffect(() => {
    return function cleanup() {
      socketInstance.disconnect();
    };
  }, [socketInstance]);
  return (
    <FilesContext.Provider
      value={{ selectedFiles, setSelectedFiles, chatStarted, setChatStarted }}
    >
      <QueryClientProvider client={queryClient}>
        <div className="flex p-4 flex-col sm:flex-row flex-grow overflow-x-auto gap-2 min-h-0">
          {isMobile ? (
            <MobileMenu socketInstance={socketInstance} />
          ) : (
            <>
              <div className="sm:w-1/3 h-full flex flex-shrink-0">
                <SideMenu socketInstance={socketInstance} />
              </div>
              <div className="overflow-y-auto flex-auto">
                <ChatWindow socketInstance={socketInstance} />
              </div>
            </>
          )}
        </div>
      </QueryClientProvider>
    </FilesContext.Provider>
  );
};

const MobileMenu = ({ socketInstance }: any) => {
  const [fileSectionOpen, setFileSectionOpen] = useState(true);
  const { selectedFiles } = useContext<any>(FilesContext);
  return (
    <>
      <div className="border border-text rounded-md">
        <ul className="menu menu-horizontal rounded-box w-full flex justify-around gap-0">
          <li>
            <a className={fileSectionOpen ? `bg-base-200 text-white` :`bg-primary text-black` } onClick={() => setFileSectionOpen(true)}>
              <LuFiles size={24} />
              Files
              <span className="badge badge-sm">{selectedFiles.length}</span>
            </a>
          </li>
          <li>
            <a
              className={!fileSectionOpen ? `bg-base-200 text-white` : `bg-green-400 text-black`}
              onClick={() => setFileSectionOpen(false)}
            >
              <IoChatbubbleOutline size={24} />
              Chat
            </a>
          </li>
        </ul>
      </div>
      {fileSectionOpen ? (
        <MobileFileSection socketInstance={socketInstance} setFileSectionOpen={setFileSectionOpen}/>
      ) : (
        <div className="flex-1">
          <ChatWindow socketInstance={socketInstance} setFileSectionOpen={setFileSectionOpen} />
        </div>
      )}
    </>
  );
};

const MobileFileSection = ({ socketInstance, setFileSectionOpen }: any) => {
  return (
    <div className="flex-1 flex overflow-y-auto">
      <SideMenu socketInstance={socketInstance} setFileSectionOpen={setFileSectionOpen} />
    </div>
  );
};

export default Page;
