import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  Search,
  PlusSquareIcon,
  LoaderIcon,
  RefreshCcwDot,
} from "lucide-react";
import { interestsArray, Shuffleinterests } from "../utils/DataLists";
import { UserStore } from "../Stores/UserStore";
import Interest from "../components/Interest";
import toast from "react-hot-toast";

const AddInterests = () => {
  const { AddInterests, isLoading, GetProfile } = UserStore();
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [searchInterest, setSearchInterest] = useState("");
  const [interestsList, setInterestsList] = useState(
    Shuffleinterests(interestsArray)
  );

  const handleInterestsSubmit = async (e) => {
    e.preventDefault();
    if (interests.length >= 5) {
      const addInterests = AddInterests(interests);
      toast.success(
        "Added Interests to your Profile. Enjoy Personalized responses"
      );
      addInterests && navigate("/");
    } else {
      toast.error("Please select at least 5 interests.");
    }
  };

  const handleInterestClick = async (e) => {
    const newInterest = e.target.innerText;
    if (interests.includes(newInterest)) {
      setInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== newInterest)
      );
      e.target.classList.add("bg-gradient-to-r");
    } else {
      setInterests((prevInterests) => [...prevInterests, newInterest]);
      e.target.classList.remove("bg-gradient-to-r");
    }
  };

  const handleInterestAdd = (e) => {
    e.preventDefault();
    if (searchInterest.length > 1 && !interests.includes(searchInterest)) {
      setInterests((prevInterests) => [...prevInterests, searchInterest]);
      setSearchInterest("");
    } else {
      toast.error(
        "New interest should be meaningfull, unique(not added before) and more than 2 chars"
      );
    }
  };

  useEffect(() => {
    document.title = "Add Interests for Personalization"
    const fetchProfile = async () => {
      const user = await GetProfile();
      if (user) {
        setInterests(user.interests);
      }
    };
    fetchProfile();
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);

  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className=" min-w-screen min-h-screen bg-black flex flex-col justify-center items-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className=" w-[95%] relative sm:w-[700px] px-[2px] bg-slate-900 rounded-lg border border-slate-600 shadow-2xl shadow-blue-700"
        >
          <div className="text-white text-center sticky top-0 left-0 pt-5 pb-2 px-2 mx-1 bg-slate-900 rounded-lg rounded-t-none z-50 border-slate-700 border-b-2">
            {/* HEADING START HERE */}
            <h1
              className="text-2xl mb-1 font-bold tracking-wide"
              style={{ fontFamily: "verdana" }}
            >
              ADD INTERESTS TO YOUR PROFILE
            </h1>
            <h4 className="text-gray-400 mb-2">
              Add many To get Personalized responses relatable to your interests
              with Friendly PAI ❤
            </h4>
            {/* HEADING END HERE */}

            {/* SEARCH , ADD , REFRESH AND SUBMIT STARTS HERE */}
            <div className="flex gap-2 items-center">
              <Input
                icon={Search}
                value={searchInterest}
                onChange={(e) => {
                  setSearchInterest(e.target.value);
                }}
                type="search"
                placeholder="Search Interests"
              />
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInterestAdd}
                title="Add your own specific Interest."
              >
                <PlusSquareIcon className="size-10" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setInterestsList(Shuffleinterests(interestsArray));
                  window.scrollTo(0,0)
                }}
                title="Refresh the Interests List."
              >
                <RefreshCcwDot className="size-10" />
              </motion.div>
              <form className="w-full" onSubmit={handleInterestsSubmit}>
                <Button
                  text={
                    isLoading ? (
                      <LoaderIcon className="m-auto animate-spin" />
                    ) : (
                      "SUBMIT"
                    )
                  }
                />
              </form>
            </div>
            {/* SEARCH , ADD , REFRESH AND SUBMIT ENDS HERE */}
          </div>

          {/* INTERESTS LIST START HERE */}

          <div
            className="w-full grid sm:grid-cols-3 grid-cols-2 justify-center items-center gap-3 px-1 py-2 pb-8 sm:px-2"
          >
            {/* ADDED INTERESTS START HERE */}
            <div
              className="flex overflow-x-auto gap-3 pb-3 col-span-2 sm:col-span-3 overflow-y-hidden"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1e40af black ",
              }}
            >
              {interests.map((interest, index) => {
                return (
                  <div className="flex-shrink-0" key={index}>
                    <Interest
                      text={interest}
                      textSize={"text-sm"}
                      padding={"p-1 px-2"}
                      rounded={"rounded-md"}
                      handleInterestClick={handleInterestClick}
                    />
                  </div>
                );
              })}
            </div>
            {/* ADDED INTERESTS END HERE */}

            <h4 className="text-blue-500 text-xl -mt-3 col-span-2 sm:col-span-3 text-center">
              Select at least 5 interests.
            </h4>

            {interestsList
              .filter((interests) =>
                interests.toLowerCase().includes(searchInterest.toLowerCase())
              )
              .map((interest, idx) => {
                if (interests.includes(interest))
                  return (
                    <Interest
                      text={interest}
                      key={idx}
                      handleInterestClick={handleInterestClick}
                      noGradient={true}
                    />
                  );
                return (
                  <Interest
                    text={interest}
                    key={idx}
                    handleInterestClick={handleInterestClick}
                  />
                );
              })}
          </div>

          {/* INTERESTS LIST END HERE */}
        </motion.div>
      </div>
    </>
  );
};

export default AddInterests;
