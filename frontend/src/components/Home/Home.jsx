import React, { useState, useEffect } from "react";

const awarenessMessages = [
  {
    title: "Early Diagnosis Saves Lives",
    description:
      "We use smart technology to help detect diseases early — so you or your loved ones can take action when it matters most.",
    button: "Start Your Free Checkup",
  },
  {
    title: "Understanding Alzheimer's",
    description:
      "Alzheimer’s is a progressive disease that affects memory and cognition. Raising awareness can help in early treatment and support.",
    button: "Learn More About Symptoms",
  },
  {
    title: "Support for Caregivers",
    description:
      "Caregiving is hard. We provide resources to support those taking care of loved ones with Alzheimer’s.",
    button: "Explore Care Resources",
  },
  {
    title: "Upload MRI to Get Diagnosis",
    description:
      "Create an account or log in to access our AI-powered diagnosis. Just upload a grayscale MRI image and get results instantly.",
    button: "Login or Register Now",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === awarenessMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const { title, description, button } = awarenessMessages[currentIndex];

  return (
    <div className="py-30 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col justify-center items-center px-6 min-h-screen transition-all duration-700">
      <div className="backdrop-blur-md rounded-xl shadow-xl max-w-3xl w-full p-10 text-center transition-all duration-700">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">{description}</p>
        <button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl shadow-md transition">
          {button}
        </button>
      </div>
    </div>
  );
}

export default Home;
