import React from "react";
import FriendlyPAI_icon from '../images/Friendly_PAI.png'
import { marked } from 'marked'

const User_PAI_Message = ({ USER:USER, PAI:PAI }) => {
  return (
    <>
      <div className="flex justify-end w-full">
        <div className="bg-blue-950 shadow shadow-blue-600 p-2 rounded-[14px] px-4 rounded-tr-sm break-words overflow-auto">
          { USER }
        </div>
      </div>
      <div className="border border-slate-800 p-5 rounded-[14px] rounded-tl-sm">
        <img
          src={FriendlyPAI_icon}
          alt="Friendly PAI"
          className="size-8 -ms-7 -mt-7 shadow-sm shadow-sky-400 rounded-full rounded-tl-lg filter bg-gradient-to-b from-violet-300 via-pink-400 to-pink-600 border-[0.5px]"
        />
        <div>

        </div>
        <p
          className="ps-2 break-words overflow-x-auto"
          dangerouslySetInnerHTML={{
            __html: marked.parse(PAI),
          }}
        ></p>
      </div>
    </>
  );
};

export default User_PAI_Message;
