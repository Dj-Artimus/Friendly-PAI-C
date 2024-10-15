import React from "react";
import FriendlyPAI from "../images/Friendly_PAI_landing_img.png";
import { motion } from "framer-motion";
import Button from "../components/Button";
import TypeWriterEffect from "react-typewriter-effect";
import { NavLink } from "react-router-dom";
import "./Styles/landingPage.css";

const AnimatedTextVariants = {
  offscreen: {
    opacity: 0,
    y: 10,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

const LandingPage = () => {
  return (
    <div
      className="w-screen h-screen bg-black text-white flex p-10 pb-96 items-center flex-col overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#1e40af black " }}
    >
      <h1 className="text-4xl mb-10 mt-5 font-bold font-mono text-center">
        <TypeWriterEffect
          textStyle={{ textAlign: "center" }}
          startDelay={100}
          cursorColor="black"
          text=" Your Personalized and Friendliest Companion"
          typeSpeed={50}
        />
      </h1>
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1.1, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="flex justify-center lg:w-[42%]"
      >
        <img
          className="PAIAnimation "
          src={FriendlyPAI}
          alt="Friendly PAI"
        />
      </motion.div>
      <h1 className="text-5xl my-10 font-bold font-mono text-center">
        <TypeWriterEffect
          textStyle={{ textAlign: "center" }}
          startDelay={4000}
          cursorColor="black"
          text="Friendly PAI"
          typeSpeed={80}
        />
      </h1>
      <motion.div
        whileHover={{ scale: 2 }}
        whileTap={{ scale: 0.75 }}
        className="transition-all inline-block px-1 hover:animate-pulse text-5xl mb-5"
      >
        💖
      </motion.div>{" "}
      <h1 className="text-5xl mb-10 mt-5 font-bold font-mono text-center">
        <TypeWriterEffect
          textStyle={{ textAlign: "center" }}
          startDelay={5000}
          cursorColor="black"
          text={`Excited to Meet You 😊✨.`}
          typeSpeed={50}
        />
      </h1>
      <h1 className="text-xl md:text-2xl lg:text-4xl leading-relaxed mb-10 mt-5 font-bold font-mono text-center">
        <TypeWriterEffect
          textStyle={{ textAlign: "center" }}
          startDelay={6500}
          cursorColor="black"
          text={`You're just a login away. \n or Create your account in just a few clicks \n simply tap the Sign-Up button.`}
          typeSpeed={50}
        />
      </h1>
      <div className=" flex gap-5 ">
        <div className="max-w-40 min-w-32">
          <NavLink to={"/login"}>
            <Button text={"LOGIN"} />
          </NavLink>
        </div>
        <div className="max-w-40 min-w-32">
          <NavLink to={"/signup"}>
            <Button text={"SIGN UP"} />
          </NavLink>
        </div>
      </div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="w-full flex justify-center"
      >
        <motion.div
          variants={AnimatedTextVariants}
          className=" lg:w-2/5 md:w-2/3 text-justify mt-80 leading-relaxed"
        >
          <h1 className="font-bold text-2xl">🔹 Why Friendly PAI?</h1>
          <p>
            Friendly PAI isn’t just another chatbot; it’s a dynamic tool
            designed to make your interactions engaging and efficient. With its
            unique personalized approach and responsive design. <br /> Friendly
            PAI stands out as a versatile and user-friendly AI Companion.
            Whether you’re seeking information, casual conversation, or
            assistance with anything, Friendly PAI is here to provide friendly
            and insightful responses tailored just for you.
          </p>
          <h1 className="font-bold text-2xl">🔹 Key Features:</h1>
          <p className="text-left">
            • 💬 Personalized Interactions: Tailored responses based on user
            preferences, age, and interests. For example, a 12-year-old
            interested in dinosaurs, cars, and Avengers will receive responses
            related to those topics. <br />• 🖥 Responsive Design: Optimized for
            all devices to ensure a seamless experience. <br />• 🌐 Simple and
            Understandable: Designed to provide easy-to-understand responses for
            users of all ages.
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 1 }}
      >
        <motion.div
          variants={AnimatedTextVariants}
          className="text-center mt-80"
        >
          <h1 className="font-bold">
            {" "}
            Friendly PAI ( Personalized Artificial Intelligence ){" "}
          </h1>
          <p className="text-sm text-center">
            &copy; 2024 Friendly PAI. All rights reserved.
          </p>
          <h1 className="font-bold">Developed by DjArtimus (Rushali) </h1>
          <h1 className="font-bold">Thank You for Visiting Me.</h1>
          <h1 className="font-semibold">Yours Friendly PAI</h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
