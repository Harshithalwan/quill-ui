import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { socket } from "@/utils/socket";
import "./styles.css";

import { FaLock } from "react-icons/fa";
import { FilesContextType, FilesContext } from "@/context/FilesContext";
import { RxReset } from "react-icons/rx";

const ChatWindow = ({ socketInstance, setFileSectionOpen }: { socketInstance: any, setFileSectionOpen?: any }) => {
  const [messageList, setMessageList] = useState<
    { text: string; sender: string }[]
  >([]);
  const { selectedFiles, chatStarted, setSelectedFiles, setChatStarted } =
    useContext<FilesContextType>(FilesContext);
  const [message, setMessage] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    socketInstance.on("message", (msg: any) => {
      setWaitingForResponse(false);
      setMessageList((prevMessages) =>
        prevMessages.concat({
          text: msg,
          sender: "system",
        })
      );
    });
    return () => {
      socketInstance.off("message");
    };
  }, [socketInstance]);

  const onReset = useCallback(() => {
    setSelectedFiles([]);
    setChatStarted(false);
    setFileSectionOpen(true);
    socketInstance.disconnect();
  }, []);

  const sendMessage = useCallback(
    (userMessage: string) => {
      console.log("Sending.....", selectedFiles);
      socketInstance.emit("message", {
        userMessage,
        ids: selectedFiles.map((file: { id: any }) => file.id),
      });
      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "user" },
      ]);
      setMessage("");
    },
    [selectedFiles, socketInstance]
  );

  return (
    <div className="h-full rounded p-2 border border-text">
      <div className="h-full flex flex-col justify-end overflow-y-auto">
        {chatStarted && selectedFiles.length > 0 && (
          <div className="text-black font-bold flex justify-between items-center">
            <details className="dropdown flex flex-grow p-4 m-2 rounded-lg bg-primary">
              <summary className="">
                Chatting with{" "}
                <span className="link text-blue-600">
                  {selectedFiles.length}
                </span>{" "}
                files
              </summary>
              <div className="p-2 pl-4">
                {selectedFiles.map((file: any) => (
                  <div className="list-item" key={file.id}>
                    {file.name}
                  </div>
                ))}
              </div>
            </details>
            <button title="Reset chat" className="btn btn-ghost text-text" onClick={onReset}>
              <RxReset size={20} />
            </button>
          </div>
        )}
        {chatStarted ? (
          <div className="p-4 h-full overflow-y-auto flex flex-col">
            <MessageList messageList={messageList} />
            {waitingForResponse && <Loader />}
          </div>
        ) : (
          <div className="flex justify-center h-full items-center text-text opacity-60">
            <FaLock />
            <p className="p-4">Unlock by adding a file</p>
          </div>
        )}
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (message && message.trim() !== "") {
              setWaitingForResponse(true);
              sendMessage(message);
            }
          }}
        >
          <div className="flex w-full flex-nowrap items-center p-1 rounded-lg">
            <input
              placeholder="Ask me anything about the document."
              disabled={!chatStarted}
              className="input w-full bg-black input-secondary"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></input>
            <button
              type="submit"
              disabled={!chatStarted}
              className="p-2 m-2 bg-green-400 text-black rounded-full hover:bg-green-500 transition-all"
            >
              <IoMdSend size={24} className="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

type MesssageType = {
  text: string;
  sender: string;
};

const Loader = () => {
  return (
    <span className="loading loading-spinner loading-sm text-black dark:text-white"></span>
  );
};
const CurrentResponse = ({ message }: { message: string }) => {
  if (message && message.trim()) {
    return (
      <div className={`chat chat-start`}>
        <div className="chat-bubble chat-bubble-secondary">{message}</div>
      </div>
    );
  } else {
    return <></>;
  }
};

const MessageList = ({ messageList }: { messageList: MesssageType[] }) => {
  if (messageList && messageList.length !== 0) {
    return (
      <>
        {messageList.map((msg) => (
          <MessageComponent key={msg.text} message={msg} />
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

const MessageComponent = ({ message }: { message: MesssageType }) => {
  if (message.sender === "user") {
    return (
      <div className={`chat chat-end`}>
        <div className="chat-bubble chat-bubble-primary">{message.text}</div>
      </div>
    );
  } else {
    return (
      <div className={`chat chat-start`}>
        <div className="chat-bubble chat-bubble-secondary">{message.text}</div>
      </div>
    );
  }
};
export default ChatWindow;
