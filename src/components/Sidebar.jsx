import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, UserIcon } from "lucide-react";
import FriendlyPAIImg from '../images/Friendly_PAI_landing_img.png';
import RecentChat from "./RecentChat";
import "./style/sidebar.css";
import SidebarProfile from "./SidebarProfile";

const Sidebar = ({ showSidebar, setShowSidebar , recentChats , handleDeleteChat , handleGetAllChats }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [showProfileBar, setShowProfileBar] = useState(false);
  return (
    <div
      className={`bg-slate-900 w-[90%] sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-[28%] h-screen border-2 border-slate-800 p-4 overflow-y-auto absolute sm:static top-0 left-0 transition-transform transform z-10 ${
        showSidebar ? "translate-x-0" : "-translate-x-[110%]"
      } sm:translate-x-0`}
      style={{ scrollbarWidth: "none" }}
    >
      <div className="absolute top-0 left-0 w-full z-20">
        <SidebarProfile
          showProfileBar={showProfileBar}
          setShowProfileBar={setShowProfileBar}
        />
      </div>
      <div>
        {/* CANCEL BUTTON STARTS HERE */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className="w-fit sm:hidden absolute top-3 right-1 rounded-md"
        >
          <ChevronLeft className="size-7" />
        </motion.div>
        {/* CANCEL BUTTON ENDS HERE */}

        {/*  HEADING AND LOGO OF PAI START HERE*/}
        <div>
          <h1 className="text-xl text-white font-bold m-4 text-center">
            Your Personalized Companion
          </h1>
        </div>
        {/*  HEADING AND LOGO OF PAI END HERE*/}
        <hr className=" border-slate-700" />

        {/* RECENT CHATS START HERE */}
        <div className="mt-2 text-slate-200">
          <h1>Recent Chats.</h1>
          <div
            className="bg-slate-950 w-full min-h-52 sm:min-h-64 overflow-y-auto rounded-lg my-2 max-h-80 p-2 py-1 last:border-b-0"
            style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1e40af black ",
              }}
          > 
            <div>
              { recentChats?.map(( chat ) => (
                <RecentChat key={chat._id} text={ chat.latestQuery } chatId= { chat._id } handleDeleteChat = { handleDeleteChat } handleGetAllChats = {handleGetAllChats} />
                ) ) }
            </div>
          </div>
        </div>
        {/* RECENT CHATS END HERE */}
        <hr className="my-4 border-slate-700" />
        {/* PROFILE AND OTHER BUTTONS START HERE */}
        <div className="w-full flex justify-evenly items-center flex-wrap mb-4 p-2">
            <motion.div
              whileHover={{ scale: "1.04" }}
              whileTap={{ scale: "0.98" }}
              onClick={() => {
                setShowProfileBar(!showProfileBar);
              }}
              className="shadow-sm shadow-slate-300 px-2 p-1 my-2 flex items-center rounded-xl"
            >
              <UserIcon className="size-8 p-1 rounded-full" />
              <h1 className="text-xl px-1">Profile</h1>
            </motion.div>
          
            {/* <motion.div
              whileHover={{ scale: "1.1" }}
              whileTap={{ scale: "0.95" }}
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="shadow-sm h-fit shadow-slate-300 rounded-full"
            >
              {darkMode ?
                <MoonStar className="size-9 shadow-sm p-1 px-2 rounded-full" /> : 
                <CloudSunIcon className="size-9 shadow-sm p-1 px-2" />
              }
            </motion.div> */}
        </div>
        {/* PROFILE AND OTHER BUTTONS END HERE */}
        {/* <Button text={"LOGOUT"} type={"button"} color={"bg-red-600"} /> */}
        {/* FOOTER STARTS HERE */}
        <div className="flex justify-center"><motion.img whileTap={{scale: 0.85}} whileHover={{scale: 1.1}} src={FriendlyPAIImg} className=" w-52 h-auto PAIAnimation" alt="Friendly PAI" /></div>
        <div className="w-full text-center mt-3">
          <h1 className="text-xl">
            Thank you
            <motion.div
              whileHover={{ scale: "4" }}
              whileTap={{ scale: "0.75" }}
              className="transition-all inline-block px-1"
            >
              ❤
            </motion.div>
            for using
            <br />
            Friendly PAI
          </h1>
          <h2 className="text-sm">
            Developed by DjArtimus <br />
            &copy; 2024 Friendly PAI
          </h2>
        </div>

        {/* FOOTER STARTS HERE */}
      </div>
    </div>
  );
};

export default Sidebar;
