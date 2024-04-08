"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LuSearch,
  FiUser,
  FiSettings,
  FiLock,
  FiLogOut,
} from "../assets/icons/vander";

export default function Navbar({ navClass, navLight }) {
  let [isOpen, setMenu] = useState(true);
  let [scroll, setScroll] = useState(false);
  let [search, setSearch] = useState(false);
  let [cartitem, setCartitem] = useState(false);

  let [manu, setManu] = useState("");
  let pathname = usePathname();

  useEffect(() => {
    setManu(pathname);
    function scrollHandler() {
      setScroll(window.scrollY > 50);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollHandler);
      window.scrollTo(0, 0);
    }

    let searchModal = () => {
      setSearch(false);
    };
    document.addEventListener("mousedown", searchModal);

    let cartModal = () => {
      setCartitem(false);
    };
    document.addEventListener("mousedown", cartModal);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      document.removeEventListener("mousedown", searchModal);
      document.removeEventListener("mousedown", cartModal);
    };
  }, [setManu]);
  const toggleMenu = () => {
    setMenu(!isOpen);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };
  return (
    <header id="topnav" className={`${scroll ? "nav-sticky" : ""} ${navClass}`}>
      <div className="container">
        {navLight === true ? (
          <Link className="logo" href="/">
            <span className="logo-light-mode">
              <Image
                src="/images/logodark.svg"
                width={120}
                height={18}
                className="l-dark"
                alt=""
              />
              <Image
                src="/images/logolight.svg"
                width={120}
                height={18}
                className="l-light"
                alt=""
              />
            </span>
            <Image
              src="/images/logodark.svg"
              width={120}
              height={18}
              className="logo-dark-mode"
              alt=""
            />
          </Link>
        ) : (
          <Link className="logo" href="/">
            <span className="logo-light-mode">
              <Image
                src="/images/logodark.svg"
                width={120}
                height={18}
                className="l-dark"
                alt=""
              />
              <Image
                src="/images/logolight.svg"
                width={120}
                height={18}
                className="l-light"
                alt=""
              />
            </span>
            <Image
              src="/images/logodark.svg"
              width={120}
              height={18}
              className="logo-dark-mode"
              alt=""
            />
          </Link>
        )}
        <div className="menu-extras">
          <div className="menu-item">
            <Link
              href="#"
              className="navbar-toggle"
              id="isToggle"
              onClick={toggleMenu}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          </div>
        </div>

        <ul className="buy-button list-inline mb-0">
          <li className="list-inline-item ps-1 mb-0">
            <div className="dropdown">
              <button
                type="button"
                onClick={() => setSearch(!search)}
                className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary"
              >
                <LuSearch className="icons" />
              </button>
              <div style={{ display: search === true ? "block" : "none" }}>
                <div
                  className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 show`}
                  style={{ width: "240px", position: "absolute", right: "0" }}
                >
                  <div className="search-bar">
                    <div id="itemSearch" className="menu-search mb-0">
                      <form
                        role="search"
                        method="get"
                        id="searchItemform"
                        className="searchform"
                      >
                        <input
                          type="text"
                          className="form-control rounded border"
                          name="s"
                          id="searchItem"
                          placeholder="Search..."
                        />
                        <input
                          type="submit"
                          id="searchItemsubmit"
                          value="Search"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list-inline-item ps-1 mb-0">
            <div className="dropdown dropdown-primary">
              <button
                type="button"
                onClick={() => setCartitem(!cartitem)}
                className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary"
              >
                <Image
                  src="/images/team/01.jpg"
                  height={32}
                  width={32}
                  className="img-fluid rounded-pill"
                  alt=""
                />
              </button>
              <div style={{ display: cartitem === true ? "block" : "none" }}>
                <div
                  className={` dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}
                >
                  <Link
                    href="candidate-profile"
                    className="dropdown-item fw-medium fs-6"
                  >
                    <FiUser className="fea icon-sm me-2 align-middle" />
                    Profile
                  </Link>
                  <Link
                    href="candidate-profile-setting"
                    className="dropdown-item fw-medium fs-6"
                  >
                    <FiSettings className="fea icon-sm me-2 align-middle" />
                    Settings
                  </Link>
                  <div className="dropdown-divider border-top"></div>
                  <Link
                    href="lock-screen"
                    className="dropdown-item fw-medium fs-6"
                  >
                    <FiLock className="fea icon-sm me-2 align-middle" />
                    Lockscreen
                  </Link>
                  <Link href="login" className="dropdown-item fw-medium fs-6">
                    <FiLogOut className="fea icon-sm me-2 align-middle" />
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div id="navigation">
          <ul className="navigation-menu nav-right nav-light">
            <li className={manu === "/" ? "active" : ""}>
              <Link href="/" className="sub-menu-item">
                Home
              </Link>
            </li>
            <li className={manu === "/job-list-one" ? "active" : ""}>
              <Link href="/job-list-one" className="sub-menu-item">
                Jobs
              </Link>
            </li>
            <li className={manu === "/employers" ? "active" : ""}>
              <Link href="/employers" className="sub-menu-item">
                Employers
              </Link>
            </li>
            <li className={manu === "/candidates" ? "active" : ""}>
              <Link href="/candidates" className="sub-menu-item">
                Candidates
              </Link>
            </li>
            <li className={manu === "/aboutus" ? "active" : ""}>
              <Link href="/aboutus" className="sub-menu-item">
                About Us
              </Link>
            </li>

            <li className={manu === "/contactus" ? "active" : ""}>
              <Link href="/contactus" className="sub-menu-item">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
