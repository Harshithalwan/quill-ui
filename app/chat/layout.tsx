'use client'
import Header from "@/components/Header";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <div className={`bg-background h-full flex flex-col ${isDarkMode ? 'dark' : ''}`}>
    <Header setDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
    {children}</div>
  );
}
