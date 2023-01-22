import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [categories,setCategories]= useState([])
  useEffect(()=>{
  const getCategories= async ()=>{
    const res=await axios.get("http://127.0.0.1:3000/api/categories") 
  console.log("eeeeeeee categories",res.data) 
  setCategories(res.data)                                  
}
getCategories()
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://www.euractiv.com/wp-content/uploads/sites/2/2021/02/shutterstock_1484047868-800x450.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category)=>{
            return (<li key={category._id} className="sidebarListItem"><Link className="link" to={"/posts/category/" + category._id}>{category.name}</Link></li>)
          })}   
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}