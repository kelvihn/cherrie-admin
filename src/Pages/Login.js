import React, { useState } from "react";
import { connect } from "react-redux";
import "../assets/css/authentication/form-2.css";
import { loginAdmin } from "../store/Admin/admin.action";

import logo from "../assets/img/cork-logo.png";
import { Box, TextField } from "@material-ui/core";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      let error = {};
      if (!email) error.email = "Email Is Required !";
      if (!password) error.password = "password is required !";
      return setError({ ...error });
    } else {
      let login = {
        email,
        password,
      };

      props.loginAdmin(login);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div class="form-container outer" style={{ backgroundColor: "#eef2f6" }}>
        <div class="form-form">
          <div class="form-form-wrap">
            <div class="form-container">
              <div class="form-content" style={{ backgroundColor: "#ffffff" ,padding:"40px"  }}>
                <div>
                  <img
                    src={logo}
                    style={{
                      width: "100px",
                      height: "100px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      borderRadius: "50%",
                    }}
                    alt=""
                    className="mx-auto"
                    draggable="false"
                  />
                </div>
                <h3 className="mt-4" style={{ fontWeight: "bold", color: "#673ab7" }}>
                 
                  Log In Tengo
                </h3>
                <p className=" mt-4" style={{color:"#000"}}> Sign in with Email address.</p>

                <form class="text-left" autoComplete="off">
                  <div class="form">
                    <div class="mb-3">
                      <div class="form-floating">
                        <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder=" "
                          required
                          style={{borderRadius:"12px"}}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                email: "Email is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                email: "",
                              });
                            }
                          }}
                        />
                        <label for="floatingInput">Email</label>
                      </div>
                      <div class="mt-1 ml-2 mb-3" >
                        {error.email && (
                          <div class="pl-1 text-left pb-1">
                            <span className="text-danger font-size-lg">
                              {error.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="form-floating">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingPassword"
                          placeholder=" "
                          style={{borderRadius:"12px"}}

                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                password: "Password is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                password: "",
                              });
                            }
                          }}
                        />
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div class="mt-1 ml-2 mb-3">
                        {error.password && (
                          <div class="pl-1 text-left pb-1">
                            <span className="text-danger" style={{color:"#f44336"}}>{error.password}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* <p class="signup-link"> Forget Password</p> */}

                    <div class="d-sm-flex justify-content-between">
                      <div class="field-wrapper">
                        <button
                          type="button"
                          class="btn text-white btnSubmit"
                          onClick={handleSubmit}
                          value=""
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { loginAdmin })(Login);
