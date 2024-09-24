import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LoaderIcon, Mail } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthStore } from "../Stores/AuthStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { ForgotPassword, isLoading } = AuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forgot Password"
  }, [])
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const forgotPassword = await ForgotPassword(email);
    forgotPassword && navigate("/forgot-password-confirmation");
  };
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
        className=" w-4/5 sm:w-[400px] pt-8 pb-16  bg-slate-900 rounded-lg backdrop-blur-md"
      >
        <div className="text-white text-center">
          <h1
            className="text-2xl font-bold tracking-wide"
            style={{ fontFamily: "verdana" }}
          >
            Forgot Password !
          </h1>
          <h4>Enter your registered email address to Reset the Password </h4>
        </div>
        <form
          onSubmit={handleForgotPassword}
          className="w-full h-full flex flex-col justify-center items-center gap-5 px-4 sm:px-8"
        >
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            icon={Mail}
            type="email"
            placeholder="Email"
            name="name"
          />
          <p className="text-white mb-3 text-left w-full text-sm">
            Go back to{" "}
            <Link
              to={"/login"}
              className="font-semibold text-blue-500 hover:text-[15px] hover:underline transition-all"
            >
              Login
            </Link>
          </p>
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
      </motion.div>
    </div>
  </>
  )
}

export default ForgotPasswordPage