import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { Context } from "../../context/context";
import "./singlePost.css";

export default function SinglePost() {
  const {user} = useContext(Context)
  const location=useLocation()

  const [post,setPost]= useState({});
  const [error,setError]= useState("");
  

  const [updateMode,setUpdateMode]=useState(false)
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  
  const pathId=location.pathname.split('/')[2]
  useEffect(()=>{
    const getPost= async ()=>{
     const res=await axios.get("http://127.0.0.1:3000/api/posts/"+pathId);
     console.log(res.data)
     setPost(res.data)
     setTitle(res.data.title)
     setDesc(res.data.desc)
    } 
    getPost()
  },[pathId])


const hundleUpdate = async()=>{
try
{
  console.log(user.username)
  console.log("eeeeeeeeeeeeeeeeee",desc,title)
  const res = await axios.put("http://127.0.0.1:3000/api/posts/"+pathId, {username:user.username ,desc: desc,title:title,user_id:user._id} );
  
  console.log(res)
  res.data&&window.location.reload("/")
  setUpdateMode(false)
}
catch(error)
{
setError(error.response.data)
setTimeout(() => {
  setError("")
}, 5000);
 console.log(error.response.data)
}
}

const hundleSppression= async ()=>{
try
{
  const res = await axios.delete("http://127.0.0.1:3000/api/posts/"+pathId, { data: { username: user.username, user_id:user._id} });
  
  console.log(res)
  res.data&&window.location.replace("/")
}
catch(error)
{
setError(error.response.data)
setTimeout(() => {
  setError("")
}, 5000);
 console.log(error.response.data)
}
 
}

  return (
    <div className="singlePost">
        {error && <center><div className="errorMessage">{error}</div></center>}
     
      <div className="singlePostWrapper">
       { post.photo &&  <img
          className="singlePostImg"
          src={post.photo}
          alt={post.title}
        />}
        {updateMode ? (<input  onChange={(e)=>{setTitle(e.target.value);console.log(e.target.value)}}  value={title} className="singlePostTitle"/>):(
         <h1 className="singlePostTitle">
          {title}
          {<div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={()=>{setUpdateMode(true)}}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={hundleSppression}></i>
          </div>}
        </h1>)}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={"/posts/user/"+post.user_id}>
              {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
       {updateMode ? (<><textarea  onChange={(e)=>{setDesc(e.target.value);console.log(e.target.value)}} className="singlePostDescInput" value={desc}/>  <button onClick={hundleUpdate} className="singlePostButton">update</button> </>):( <p className="singlePostDesc">
          {desc}
        </p>
       )}
      </div>
    </div>
  );
}