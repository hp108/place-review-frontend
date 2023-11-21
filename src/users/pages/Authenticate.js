import React, { useState } from "react";
import "./Authenticate.css";
import { loginHandler } from "../../shared/recoilState/authState";
import { useRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import TailSpin from "../../shared/components/Loaders/TailSpin";
import ErrorModal from "../../shared/components/Errors/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useRef } from "react";
import '../../places/pages/NewPlace.css'

function Authenticate() {
  const [islogin, loginFun] = useRecoilState(loginHandler);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const [isLoginMode, setILoginMode] = useState(true);
  const [cnt, setCnt] = useState(0);
  const [avatar, setAvatar] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const ref = useRef();

  const clickHandler = (e) => {
    e.preventDefault();
    setILoginMode((isLoginMode) => !isLoginMode);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setCnt((cnt) => cnt + 1);
    if (isLoginMode) {
      try {
        const response = await sendRequest(
          BACKEND_URL+"/users/login",
          "post",
          {
            email: e.target[0].value,
            password: e.target[1].value,
          }
        );
        if (response) {
          loginFun({
            userId: response.data.userId,
            token: response.data.token,
          });
          navigate("/");
        }
      } catch (err) {}
    } else {
      try {
        const newUser = new FormData();
        newUser.append("name", e.target[0].value);
        newUser.append("email", e.target[1].value);
        newUser.append("password", e.target[2].value);
        newUser.append("avatar", avatar);
        const response = await sendRequest(
          BACKEND_URL+"/users/signup",
          "post",
          newUser
        );
        if (response) {
          loginFun(response.data.userId, response.data.token);
          navigate("/");
        }
      } catch (err) {}
    }
  };
  const imageHandler = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  const changeHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <>
      {isLoading && <TailSpin />}
      {isError && cnt && (
        <ErrorModal error={isError} cnt={cnt} clear={clearError} />
      )}
      <div className="main">
        <form onSubmit={submitHandler}>
          <div className="form__total">
            {!isLoginMode && (
              <div className="form-element">
                <div>
                  <label htmlFor="Name">Your Name</label>
                </div>
                <div>
                  <input type="text" className="form-control" id="Name" />
                </div>
              </div>
            )}
            <div className="form-element">
              <div>
                <label htmlFor="email">email</label>
              </div>
              <div>
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            <div className="form-element">
              <div>
                <label htmlFor="Password">Password</label>
              </div>
              <div>
                <input
                  type="password"
                  className="form-control user_form__password"
                  id="Password"
                />
              </div>
              {!isLoginMode && (
                <div>
                  <input
                    ref={ref}
                    type="file"
                    style={{ display: "none" }}
                    onChange={changeHandler}
                  />
                  <div className="img img__avatar">
                    {avatar && (
                      <img
                        className="img"
                        src={avatar ? URL.createObjectURL(avatar) : ""}
                        alt="Preview"
                      />
                    )}
                    {!avatar && <p className="preview">Preview</p>}
                  </div>
                  <button className="user__button" onClick={imageHandler}>
                    Add Photo
                  </button>
                </div>
              )}
            </div>
            <div className="button__1">
              <button>{isLoginMode ? "Login" : "SignUp"}</button>
            </div>
            <div className="button__2">
              <button onClick={clickHandler}>
                Switch to {isLoginMode ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Authenticate;