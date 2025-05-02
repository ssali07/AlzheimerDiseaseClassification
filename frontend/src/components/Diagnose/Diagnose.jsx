import React, { useState } from "react";

const Diagnose = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 📤 TODO: Replace with API call to backend for Alzheimer classification
    if (file) {
      alert("File submitted:", file.name);
    } else {
      console.error("No file selected!");
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className=" backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-8 rounded-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Alzheimer Disease Diagnosis
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div>
            <label htmlFor="file" className="block text-lg font-medium text-gray-800 mb-2">
              Upload a grayscale brain scan image:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
              className="block w-full border border-black-300 rounded-md px-4 py-2  text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Diagnose;
