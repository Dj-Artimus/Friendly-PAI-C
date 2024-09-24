import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LoaderIcon, Lock } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthStore } from "../Stores/AuthStore";
import { PasswordCheck } from "../utils/PasswordChecker.js";
import PasswordMeter from "../utils/PasswordMeter";

const ResetPasswordPage = () => {
  const [passwordNote, setPasswordNote] = useState(false);
  const [passwordDontMatchNote, setPasswordDontMatchNote] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const { ResetPassword, isLoading } = AuthStore();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    document.title = "Reset Password | Friendly PAI"
  }, [])

  const handleReset = async (e) => {
    e.preventDefault();
    if (PasswordCheck(password) === 4 && confirmedPassword === password) {
      const reset = await ResetPassword( token , password );
      reset && navigate("/login");
    }else{
      setPasswordDontMatchNote(true)
      setPassword('')
      setConfirmedPassword('')
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
          className=" w-4/5 sm:w-[400px] pt-8 pb-20 bg-slate-900 rounded-lg backdrop-blur-md"
        >
          <div className="text-white text-center px-2">
            <h1
              className="text-2xl font-bold tracking-wide leading-9"
              style={{ fontFamily: "verdana" }}
            >
              SET 💪 STRONG PASSWORD
            </h1>
            <h4>Set the password and login to continue.</h4>
          </div>
          <form
            onSubmit={handleReset}
            className="w-full h-full flex flex-col justify-center items-center gap-5 px-4 sm:px-8"
          >
            <Input
              value={password}
              onChange={(e) => {
                setPasswordDontMatchNote(false);
                setPassword(e.target.value);
              }}
              onFocus={(e) => {
                setPasswordNote(true);
              }}
              icon={Lock}
              className="text-red-700"
              type="password"
              placeholder="Password"
              minLength="8"
              maxLength="16"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$&%.]).{8,16}"
            />

            <Input
              value = {confirmedPassword}
              onChange={(e) => { setConfirmedPassword(e.target.value) }}
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              name="name"
              minLength="8"
              maxLength="16"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$&%.]).{8,16}"
            />
            {passwordNote && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs text-slate-500"
              >
                <PasswordMeter password={password} />
              </motion.p>
            )}
            {passwordDontMatchNote && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs text-red-600"
              >Password not Matched, Please try again.
              </motion.p>
            )}
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

export default ResetPasswordPage;
