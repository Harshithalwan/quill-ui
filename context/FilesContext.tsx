import { createContext } from "react";
export type FilesContextType = {
  selectedFiles: any[];
  setSelectedFiles?: any;
  chatStarted?: boolean;
  setChatStarted?: any;
};
export const FilesContext = createContext<FilesContextType>({selectedFiles:[]});
