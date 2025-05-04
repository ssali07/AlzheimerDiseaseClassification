import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 👉 You can later add logic here to send the message to a backend/email API
    console.log('Contact form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-xl max-w-2xl w-full p-10">
        <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-black-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-black-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-black-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-md transition "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
