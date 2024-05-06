"use client";
import Header from "@/components/Header";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isDarkMode, setIsDarkMode] = useState(true);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <div className="bg-background h-full flex flex-col">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {children}
    </div>
  );
}
