import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
    
  const handleSubmit=async (e)=>{
    try{
      e.preventDefault()
    const res= await axios.post("http://127.0.0.1:3000/api/auth/register",{username,email,password});
    console.log(res);
    res.data&&window.location.replace("/login")
  }
    catch(err)
    {
      setError("something went wrong !! ")
      setTimeout(() => {
        setError("")
      }, 2000);
      console.log(err.message)
    }
  }

    return (
        <div className="register">
          {error && <div className="error">{error}</div>}
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={(e)=>{console.log(e.target.value) ; setUsername(e.target.value)}} className="registerInput" type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input onChange={(e)=>{console.log(e.target.value) ; setEmail(e.target.value)}} className="registerInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input onChange={(e)=>{console.log(e.target.value) ;setPassword(e.target.value)}} className="registerInput" type="password" placeholder="Enter your password..." />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <Link to="/login"className="registerLoginButton">Login</Link>
    </div>
    )
}