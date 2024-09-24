import React, { useEffect, useState } from "react";
import { LoaderIcon, Verified } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import "./Styles/verify.css";
import { AuthStore } from "../Stores/AuthStore";

const VerifyPage = () => {
  const [OTP, setOTP] = useState("");
  const { ResendOTP , Verify , isLoading , AuthorizationCheck } = AuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Verify Email | Friendly PAI"
  }, [])

  const handleOTP = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 6) setOTP(inputValue);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const verify = await Verify(OTP);
    verify && navigate('/profile')
  };

  const handleResend = async () => {
    await ResendOTP()
  }

  return (
    <>
      <div className=" w-screen h-screen bg-black flex flex-col justify-center items-center">
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
          className=" w-4/5 sm:w-[400px] pt-8 pb-16 bg-slate-900 rounded-lg backdrop-blur-md"
        >
          <div className="text-white text-center -mb-5">
            <h1
              className="text-2xl mb-1 font-bold tracking-wide"
              style={{ fontFamily: "verdana" }}
            >
              Verify Your Account
            </h1>
            <h4 className="text-gray-400">
              Verification Code has been sent to <br /> your email address.
            </h4>
          </div>
          <form
            onSubmit={handleVerify}
            className="w-full h-full flex flex-col justify-center items-center gap-5 px-4 sm:px-8"
          >
            <Input
              style={{textAlign:"center",paddingLeft:"0px",letterSpacing:"10px"}}
              value={OTP}
              onChange={(e) => {
                handleOTP(e);
              }}
              icon={Verified}
              type="number"
              placeholder={` ______`}
              min="100000"
              max="999999"
              minLength="6"
              maxLength="6"
            />{" "}
            <p className="text-white text-left mb-5 w-full text-sm">
              Didn't received Verification Code{" "}
              <span
                onClick={ handleResend }
                className="font-semibold text-blue-500 hover:text-[15px] hover:underline transition-all"
              >
                {" "}
                Resend
              </span>
            </p>
            <Button text={isLoading ? <LoaderIcon className="m-auto animate-spin"/> : "VERIFY"} />
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default VerifyPage;
