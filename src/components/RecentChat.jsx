import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const RecentChat = ({ text, chatId, handleDeleteChat , handleGetAllChats}) => {
  return (
    <div className="border-b border-slate-700 flex items-center gap-1">
      <div className=" w-full h-full p-3 ps-4 whitespace-nowrap overflow-hidden text-ellipsis" onClick={() => { handleGetAllChats(chatId) }}>
        {text}
      </div>
      <div>
        <motion.div
          whileHover={{ scale: "1.1" }}
          whileTap={{ scale: "0.90" }}
          className="flex-shrink-0 -ms-4 me-1"
          onClick={() => {
            handleDeleteChat(chatId);
          }}
        >
          <Trash2 className="size-[26px] opacity-50 p-1 rounded-md" />
        </motion.div>
      </div>
    </div>
  );
};

export default RecentChat;
