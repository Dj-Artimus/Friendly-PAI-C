import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, CircleAlert } from "lucide-react";
import Button from "../components/Button";
import { AuthStore } from "../Stores/AuthStore";

const VerifyUserViaLink = () => {
  const { token, otp } = useParams();
  const { VerifyUser } = AuthStore();
  const [verificationMsg, setVerificationMsg] = useState("");
  const [verificationtitle, setVerificationtitle] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    document.title = "Verification Successful";
    const verify = async () => {
      const response = await VerifyUser(token, otp);
      if (response) {
        setVerificationtitle(response || "Failed to Verify");
        setVerificationMsg(`Your email address is Successfully verified. \n
                You can proceed for further process.`);
        setVerified(true);
      } else {
        setVerificationtitle("Failed to verify user.");
        setVerificationMsg("Please try again.");
        setVerified(false);
      }
    }
    verify();
  }, []);

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
            >{`${verificationtitle}`}
            </h1>
            <h4 className="my-3 text-slate-400">{verificationMsg}</h4>
          </div>

          {verified ? 
            <CheckCircle
              size={32}
              className="w-full text-center mb-6 text-green-500"
            />
           : 
            <CircleAlert
              size={32}
              className="w-full text-center mb-6 text-red-500"
            />
          }

          {verified ? 
            <NavLink to={"/profile"}>
              <Button text="PROCEED" type={"button"} />
            </NavLink>
           : 
            <NavLink to={"/verify"}>
              <Button text="PLEASE TRY AGAIN" type={"button"} />
            </NavLink>
          }
        </motion.div>
      </div>
    </>
  );
};

export default VerifyUserViaLink;
