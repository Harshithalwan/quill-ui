"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = ({
  isDarkMode,
  setDarkMode,
}: {
  isDarkMode: boolean;
  setDarkMode: Function;
}) => {
  const {push} = useRouter()
  return (
    <div className="p-2">
      <div className="h-12 z-10 flex items-center gap-2 p-2 bg-accent justify-between rounded w-full sticky">
        <div>
          <Image
            className="p-4"
            src={"/logo/png/quill-favicon-color.png"}
            alt="logo"
            width={70}
            height={70}
            onClick={() => push('/')}
          />
        </div>
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            className="toggle [--tglbg:yellow] bg-blue-500 hover:bg-blue-700 border-blue-500"
            checked={!isDarkMode}
            onChange={() => {
              setDarkMode(!isDarkMode);
            }}
          />
          <div
            id="g_id_onload"
            data-client_id="870349579305-sgo9v4hi5eeh69kjnp83ap98f4k6af3i.apps.googleusercontent.com"
            data-login_uri="https://your.domain/your_login_endpoint"
            data-auto_prompt="false"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left"
          ></div>
          <button className="btn btn-circle btn-ghost">
            <div className="avatar placeholder">
              <div className="text-neutral-content rounded-full w-8 bg-primary-900">
                <span className="">HH</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
