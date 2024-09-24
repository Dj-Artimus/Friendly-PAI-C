import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LoaderIcon } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthStore } from "../Stores/AuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, isLoading } = AuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Friendly PAI"
  }, [])
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const login = await Login(email, password);
    login && navigate("/");
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
              WELCOME BACK !
            </h1>
            <h4>Your Friendly PAI is happy 😊 to see you</h4>
          </div>
          <form
            onSubmit={handleLogin}
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
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              icon={Lock}
              type="password"
              placeholder="Password"
              name="name"
            />
            <p className="text-white mb-5 text-left w-full text-sm">
              Dont have an Account.{" "}
              <Link
                to={"/signup"}
                className="font-semibold text-blue-500 hover:text-[15px] hover:underline transition-all"
              >
                SignUp
              </Link>
            </p>
            <p className="text-white text-left mb-3 -mt-6 w-full text-sm">
              <span
                onClick={() => { navigate('/forgot-password') }}
                className="font-semibold text-blue-500 hover:text-[15px] hover:underline transition-all cursor-pointer"
              >
                {" "}
                Forgot Password
              </span>
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
  );
};

export default LoginPage;
