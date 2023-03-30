import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { useState, useEffect, useRef } from "react";
import { userQuery } from "../utils/data";
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const [user, setUser] = useState(null);

  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          
          <button onClick={() => setToggleSidebar(true)}><img src={menu} alt="" className="w-8"/></button>

          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>

          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-10 rounded-3xl" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-1/2 bg-white h-screen overflow-y-auto shadow-md animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <button onClick={() => setToggleSidebar(false)}><img src={close} alt="" /></button>
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
