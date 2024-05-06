"use client";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { push } = useRouter();
  return (
    <main className={`fixed overflow-y-auto h-full`}>
      <div className="bg-background h-full w-screen flex flex-col">
        <div className="flex justify-end p-8">
          <input
            type="checkbox"
            className="toggle [--tglbg:yellow] bg-blue-500 hover:bg-blue-700 border-blue-500"
            checked={!darkMode}
            onChange={toggleDarkMode}
          />
        </div>
        <div className="p-4 pt-20">
          <div className="flex item justify-center flex-col items-center gap-8">
            <Image
              className="p-4"
              src={
                darkMode
                  ? "/logo/png/logo-no-background.png"
                  : "/logo/png/light-logo-no-background.png"
              }
              alt="logo"
              width={200}
              height={200}
            />
            {/* <p className="text-text p-4 text-xl">
              Converse with your documents
            </p> */}
          </div>
          <div className="p-8 pt-20 w-full flex items-center justify-center sm:static">
            <button
              className="btn btn-primary bg-primary w-1/2 sm:w-72 btn-circle"
              onClick={() => push("/chat")}
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
