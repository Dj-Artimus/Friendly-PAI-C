import React from 'react'
import { motion } from 'framer-motion'
import { gradientClasses } from '../utils/DataLists'

const Interest = ({ handleInterestClick , text , noGradient , textSize , padding , rounded}) => {
  const gradientNo = Math.floor((Math.random() * (gradientClasses.length - 1) - 1 + 1 ) + 1 )
  const gradient = gradientClasses[gradientNo]
  return (
    <motion.button
    whileHover={{
      scale: 1.025,
    }}
    whileTap={{
      scale: 0.975,
    }}
    className={`text-white w-full font-semibold ${textSize? textSize : "text-xl"} ${padding ? padding : "p-3"} text-center ${rounded ? rounded : "rounded-xl" } relative bg-black bg-gradient-to-r ${noGradient ? '' : gradient}`}
    onClick={handleInterestClick}
  >
    {text}
  </motion.button>
  )
}

export default Interest