import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Context } from "../../context/context";
import "./write.css";

export default function Write() {
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [file,setFile]=useState(null)
  const {user}=useContext(Context)
  const [error,setError]=useState("")
  const [options,setOptions]=useState([])
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
 console.log("i'm in ...............")
  const fetchCategories=async ()=>{
    const res = await axios.get("http://127.0.0.1:3000/api/categories")
    console.log("response : ",res.data)
    const tab= res.data.map((category)=>{
       return (  { label: category.name, value: category._id })
    })
    setOptions(tab)
    }
     fetchCategories();
    
},[])

console.log("categories :",options)






 const PF="http://localhost:3000/images/";
  const handleSubmit=async (e)=>{
   
    e.preventDefault();
    const newPost={username:user.username,title,desc,user_id:user._id, categories: selected.map((val)=>{return (val.value)})}
    if(file)
    {
      const data= new FormData();
      const filename=Date.now()+file.name;
      console.log(filename)
      data.append("name",filename)
      data.append("file",file)
      console.log("data :::: ",data)
      newPost.photo=filename ;
    console.log(newPost)

      try{
        const result = await axios.post("http://127.0.0.1:3000/api/upload/",data)}
      catch(err){console.log(err)}
      try {
        const  res= await axios.post('http://127.0.0.1:3000/api/posts/',newPost);
        console.log(res)
        res.data&&window.location.replace("/")
         }
      catch(err){
        setError(err)
        setTimeout(() => {
          setError("")

        }, 5000);}}
    else
    { 
      setError("there is no file selected  !!")
      setTimeout(() => {
        setError("")
      }, 5000);}
    }

  return (
    
    <div className="write">
       {error && <center><div className="errorMessage">{error}</div></center>}
      { file && (<img
        className="writeImg"
        
        src={file ? URL.createObjectURL(file) : PF+user.profilePic}
        alt=""/>)
    }
 
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} 
           onChange={(e)=>{setFile(e.target.files[0])}}
          
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e)=>{setDesc(e.target.value)}}
          />
        </div>
        <div className="writeFormGroup">
      <MultiSelect  className="writeInput selectInput"
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
     
 <div className="writeFormGroup">
 <button className="writeSubmit" type="submit">
          Publish
        </button>
 </div>
      
      </form>
    </div>
  );
}