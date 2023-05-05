import React, { useContext, useState, useRef, useEffect } from "react";
import "./Header.css";
import SignInForm from "../LoginForms/SignIn/SignInForm";
import LogoImg from "./Header assets/Frank_logo.svg";
import { UserContext, GameContext, StoryContext } from "../../App";

function Header({ handleLoginClick }) {
  const { playing, setPlaying } = useContext(GameContext);
  const { current, setCurrent } = useContext(StoryContext);
  const [modal, setModal] = useState(false);

  const modalRef = useRef(null);

  const handleClick = () => {
    setModal(!modal);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!modalRef.current?.contains(event.target)) {
        setModal(false);
      }
    });
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const { user, setUser } = useContext(UserContext);
  let userDetails = JSON.parse(localStorage.getItem("user"));

  if (!userDetails) {
    userDetails = user;
  }

  const handleLogOut = () => {
    localStorage.clear();

    setUser({ _id: 0, username: "guest" });
  };

  const handleGallery = () => {
    const curtainL = document.getElementById("curtain-L");
    const curtainR = document.getElementById("curtain-R");

    if (!playing) {
      const mainContainer = document.getElementById("main-container");

      curtainL.classList.add("slideleft");
      curtainR.classList.add("sideright");
      setTimeout(() => mainContainer.classList.add("slideup"), 1500);
    }

    if (curtainL.classList.contains("slideleft") === false) {
      curtainL.classList.add("slideleft");
    }
    if (curtainR.classList.contains("slideright") === false) {
      curtainR.classList.add("sideright");
    }

    if (current) {
      setCurrent({});
    }
  };

  return (
    <>
      {modal && (
        <div ref={modalRef}>
          <SignInForm modal={modal} setModal={setModal} />
        </div>
      )}

      <div className="header">
        <div className="logo-box">
          <img src={LogoImg} alt="" /> FrankenStory
        </div>
        <div className="navbar">
          <div onClick={handleGallery} className="loginicon">
            Gallery
          </div>
          <div onClick={handleClick} className="loginicon">
            Sign In
          </div>
          <div onClick={handleLogOut} className="loginicon">
            Log Out
          </div>
        </div>

        <div className="navbar2">
          <div className="username-welcome">
            Welcome, {userDetails.username}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
