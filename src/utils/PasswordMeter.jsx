import React from "react";
import { PasswordCheck } from "./PasswordChecker.js";

const PasswordMeter = ({ password }) => {
  const passwordTest = {
    length: (password.length > 7),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const passwordStrengthCheck = (password) => {
    const score = PasswordCheck(password);
    
    if (score === 0) return "text-red-700";
    if (score === 1) return "text-red-500";
    if (score === 2) return "text-orange-600";
    if (score === 3) return "text-yellow-500";
    if (score === 4) return "text-green-500";
  };

  return (
    <>
      Password length should 
      <span className={`font-semibold ${passwordTest.length ? "text-green-400" : 'text-red-400'}`}> between 8 to 16 </span>
       and contain
      <span className={`font-semibold ${passwordTest.uppercase ? "text-green-400" : 'text-red-400'}`}> UPPERCASE</span>, 
      <span className={`font-semibold ${passwordTest.lowercase ? "text-green-400" : 'text-red-400'}`}> lowercase</span>, 
      <span className={`font-semibold ${passwordTest.digit ? "text-green-400" : 'text-red-400'}`}> digit</span> and
      <span className={`font-semibold ${passwordTest.special ? "text-green-400" : 'text-red-400'}`}> #special</span> characters.
      <br></br>
      <span className={`font-bold ${passwordStrengthCheck(password)}`}>
        To keep you Safe
      </span>
    </>
  );
};

export default PasswordMeter;
