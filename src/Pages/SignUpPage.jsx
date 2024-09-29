import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, LoaderIcon } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import PasswordMeter from "../utils/PasswordMeter";
import { AuthStore } from "../Stores/AuthStore";
import { PasswordCheck } from "../utils/PasswordChecker.js";


const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordNote, setPasswordNote] = useState(false);
  const{ SignUp , isLoading } = AuthStore();
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Sign Up | Friendly PAI"
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(PasswordCheck(password)===4){
      const signUp = await SignUp(name,email,password);
      if (signUp) navigate('/verify')
    }
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
          className=" w-4/5 sm:w-[400px] pt-8 pb-16 bg-slate-900 rounded-lg backdrop-blur-md"
        >
          <div className="text-white text-center">
            <h1
              className="text-2xl font-bold tracking-wide"
              style={{ fontFamily: "verdana" }}
            >
              CREATE ACCOUNT
            </h1>
            <h4>To meet your Friendly PAI ✨</h4>
          </div>
          <form
            onSubmit={handleSignUp}
            className="w-full h-full flex flex-col justify-center items-center gap-5 px-4 sm:px-8"
          >
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              icon={User}
              type="text"
              placeholder="Name"
              autoComplete = 'username'
            />
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              icon={Mail}
              type="email"
              placeholder="Email"
              autoComplete = 'email'
            />

            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={() => {
                setPasswordNote(true);
              }}
              icon={Lock}
              className="text-red-700"
              type="password"
              placeholder="Password"
              minLength = "8"
              maxLength = "16"
              pattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$&%.]).{8,16}"
              autoComplete = "new-password"
            />
            {passwordNote && (
              <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
               className="text-xs text-slate-500">
                <PasswordMeter password={password}/>
              </motion.p>
            )}

            <p className="text-white text-left mb-5 w-full text-sm">
              Already have an Account.{" "}
              <Link
                to={"/login"}
                className="font-semibold text-blue-500 hover:text-[15px] hover:underline transition-all"
              >
                Login
              </Link>
            </p>
            <Button text={isLoading ? <LoaderIcon className="m-auto animate-spin"/> : "SUBMIT"} />
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SignUpPage;
