import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import "./MainNavigation.css";
import { authState, loginHandler, logoutHandler } from "../../recoilState/authState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";

function MainNavigation() {

  const auth = useRecoilValue(authState)
  const uid = auth.userId
  const params= useParams()
  const [logoutState,setLogoutState] = useRecoilState(logoutHandler)
  const clickHandler = ()=>{
    setLogoutState();
  }


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-4">
        {/* <Navbar.Brand as={Link} to="/">
          
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto all">
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav authnav">
              <h4>All Users</h4>
            </Nav.Link>
            {logoutState.isLogin && (
              <>
                <Nav.Link
                  as={NavLink}
                  to={`/${uid}/places`}
                  className="nav authnav"
                >
                  <h4>My Places</h4>
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/places/new"
                  className="nav authnav"
                >
                  <h4>Add Place</h4>
                </Nav.Link>
              </>
            )}
            <Nav.Link
              onClick={clickHandler}
              as={NavLink}
              to="/auth"
              className="nav authnav"
            >
              <h4>{!logoutState.isLogin ? "Authenticate" : "Logout"} </h4>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}

export default MainNavigation;
