import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    familyHistory: '',
    medicalConditions: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 🔐 TODO: Send this data to Flask backend
    console.log('Form submitted:', formData)
    alert('Registered successfully (demo only)')
  }

  return (
    <div className="min-h-screen py-5 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className=" backdrop-blur-md p-8 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] w-full max-w-xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md "
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md "
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password" name="password" value={formData.password} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md "
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md "
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender" value={formData.gender} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md "
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Family History of Alzheimer’s?</label>
            <select
              name="familyHistory" value={formData.familyHistory} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md "
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Medical Conditions (comma-separated)</label>
            <input
              type="text" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md "
              placeholder="e.g., diabetes, hypertension"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
