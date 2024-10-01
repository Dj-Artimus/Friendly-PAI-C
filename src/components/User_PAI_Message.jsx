import React, { useEffect } from "react";
import FriendlyPAI_icon from "../images/Friendly_PAI.png";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "./style/chatMsg.css";
import ImageOff  from "../images/empty-img.webp";

const User_PAI_Message = ({ USER, PAI }) => {
  const isImgContain = USER instanceof Array;
  let USERmsg = isImgContain ? USER[0] : USER;
  isImgContain && console.log(USER[1]);
  const formatedChat = (PAI) => {
    return marked(PAI, {
      highlight: (code, lang) => {
        const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
        console.log(validLang);
        hljs.highlight(code, { language: validLang }).value;
      },
    });
  };

  useEffect(() => {
    // Highlight code after component mounts
    const codeBlocks = document.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      if (!block.dataset.highlighted) {
        hljs.highlightElement(block);
        block.dataset.highlighted = "yes"; // Prevents double highlighting
      }
    });
  }, [PAI]);

  return (
    <>
      <div className="flex justify-end w-full">
        <div className="bg-blue-950 max-w-xl shadow shadow-blue-600 p-2 rounded-[14px] px-4 rounded-tr-sm break-words overflow-auto">
          {isImgContain && (
            <img
              src={USER[1]}
              onError={(e) => {
                e.target.onerror = null; // Prevent looping
                e.target.src =  ImageOff ; // Set a placeholder image
              }}
              className="my-5 w-48 max-w-fit m-auto "
            />
          )}
          {USERmsg}
        </div>
      </div>
      <div className="border border-slate-800 p-5 rounded-[14px] rounded-tl-sm max-w-3xl ">
        <img
          src={FriendlyPAI_icon}
          alt="Friendly PAI"
          className="size-8 -ms-7 -mt-7 shadow-sm shadow-sky-400 rounded-full rounded-tl-lg filter bg-gradient-to-b from-violet-300 via-pink-400 to-pink-600 border-[0.5px]"
        />
        <div className="mt-2">
          <div
            className="ps-2 break-words overflow-x-auto"
            dangerouslySetInnerHTML={{
              __html: formatedChat(PAI || ""),
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default User_PAI_Message;
