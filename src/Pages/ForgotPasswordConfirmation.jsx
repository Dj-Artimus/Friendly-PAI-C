import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Button from "../components/Button";

const ForgotPasswordConfirmationPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  useEffect(() => {
    document.title = "Forgot Password Confirmation"
  }, [])
  
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
          className=" w-4/5 sm:w-[400px] pt-8 pb-8  bg-slate-900 rounded-lg backdrop-blur-md px-5"
        >
          <div className="text-white text-center">
            <h1
              className="text-2xl font-bold tracking-wide"
              style={{ fontFamily: "verdana" }}
            >
              Password Reset Confirmation
            </h1>
            <h4 className="my-3 text-slate-400">
              Password Reset Link Successfully sent to your registered email
              address. Please Go to mail and follow the Instruction{" "}
            </h4>
          </div>
          <CheckCircle
            size={32}
            className="w-full text-center mb-6 text-green-500"
          />

          <div onClick={handleClick}>
            <Button text="LOGIN" type={"button"} />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ForgotPasswordConfirmationPage;
