
// import axios from "axios";
// import { useContext, useRef,useState } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../../context/context";
// import "./login.css";

// export default function Login() {
//   const userRef = useRef();
//   const passwordRef = useRef();
//   const { user,dispatch, isFetching } = useContext(Context);
//   const [error,setError]=useState("")
  
//   const handleSubmit = async (e) => {
   
//     dispatch({ type: "LOGIN_START" });
//     e.preventDefault();

//     console.log("isFetchin :" ,isFetching) 

//     try {
//       const res = await axios.post("http://127.0.0.1:3000/api/auth/login", {
//         username: userRef.current.value,
//         password: passwordRef.current.value,
//       });
//       if(res.status==400)
//       {
//         setError(res.data)
//       } else
//       {
//         dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//         console.log("isFetchin :" ,isFetching)
//       }
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE" });
//       console.log("isFetchin :" ,isFetching)
      
//       console.log(err.message);
//       setError(err)
    
//     }
//   };
  
// console.log(user)
//   return (
//    <> {error && <center><div className="errorMessage">{error}</div></center>}
//    <div className="login">
//      <span className="loginTitle">Login</span>
//      <form className="loginForm" onSubmit={handleSubmit}>
//        <label>Username</label>
//        <input
//          type="text"
//          className="loginInput"
//          placeholder="Enter your username..."
//          ref={userRef}
//        />
//        <label>Password</label>
//        <input
//          type="password"
//          className="loginInput"
//          placeholder="Enter your password..."
//          ref={passwordRef}
//        />
//        <button className="loginButton" type="submit" disabled={isFetching}>
//          Login
//        </button>
//      </form>
//      <button className="loginRegisterButton" >
//        <Link className="link" to="/register">
//          Register
//        </Link>
//      </button>
//    </div></>
//   );
// }

import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error,setError]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://127.0.0.1:3000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log("eeer :",err.response.data.message)
      setError(err.response.data.message)
      setTimeout(() => {
        setError("")
      }, 2000);      
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      {error && <div className="error">{error}</div>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}