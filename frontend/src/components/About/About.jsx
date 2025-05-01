import React from 'react'

const About = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className=" backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-xl max-w-3xl w-full p-10 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is to support early diagnosis of Alzheimer’s disease using advanced AI-driven tools. 
          With user-friendly interfaces and robust technology, we empower patients and caregivers 
          to take proactive steps toward better health outcomes. We are committed to privacy, accuracy, 
          and accessibility for all.
        </p>
      </div>
    </div>
  )
}

export default About
