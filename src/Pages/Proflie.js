import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProfile,
  updateImage,
  profileUpdate,
  ChangePassword,
} from "../store/Admin/admin.action";

const Proflie = (props) => {
  const admin = useSelector((state) => state.admin.admin);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [type, setType] = useState("Profile");

  useEffect(() => {
    setImage([]);
    props.getProfile(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setName(admin.name);
    setEmail(admin.email);
    setImagePath(admin.image);
    setError({ name: "", email: "" });
  }, [admin]);

  const handleEditName = () => {
    if (!name || !email) {
      let error = {};
      if (!name) error.name = "name is required !";
      if (!email) error.email = "email is required !";
      return setError({ ...error });
    } else {
      let data = {
        name,
        email,
      };
      props.profileUpdate(data);
    }
  };
  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeImage = () => {
    const formData = new FormData();
    formData.append("image", image);
    props.updateImage(formData);
    setImage([]);
  };

  const handleChangePassword = () => {
    if (
      !oldPassword ||
      !newPassword ||
      !currentPassword ||
      newPassword !== currentPassword
    ) {
      let error = {};
      if (!oldPassword) error.oldPassword = "old Password Is Required!";
      if (!newPassword) error.newPassword = "New Password Is Required !";
      if (!currentPassword)
        error.currentPassword = "confirm Password Is Required !";
      if (newPassword !== currentPassword)
        error.currentPassword =
          "New Password and Confirm Password doesn't match";
      return setError({ ...error });
    } else {
      let data = {
        confirmPass: currentPassword,
        newPass: newPassword,
        oldPass: oldPassword,
      };
      props.ChangePassword(data);
    }
  };

  const handlePrevious = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="row py-2 profile-image">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>Profile</h4>
        </div>
      </div>

      <div className="col-12 profile_Image ">
        <img
          src={require("../assets/img/tree.jpg")}
          style={{
            width: "100%",
            height: "450px",
            boxSizing: "border-box",
            objectFit: "cover",
            borderRadius: "12px",
          }}
          alt=""
          srcset=""
        />
      </div>

      <div className="profile-content">
        <div className="row ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 ">
            <div className="card" style={{ borderRadius: "12px" }}>
              <div className="card-body ">
                <div className="position-relative">
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => handleUploadImage(e)}
                  />
                  <img
                    src={imagePath}
                    alt="admin"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "50%",
                    }}
                    className="mx-auto p-1 border "
                    onClick={() => handlePrevious(imagePath)}
                  />
                  <div
                    className="position-absolute"
                    style={{ bottom: "1%", right: "33%" }}
                  >
                    <div
                      style={{
                        background: "#1f1c30",
                        borderRadius: "50px",
                        height: "29px",
                      }}
                    >
                      <label for="file-input">
                        <i
                          class="fa-solid fa-camera d-flex justify-content-center  rounded-circle  p-2 cursorPointer"
                          style={{
                            fontSize: "15px",
                            color: "#ffff",
                            cursor: "pointer",
                          }}
                        ></i>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center my-4">
                  <h5> {admin.name}</h5>
                  <div className="mt-4">
                    <button
                      disabled={image.length === 0 ? true : false}
                      onClick={handleChangeImage}
                      className="text-end btn btn-info ml-2"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>

                {/* <div style={{ color: "3c333de" }}>
                <ul style={{ listStyle: "none" }}>
                  <li
                    className="mt-2"
                    onClick={() => setType("Profile")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <i className="fa fa-edit pr-4"></i>
                    </span>
                    <span>Edit Profile</span>
                  </li>

                  <li
                    className="mt-2"
                    onClick={() => setType("password")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <i className="fa fa-key pr-4"></i>
                    </span>
                    <span>Change Password</span>
                  </li>
                </ul>
              </div> */}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xxl-9 ">
            <div className="row">
              <div className="col-12">
                <div
                  className="EditBar d-flex w-100 text-center"
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                >
                  <h5
                    className={`p-3 w-50 ${type === "Profile" && "activeTgl"}`}
                    onClick={() => {
                      setType("Profile");
                    }}
                  >
                    Edit Profile
                  </h5>
                  <h5
                    className={`p-3 w-50 ${type === "password" && "activeTgl"}`}
                    onClick={() => {
                      setType("password");
                    }}
                  >
                    Change Password
                  </h5>
                </div>
                <div className="card py-2" style={{ borderRadius: "12px" }}>
                  <div className="card-body" style={{ padding: "30px" }}>
                    {type === "Profile" && (
                      <>
                        <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 mx-auto">
                          <div className="form-group  mr-4 mt-3">
                            <div className="mb-3">
                              {/* <label className="mb-2 text-gray ml-3">Name</label> */}
                              <div className="form-floating">
                                <input
                                  type="text"
                                  placeholder="name"
                                  id="UserName"
                                  className="form-control"
                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                    if (!e.target.value) {
                                      return setError({
                                        ...error,
                                        name: "name is required !",
                                      });
                                    } else {
                                      return setError({
                                        ...error,
                                        name: "",
                                      });
                                    }
                                  }}
                                />
                                <label htmlFor="UserName">Name</label>
                              </div>
                              {error.name && (
                                <span className="text-danger">
                                  {error.name}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="form-group  mr-4">
                            <div className="mb-2">
                              {/* <label className="mb-2 text-gray ml-3">Email</label> */}
                              <div className="form-floating">
                                <input
                                  type="email"
                                  placeholder="email"
                                  id="UserEmail"
                                  className="form-control "
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (!e.target.value) {
                                      return setError({
                                        ...error,
                                        email: "email is required !",
                                      });
                                    } else {
                                      return setError({
                                        ...error,
                                        email: "",
                                      });
                                    }
                                  }}
                                />
                                <label htmlFor="UserEmail">Email</label>
                              </div>
                            </div>
                            {error.email && (
                              <span className="text-danger">{error.email}</span>
                            )}
                          </div>
                          <div className="d-flex flex-row-reverse mr-4 ">
                            <button
                              onClick={handleEditName}
                              className="text-end btn btn-success"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {type === "password" && (
                      <>
                        <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 mx-auto">
                          <div className="form-group ">
                            <div className="mb-2">
                              <div className="form-floating">
                                <input
                                  type="password"
                                  placeholder=" "
                                  id="OldPass"
                                  className="form-control mr-4 mt-2"
                                  onChange={(e) => {
                                    setOldPassword(e.target.value);
                                    if (!e.target.value) {
                                      return setError({
                                        ...error,
                                        oldPassword:
                                          "Old Password is required !",
                                      });
                                    } else {
                                      return setError({
                                        ...error,
                                        oldPassword: "",
                                      });
                                    }
                                  }}
                                />
                                <label htmlFor="OldPass">Old Password</label>
                                {error.oldPassword && (
                                  <span className="text-danger">
                                    {error.oldPassword}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="form-group">
                                <div className="mb-2">
                                  <div className="form-floating">
                                    <input
                                      type="password"
                                      placeholder=" "
                                      id="NewPass"
                                      className="form-control mr-4 mt-2"
                                      onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        if (!e.target.value) {
                                          return setError({
                                            ...error,
                                            newPassword:
                                              "New Password is required !",
                                          });
                                        } else {
                                          return setError({
                                            ...error,
                                            newPassword: "",
                                          });
                                        }
                                      }}
                                    />
                                    <label htmlFor="NewPass">
                                      New Password
                                    </label>
                                  </div>
                                  {error.newPassword && (
                                    <span className="text-danger">
                                      {error.newPassword}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group ">
                                <div className="mb-2">
                                  <div className="form-floating">
                                    <input
                                      type="password"
                                      placeholder=" "
                                      id="Conform"
                                      className="form-control mr-4 mt-2"
                                      onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                        if (!e.target.value) {
                                          return setError({
                                            ...error,
                                            currentPassword:
                                              "Confirm Password is required !",
                                          });
                                        } else {
                                          return setError({
                                            ...error,
                                            currentPassword: "",
                                          });
                                        }
                                      }}
                                    />
                                    <label htmlFor="Conform">
                                      {" "}
                                      Confirm Password
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>{" "}
                            {error.currentPassword && (
                              <span className="text-danger">
                                {error.currentPassword}
                              </span>
                            )}
                          </div>

                          <div className="d-flex flex-row-reverse">
                            <button
                              onClick={handleChangePassword}
                              className="text-end btn btn-success "
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getProfile,
  updateImage,
  profileUpdate,
  ChangePassword,
})(Proflie);
