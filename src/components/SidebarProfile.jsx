import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ClipboardPen, UserPen } from "lucide-react";
import Button from "./Button";
import "./style/sidebar.css";
import Interest from "./Interest";
import { UserStore } from "../Stores/UserStore";
import { useNavigate } from "react-router-dom";

const SidebarProfile = ({ showProfileBar, setShowProfileBar , handleLogout }) => {
  const [userProfile, setUserProfile] = useState({})
  const { GetProfile } = UserStore()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async () => { 
      const user = await GetProfile();
      setUserProfile(user)
    };
    fetchProfile()
  }, [])
  
  return (
        <div
          className={`bg-slate-900 w-full min-h-screen shadow-2xl shadow-blue-900 border-2 border-slate-800 p-2 overflow-y-auto absolute top-0 left-0 transition-transform ${showProfileBar ? 'translate-x-0': '-translate-x-full sm:-translate-x-[110%]'}`}
          style={{ scrollbarWidth: "none" }}
        >
          {/* BACK BUTTON STARTS HERE */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute w-fit top-4 right-3"
              onClick={() => { setShowProfileBar(!showProfileBar)}}
            >
              <ChevronLeft className="size-5" />
            </motion.div>
          </div>
          {/* BACK BUTTON ENDS HERE */}

          {/* PROFILE START HERE */}
          <div className="px-3">
            <div>
              <h1 className="text-xl text-white font-bold m-3">Profile</h1>
            </div>
            <hr className="my-2 border-slate-700" />
            <div className="px-3">
              <div className="my-1">
                <p className="text-slate-400 text-sm">Name</p>
                <h1 className="text-lg font-semibold"> {userProfile?.name} </h1>
              </div>
              <div className="my-1">
                <p className="text-slate-400 text-sm">Email</p>
                <h1 className="text-lg font-semibold overflow-x-auto" style={{scrollbarWidth:"none"}} > {userProfile?.email} </h1>
              </div>
            </div>
            <hr className="my-4 border-slate-700" />
          </div>
          {/* PROFILE ENDS HERE */}

          {/* PERSONAL INFO STARTS HERE */}
          <div className="px-3">
            <div className="flex justify-between items-center">
              <h1 className="text-xl text-white font-bold m-1 ms-3">
                Personal Info
              </h1>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-fit h-fit"
                onClick={() => { navigate('/profile') }}
              >
                <UserPen className="size-5" />
              </motion.div>
            </div>
            <hr className="my-2 border-slate-700" />
            <div className="px-3">
              <div className="my-1">
                <p className="text-slate-400 text-sm">Nickname</p>
                <h1 className="text-lg font-semibold"> {userProfile?.nickname} </h1>
              </div>
              <div className="my-1">
                <p className="text-slate-400 text-sm">Age</p>
                <h1 className="text-lg font-semibold"> {userProfile?.age} </h1>
              </div>
              <div className="my-1">
                <p className="text-slate-400 text-sm">Gender</p>
                <h1 className="text-lg font-semibold"> {userProfile?.gender} </h1>
              </div>
              <div className="my-1">
                <p className="text-slate-400 text-sm">Education Level</p>
                <h1 className="text-lg font-semibold"> {userProfile?.education} </h1>
              </div>
            </div>
          </div>
          {/* PERSONAL INFO ENDS HERE */}

          <hr className="my-4 border-slate-700" />

          {/* INTERESTS STARTS HERE */}
          <div className="mb-8">
          <div className="flex justify-between items-center mb-4 ps-3 px-4">
              <h1 className="text-xl text-white font-bold m-1 ms-3">
                Interests
              </h1>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-fit h-fit"
                onClick={() => { navigate('/add-interests') }}
              >
                <ClipboardPen className="size-5" />
              </motion.div>
            </div>
            <div
                className="flex overflow-x-auto gap-3 pb-3 col-span-2 sm:col-span-3 overflow-y-hidden mx-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#1e40af black ",
                }}
              >
                {userProfile?.interests?.map((interest, idx) => {
                  return (
                    <div className="flex-shrink-0" key={idx}>
                      <Interest
                        text={interest}
                        textSize={"text-sm"}
                        padding={"p-1 px-2"}
                        rounded={"rounded-md mb-2"}
                      />
                    </div>
                  );
                })}
              </div>
          </div>
          {/* INTERESTS ENDS HERE */}

          {/* LOGOUT BUTTON START HERE */}
          <div className="px-10 mb-8" onClick={ handleLogout }>
          <Button text={"LOGOUT"} type={"button"} color={"bg-red-600"} />
          </div>
          {/* LOGOUT BUTTON ENDS HERE */}

          {/* FOOTER STARTS HERE */}
          <div className="w-full text-center mt-3 mb-36">
            <h1 className="text-xl">
              Love from
              <motion.div
                whileHover={{ scale: "4" }}
                whileTap={{ scale: "0.75" }}
                className="transition-all inline-block px-1"
              >
                ❤
              </motion.div>
              Friendly PAI
              <br />
            </h1>
            <h2 className="text-sm text-slate-200">
              Developed by DjArtimus <br />
              &copy; 2024 Friendly PAI
            </h2>
          </div>
          {/* FOOTER ENDS HERE */}
        </div>
  );
};

export default SidebarProfile;