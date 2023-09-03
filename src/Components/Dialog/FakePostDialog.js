import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateFakePost,
  createFakePost,
} from "../../store/fakePost/fakePost.action";
import { getFakeUser } from "../../store/fakeUser/fakeUser.action";
import { CLOSE_FAKE_POST_DIALOG } from "../../store/fakePost/fakePost.type";

const FakePostDialog = (props) => {
  const { dialog: open, dialogData } = useSelector((state) => state.fakePost);
  const { fakeUser } = useSelector((state) => state.fakeUser);
  console.log("fakeUser", fakeUser);

  const [userName, setUserName] = useState("");
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    props.getFakeUser();
  }, []);
  useEffect(() => {
    setUserName("");
    setDescription("");
    setImagePath("");
    setError({ userName: "", description: "", image: "" });
  }, [open]);

  useEffect(() => {
    setUserName(dialogData?.userId._id);
    setDescription(dialogData?.description);
    setImagePath(dialogData?.postImage);
  }, [dialogData]);

  const handleSubmit = () => {
    if (!userName || userName === "Select User") {
      let error = {};
      if (!userName || userName === "Select User")
        error.userName = "User Is required";

      if (image.length === 0) error.image = "Image Is required";
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("userId", userName);
      formData.append("description", description);
      formData.append("postImage", image);

      if (dialogData) {
        props.updateFakePost(dialogData._id, formData);
      } else {
        props.createFakePost(formData);
      }
      handleClose();
    }
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: CLOSE_FAKE_POST_DIALOG });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="dialogue_background_color"
        >
          <span className="modal-title font-weight-bold h4"> Post </span>
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
        <DialogContent className="dialogue_background_color">
          <div className="modal-body pt-1 px-1 pb-3">
            <div className="d-flex flex-column">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="form-floating">
                        <select
                          name="type"
                          class="form-control form-control-line"
                          id="UserName"
                         disabled ={dialogData ? true :false}
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);

                            if (e.target.value === "Select User") {
                              return setError({
                                ...error,
                                userName: "User is required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                userName: "",
                              });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        >
                          <option value="Select User">---Select User---</option>
                          {fakeUser.map((data) => {
                            return (
                              <>
                                <option value={data._id}>{data.name}</option>
                              </>
                            );
                          })}
                        </select>
                        <label for="userName">User</label>
                      </div>
                      {error.userName && (
                        <div className="ml-1 mt-1">
                          {error.userName && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">
                                {error.userName}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row align-align-items-center">
                  <div className="col-md-12">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Extra Coin</label> */}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          id="description"
                          min="0"
                          placeholder="Post Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        <label for="description">Description</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row  align-align-items-center">
                  <div className="col-md-12">
                    <div>
                      <div className="form-group mb-0">
                        <p className="form-label mt-3">Image</p>
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
                              top: 0,
                              transform: "scale(3.5)",
                              opacity: 0,
                            }}
                            onChange={(e) => handleImage(e)}
                            onKeyPress={handleKeyPress}
                          />
                        </div>
                        {imagePath && (
                          <img
                            src={imagePath}
                            alt="fakeUser"
                            draggable="false"
                            className="mt-3 ms-3"
                            width="148"
                            height="80"
                            style={{
                              borderRadius: "12px",
                            }}
                          />
                        )}
                      </div>

                      {error.image && (
                        <div className="ml-1 mt-1">
                          {error.image && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">{error.image}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2 float-right">
                  {dialogData ? (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handleSubmit}
                    >
                      Insert
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn ml-2 btn-danger px-3"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { getFakeUser, updateFakePost, createFakePost })(
  FakePostDialog
);
