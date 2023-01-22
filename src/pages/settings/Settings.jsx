import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import axios from "axios";

export default function Settings() {

  const { user, dispatch } = useContext(Context);
  const [file,setFile]=useState(null)
  const [error,setError]=useState("")
  const [username,setUsername]=useState(user.username)
  const [email,setEmail]=useState(user.email)
  const [password,setPassword]=useState(user.password)
  const [success,setSuccess]=useState("")
  const PF = "http://localhost:3000/images/"
  
  const handleSubmit=async (e)=>{
   console.log("**********************************************1")
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser={userId:user._id ,username:username,email:email,password:password}
    
  if(file)  
  {
      const data= new FormData();
      const filename=Date.now()+file.name;
      console.log(filename)
      data.append("name",filename)
      data.append("file",file)
      console.log("data :::: ",data)
      updatedUser.photo=filename ;
      console.log(updatedUser)
    try
  {
      console.log("**********************************************2")
      const result = await axios.post("http://127.0.0.1:3000/api/upload/",data)
      console.log("**********************************************3")
      
  }  
  catch(err)
      {console.log(err)}
      
  }

      try {
        console.log("**********************************************4")
        console.log(updatedUser)
        const  res= await axios.put('http://127.0.0.1:3000/api/users/'+user._id,updatedUser);
        console.log("res : ",res)
        res.data&&window.location.reload("/")
        setSuccess("user updated successfully")
        setTimeout(() => {
          setSuccess("")
        }, 5000);
        dispatch({type:"UPDATE_SUCCESS",payload:res.data})    
         }
      catch(err){
        setError(err.response.data)
        setTimeout(() => {
          setError("")
        }, 5000);}  
        dispatch({type:"UPDATE_FAILURE"})
    }



  return (
    <div className="settings">
       
      <div className="settingsWrapper">
      {success && <div className="successMessage">{success}</div>}
         {error && <div className="errorMessage">{error}</div>}
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
        
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e)=>{setFile(e.target.files[0])}}
            />
          </div>
          <label>Username</label>
          <input type="text"  placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}} name="name" />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}} name="email" />
          <label>Password</label>
          <input type="password"   onChange={(e)=>{setPassword(e.target.value)}} name="password" />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}