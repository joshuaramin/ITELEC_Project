import React, { useState } from "react";
import styles from "./login.module.scss";
import { LOGINAUTHENTICATIOn } from "../util/Mutation/auth";
import { useMutation } from "@apollo/client";
import Message from "../components/message/message";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const router = useNavigate();

   const [user, setUsers] = useState({
      email: "",
      password: "",
   });

   const [mutate, { error }] = useMutation(LOGINAUTHENTICATIOn);

   const onHandleSubmit = (e) => {
      e.preventDefault();

      mutate({
         variables: {
            username: user.email,
            password: user.password,
         },
         onCompleted: (data) => {
            Cookies.set("access_token", data.login.token, {
               expires: 60 * 60 * 7 * 24,
               path: "/",
               sameSite: "none",
               secure: true,
            });

            const getCookies = Cookies.get("access_token");

            const decodeToken = jwtDecode(getCookies);

            router(`/dashboard/${decodeToken.role}`);
            window.location.reload();
         },
         onError: (err) => {
            console.error(err.message);
         },
         errorPolicy: "all",
      });
   };

   return (
      <div className={styles.container}>
         <form onSubmit={onHandleSubmit}>
            <h2>School Academy</h2>
            {error ? <Message message={error.message} /> : null}
            <input
               type='text'
               placeholder='Email Address'
               value={user.email}
               onChange={(e) => setUsers({ ...user, email: e.target.value })}
            />
            <input
               type='password'
               placeholder='Password'
               value={user.password}
               onChange={(e) => setUsers({ ...user, password: e.target.value })}
            />
            <div className={styles.fp}>
               <a href='/auth/forgotpassword'>Forgot Password?</a>
            </div>
            <button type='submit'>
               <span>Login</span>
            </button>
            <div className={styles.signup}>
               <span>
                  Don't have an account yet?{" "}
                  <a href='/auth/register'>Sign Up.</a>
               </span>
            </div>
         </form>
      </div>
   );
}
