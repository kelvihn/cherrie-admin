import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { CLOSE_IMAGE_DIALOGUE } from "../../store/user/user.type";
import $ from "jquery";
import { useState } from "react";
import { baseURL } from "../../utils/Config";
import { getUserPostDetails } from "../../store/user/user.action";
import gift from "../../assets/img/gift.png";
import { useHistory } from "react-router-dom";

const ShowImageDialog = (props) => {
  const { dialogue, dialogueData, postDetails } = useSelector(
    (state) => state.user
  );
  const [type, setType] = useState("like");
  const [data, setData] = useState([]);

  useEffect(
    () => () => {
      setType("like");
    },
    []
  );

  useEffect(() => {
    if (dialogueData) {
      props.getUserPostDetails(dialogueData?._id, type);
    }
  }, [dialogueData, type]);

  useEffect(() => {
    setData(postDetails);
  }, [postDetails]);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: CLOSE_IMAGE_DIALOGUE });
  };
  const handleType = (type) => {
    setType(type);
    $(document).on("click", ".user", function () {
      $(".user").removeClass("userActive");
      $(this).addClass("userActive");
    });
  };
  const history = useHistory();

  const handleOpenProfile = (userId) => {
    handleClose();

    history.push({
      pathname: "/admin/user/userProfile",
      state: { userId },
    });
  };

  return (
    <Dialog
      open={dialogue}
      aria-labelledby="responsive-dialog-title"
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle
        id="responsive-dialog-title"
        className="dialogue_background_color"
      >
        <span className="modal-title font-weight-bold h4"> Post </span>
        <div className="row">
          <div
            className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6"
            style={{ borderRight: "1px solid rgb(170, 193, 217)" }}
          >
            <img
              src={dialogueData?.postImage}
              alt=""
        
              draggable="false"
              className="mx-auto d-block UserProfileDialogue"
            />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 px-5  d-none d-sm-none d-md-none d-lg-block">
            <div
              className="row text-center"
              style={{ borderBottom: "2px solid #eef2f6" }}
            >
              <div
                className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4  user userActive "
                onClick={() => handleType("like")}
                style={{ cursor: "like" }}
              >
                <span className="text-profile pt-2">Like </span>
                <spn className="ml-2 text">{dialogueData?.like}</spn>
              </div>
              <div
                className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 user"
                onClick={() => handleType("comment")}
                style={{ cursor: "pointer" }}
              >
                <span className="text-profile pt-2 text-center">Comment</span>
                <spn className="ml-2 text">{dialogueData?.comment}</spn>
              </div>
              <div
                className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 user "
                onClick={() => handleType("gift")}
                style={{ cursor: "pointer" }}
              >
                <span className="text-profile  pt-2 text-center">Gift</span>
                <spn className="text ml-2">{dialogueData?.gift}</spn>
              </div>
            </div>
            <div className="post_view_commentData">
              {postDetails?.length > 0 ? (
                postDetails?.map((data) => {
                  return (
                    <>
                      <div
                        className="row py-2 px-4 d-flx align-items-center"
                        style={{
                          borderBottom: "1px solid #aac1d9",
                          borderRadius: "7px",
                        }}
                      >
                        <div className="col-1 d-flex align-items-center">
                          <img
                            src={data?.profileImage}
                            draggable="false"
                            className="mx-auto"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "25px",
                              backgroundColor: "#aad4fd",
                            }}
                            alt=""
                            onClick={() => handleOpenProfile(data.userId)}
                          />
                        </div>
                        <div className="col-9 mr-2 pt-2 pl-4">
                          <p className="mb-0" style={{ fontSize: "20px" }}>
                            {data?.name}
                          </p>

                          {type === "comment" ? (
                            <p
                              className="mb-0"
                              style={{ fontSize: "15px", color: "#7b7e81" }}
                            >
                              {data?.comment}
                            </p>
                          ) : (
                            <p
                              className="mb-0"
                              style={{ fontSize: "15px", color: "#7b7e81" }}
                            >
                              {data?.bio}
                            </p>
                          )}
                        </div>

                        {type === "gift" ? (
                          <>
                            <div className="col-1 pr-3">
                              <img
                                src={data?.gift ? baseURL + data?.gift : gift}
                                draggable="false"
                                className="mx-auto"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                                alt=""
                                onClick={() => handleOpenProfile(data.userId)}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="col-1 pr-3">
                            {type === "like" ? (
                              <i className="fa fa-heart text-danger mt-2" />
                            ) : (
                              <i
                                className="fa-solid fa-comment mt-2 "
                                style={{ color: "#000" }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="text-center mt-3">
                  <p>No Post {type}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogTitle>

      <IconButton
        style={{
          position: "absolute",
          right: 0,
        }}
      >
        <Tooltip title="Close">
          <Cancel className="modal-title text-light" onClick={handleClose} />
        </Tooltip>
      </IconButton>
      <DialogContent className="dialogue_background_color"></DialogContent>
    </Dialog>
  );
};

export default connect(null, { getUserPostDetails })(ShowImageDialog);
