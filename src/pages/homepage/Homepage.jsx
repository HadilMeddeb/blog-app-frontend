import { useLocation} from "react-router";
import {useEffect, usEffect,useState } from "react"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";

import "./homepage.css";

export default function Homepage() {
  
  const [posts, setPosts]= useState([])
  const search  = useLocation().pathname.split("/")[3];
  const search_type=useLocation().pathname.split("/")[2];
  console.log("search :",search)
  console.log("search_type :",search_type)

            useEffect(()=>{
                 const fetchPosts=async ()=>{
                   if(search_type=="category"){
                    const res = await axios.get("http://127.0.0.1:3000/api/posts/category/"+search)
                    setPosts(res.data)

                   }
                   else if (search_type=="user"){
                    const res = await axios.get("http://127.0.0.1:3000/api/posts/user/"+search)
                    setPosts(res.data)

                   }
                   else{
                     console.log("here")
                    const res = await axios.get("http://127.0.0.1:3000/api/posts")
                    console.log("data : ", res.data)
                    setPosts(res.data)
                   }
                           }
                           console.log("heyyyyyyyyyyyyyyyyyyyy")
                          fetchPosts();
                      },[search])

  const location = useLocation();
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}