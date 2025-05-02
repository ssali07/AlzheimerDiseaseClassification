import React, { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // 🔐 TODO: Add real authentication logic here
    if (username && password) {
      setMessage('Login successful (demo only)')
    } else {
      setMessage('Please fill in all fields')
    }
  }

  return (
    <div className="py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className=" backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md "
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md "
            />
          </div>
          {message && (
            <p className="text-center text-green-600 font-medium">{message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
