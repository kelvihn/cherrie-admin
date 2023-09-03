import React, { useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import { setToast } from "../../utils/toast";
import axios from "axios";

const handelToggle = () => {
  console.log("data");
  $("html").toggleClass("sidebar-noneoverflow");
  $("body").toggleClass("sidebar-noneoverflow");
  $(".navbar-expand-sm").toggleClass("expand-header");
  $(".main-container ").toggleClass(" sidebar-closed sbar-open");
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setError] = useState({
    title: "",
    image: "",
    description: "",
  });
  const { admin } = useSelector((state) => state.admin);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError({
      title: "",
      image: "",
      description: "",
    });
    setTitle("");
    setDescription("");
    setImageData(null);
    setImagePath(null);
    $("#file").val("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !imageData || !imagePath) {
      const errors = {};

      if (!title) {
        errors.title = "Title can't be a blank!";
      }
      if (!description) {
        errors.description = "Description can't be a blank!";
      }

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    setError({ ...errors, image: "" });
    setOpen(false);

    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("title", title);
    formData.append("description", description);
    axios
      .post("notification", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          setToast("success", "Notification sent successfully!");
          setOpen(false);

          setError({
            title: "",
            image: "",
            description: "",
          });
          setTitle("");
          setDescription("");
          setImageData(null);
          setImagePath(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div class="sub-header-container fixed-top">
        <header class="header navbar navbar-expand-sm">
          <div className="mainToggle sidebar_button">
            {/* <a
              href={() => false}
              class="sidebarCollapse"
              data-placement="bottom"
              style={{
                backgroundColor: "#EDE7F6",
                padding: "7px",
                borderRadius: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-menu"
                onClick={handelToggle}
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </a> */}
            <i
              class="fa-solid fa-bars-staggered fs-4"
              style={{
                transform: "rotate(180deg)",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={handelToggle}
            ></i>
          </div>

          <ul class="navbar-nav flex-row ml-auto">
            <li class="nav-item dropdown notification-dropdown mr-2 navIcon">
              <Link to="/admin/appSetting" class="nav-link dropdown-toggle">
                <i class="fa-solid fa-gear"></i>
              </Link>
            </li>
            <li class="nav-item dropdown notification-dropdown mr-2 navIcon">
              <a
                href={() => false}
                class="nav-link dropdown-toggle"
                onClick={handleClickOpen}
              >
                <i class="fa-regular fa-bell"></i>
              </a>
            </li>
            <li class="nav-item more-dropdown mr-2">
              <div class="dropdown  custom-dropdown-icon  ">
                <Link to="/admin/profile">
                  <img
                    src={admin.image}
                    draggable="false"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50px",
                    }}
                    alt=""
                  />
                </Link>
              </div>
            </li>
          </ul>
        </header>

        {/* ------------Notification------------- */}
        <Dialog
          open={open}
          aria-labelledby="responsive-dialog-title"
          onClose={handleClose}
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          maxWidth="xs"
          style={{
            zIndex: 9999999,
          }}
        >
          <DialogTitle
            id="responsive-dialog-title"
            className="dialogue_background_color"
          >
            <span className="modal-title font-weight-bold h4">
              Notification
            </span>
          </DialogTitle>

          <IconButton
            style={{
              position: "absolute",
              right: 0,
              color: "#664dc9",
            }}
          >
            <Tooltip title="Close" placement="right">
              <Cancel className="modal-title" onClick={handleClose} />
            </Tooltip>
          </IconButton>

          <DialogContent>
            {/* <div  className="modal-body mt-0 px-1 pb-3"> */}
            <div className="d-flex flex-column text-center">
              <form>
                <div className="form-group mt-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" "
                      required
                      id="Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            title: "Title can't be a blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            title: "",
                          });
                        }
                      }}
                    />
                    <label htmlFor="Title">Title</label>
                  </div>
                  {errors.title && (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.title}
                      </Typography>
                    </div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder=" "
                      id="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            description: "Description can't be a blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            description: "",
                          });
                        }
                      }}
                    />
                    <label htmlFor="Description">Description</label>
                  </div>
                  {errors.description && (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.description}
                      </Typography>
                    </div>
                  )}
                </div>

                <div className="form-group mt-3 mb-4 pb-3">
                  {/* <label className="float-left">Image</label>
                  <input
                    className="form-control"
                    type="file"
                    id="customFile"
                    required=""
                    accept="image/*"
                    onChange={handleInputImage}
                  />

                  {imagePath ? (
                    <div className="row pl-3">
                      <img
                        src={imagePath}
                        style={{
                          boxShadow: "0 5px 15px 0 rgb(105 103 103 / 0%)",
                          border: "2px solid rgb(105 103 103 / 0%)",
                          borderRadius: "10px !important",
                          marginTop: 10,
                          float: "left",
                          objectFit: "cover",
                          height: "70px",
                          width: "70px",
                        }}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.image}
                      </Typography>
                    </div>
                  )} */}
                  <div>
                    <div className="form-group mb-0">
                      <p className="text-start">Select Image</p>
                    </div>
                    <div
                      role="presntation"
                      tabIndex={0}
                      className="d-flex align-items-center"
                    >
                      <div
                        style={{
                          height: 130,
                          width: 130,
                          border: "2px dashed gray",
                          textAlign: "center",
                          marginTop: 10,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <i
                          className="fas fa-plus"
                          style={{ paddingTop: 30, fontSize: 70 }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control "
                          autocomplete="off"
                          tabIndex="-1"
                          style={{
                            position: "absolute",
                            top: "40px",
                            transform: "scale(3.5)",
                            opacity: 0,
                          }}
                          onChange={HandleInputImage}
                          onKeyPress={handleKeyPress}
                        />
                      </div>
                      {imagePath && (
                        <>
                          <img
                            height="70px"
                            width="70px"
                            alt="app"
                            className="ms-4"
                            src={imagePath}
                            draggable="false"
                            style={{
                              marginTop: 10,
                              float: "left",
                              borderRadius: "12px",
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>

          <DialogActions>
            <button
              type="button"
              className="btn dark-icon btn-primary float-right mr-3 mb-3"
              onClick={handleSubmit}
            >
              <i className="ri-send-plane-fill mr-1 fs-6 mb-1"></i>
              Send
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Navbar;
