"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { push } = useRouter();
  return (
    <main className={`fixed overflow-y-auto h-full ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background h-full">
        <Header setDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
        <div className="p-4">
          <div className="z-10 flex item justify-start sm:flex-row flex-col items-center gap-8">
            <Image
              className="p-4"
              src={
                isDarkMode
                  ? "/logo/png/logo-no-background.png"
                  : "/logo/png/light-logo-no-background.png"
              }
              alt="logo"
              width={200}
              height={200}
            />
            <p className="text-text p-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            
          </div>
          <div className="p-8 w-full flex items-center justify-center">
              <button
                className="btn btn-primary bg-primary w-1/2 sm:w-72 btn-circle"
                onClick={() => push("/chat")}
              >
                Try Quill Now
              </button>
            </div>
        </div>
      </div>
    </main>
  );
}
