"use client";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import FileUpload from "@/components/SideMenu/FileUpload";
import SideMenu from "@/components/SideMenu/SideMenu";
import { socket } from "@/utils/socket";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { QueryClient, QueryClientProvider } from "react-query";

export const FilesContext = createContext<any>({});
const Page = () => {
  const queryClient = new QueryClient();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [socketInstance] = useState(socket);
  const [chatStarted, setChatStarted] = useState(false);
  useEffect(() => {
    return function cleanup() {
      socketInstance.disconnect();
    };
  }, []);
  const [isMobile] = useState(window.matchMedia("(max-width: 640px)").matches); // Example breakpoint for mobile
  return (
    <FilesContext.Provider
      value={{ selectedFiles, setSelectedFiles, chatStarted, setChatStarted }}
    >
      <QueryClientProvider client={queryClient}>
        <div className="flex p-4 flex-col sm:flex-row flex-grow gap-4 min-h-0">
          {isMobile ? (
            <MobileMenu socketInstance={socketInstance} />
          ) : (
            <div className="h-full flex">
              <SideMenu socketInstance={socketInstance} />
            </div>
          )}
          <div className="sm:w-1/3 overflow-y-auto flex-1">
            <ChatWindow socketInstance={socketInstance} />
          </div>
        </div>
      </QueryClientProvider>
    </FilesContext.Provider>
  );
};

const MobileMenu = ({ socketInstance }: any) => {
  const [open, setOpen] = useState(false);
  const { selectedFiles } = useContext<any>(FilesContext);
  return (
    <>
      <div className="border border-text rounded-md">
        <ul className="menu menu-horizontal rounded-box w-full flex justify-around gap-0">
          <li>
            <a className="bg-primary text-black" onClick={() => setOpen(!open)}>
              <LuFiles size={24} />
              Files
              <span className="badge badge-sm">{selectedFiles.length}</span>
            </a>
          </li>
          <li>
            <a
              className="bg-green-400 text-black"
              onClick={() => setOpen(false)}
            >
              <IoChatbubbleOutline size={24} />
              Chat
            </a>
          </li>
        </ul>
      </div>
      {open && <MobileFileSection socketInstance={socketInstance} />}
    </>
  );
};

const MobileFileSection = ({ socketInstance }: any) => {
  return (
    <div className="sticky w-full pt-4">
      <SideMenu socketInstance={socketInstance} />
    </div>
  );
};

export default Page;
