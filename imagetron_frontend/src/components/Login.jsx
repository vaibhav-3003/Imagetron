import React from "react";
// import GoogleLogin from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import shareVideo from "../assets/share.mp4";
import logoWhite from "../assets/logo_white.png";
import jwt_decode from "jwt-decode";
import {client} from '../client.js';

const Login = () => {

  const navigate = useNavigate();

  const handleSuccess = (response) => {
    var decoded = jwt_decode(response.credential);
    
    localStorage.setItem('user', JSON.stringify(decoded));
    const {name,picture,sub} = decoded;
    
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() =>{
        navigate('/',{replace: true});
      })
  };

  const handleFailure = (response) => {
    console.error(response);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          typeof="videp/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logoWhite} alt="" width="160px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId="66463181402-qiugg8m23pahgc0otl7krdetqpsnelua.apps.googleusercontent.com"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              buttonText="Sign in with Google"
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
