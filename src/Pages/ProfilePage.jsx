import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Input from "../components/Input";
import { ClipboardPenIcon, GemIcon, LoaderIcon, User } from "lucide-react";
import Dropdown from "../components/Dropdown";
import { genders, months, educations} from "../utils/DataLists";
import { UserStore } from "../Stores/UserStore";
import { AuthStore } from "../Stores/AuthStore";

const ProfilePage = () => {
  const [showError, setShowError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [profileData, setProfileData] = useState({
    nickname: "",
    date: "",
    month: "",
    year: "",
    gender: "",
    education: "",
  });
  const [isProfileExist, setIsProfileExist] = useState(false)
  const [isInterestsExist, setIsInterestsExist] = useState(false)
  const { CreateProfile , isLoading } = UserStore();
  const navigate = useNavigate();

  const { GetProfile } = UserStore()

  useEffect(() => {
    document.title = "Profile | Friendly PAI"
    const fetchProfile = async () => { 
      const user = await GetProfile();
      if (user){        
        setProfileData({
          nickname: user.nickname,
          date: user.dob[0],
          month: user.dob[1],
          year: user.dob[2],
          gender: user.gender,
          education: user.education,
        })
        setIsProfileExist(true);
        if(user.interests) setIsInterestsExist(true);
      }
    };
    fetchProfile()
  }, [])

  const handleProfileData = (e) => {
    setShowError(false);
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    const { nickname, date, month, year, gender,education } =
    profileData;
    const dob = [date, month, year];
    const age = new Date().getFullYear() - new Date(`${date}/${month}/${year}`).getFullYear();
    if (
      nickname &&
      date &&
      month &&
      year &&
      gender &&
      education &&
      Number(date) < 32 &&
      Number(year) < 2200 &&
      Number(year) > 1800 &&
      Number(age) > 5
    ) {
      const profile = CreateProfile(
        nickname,
        dob,
        age,
        gender,
        education
      );
      
      isProfileExist && isInterestsExist ? profile && navigate('/') : profile && navigate("/add-interests");
    } else {
      setShowError(true);
    }
  };
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
          className=" w-[95%] sm:w-[400px] pt-8 pb-16 bg-slate-900 rounded-lg backdrop-blur-md"
        >
          <div className="text-white text-center -mb-5">
            <h1
              className="text-2xl mb-1 font-bold tracking-wide"
              style={{ fontFamily: "verdana" }}
            >
              SET UP YOUR PROFILE
            </h1>
            <h4 className="text-gray-400">
              To Connect and get Personalized responses <br /> with Friendly PAI
              ❤{" "}
            </h4>
            {showError && (
              <h4 className="text-red-700 text-sm mb-7 mt-3">
                Please enter valid information.
              </h4>
            )}
          </div>
          <form
            onSubmit={handleProfile}
            className="w-full h-full flex flex-col justify-center items-center gap-5 px-4 sm:px-8"
          >
            <Input
              value={profileData.nickname}
              onChange={handleProfileData}
              name="nickname"
              icon={User}
              type="text"
              placeholder="Nickname"
            />
            <div className="flex gap-2">
              <Input
                value={profileData.date}
                onChange={handleProfileData}
                name="date"
                type="number"
                placeholder="Date"
                style={{ paddingLeft: "16px", paddingBottom: "9px" }}
              />
              <Input
                onClick={() => {
                  setShowDropdown("months");
                }}
                type="text"
                placeholder="Month"
                value={profileData.month}
                style={{ paddingLeft: "16px", paddingBottom: "9px" }}
                readOnly
              />
              {showDropdown === "months" && (
                <Dropdown
                  name="month"
                  dropdownList={months}
                  handleProfileData={handleProfileData}
                  showDropdown={showDropdown}
                  setShowDropdown={setShowDropdown}
                />
              )}
              <Input
                value={profileData.year}
                onChange={handleProfileData}
                name="year"
                type="number"
                placeholder="Year"
                style={{ paddingLeft: "16px", paddingBottom: "9px" }}
              />
            </div>
            <Input
              onClick={() => {
                setShowDropdown("genders");
              }}
              value={profileData.gender}
              icon={GemIcon}
              type="text"
              placeholder="Gender"
              readOnly
            />
            {showDropdown === "genders" && (
              <Dropdown
                name="gender"
                dropdownList={genders}
                handleProfileData={handleProfileData}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              />
            )}

            <Input
              onClick={() => {
                setShowDropdown("educations");
              }}
              value={profileData.education}
              icon={ClipboardPenIcon}
              type="text"
              placeholder="Education"
              readOnly
            />
            {showDropdown === "educations" && (
              <Dropdown
                name="education"
                dropdownList={educations}
                handleProfileData={handleProfileData}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              />
            )}

            <Button text={ isLoading ? (<LoaderIcon className="m-auto animate-spin" />) : ("NEXT")}
            />
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePage;
