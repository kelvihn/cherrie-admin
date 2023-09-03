import React from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { CLOSE_FAKE_USER_DIALOG } from "../../store/fakeUser/fakeUser.type";
import { useEffect } from "react";
import {
  createFakeUser,
  updateFakeUser,
} from "../../store/fakeUser/fakeUser.action";
import { baseURL } from "../../utils/Config";

const FakeUserDialog = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [video, setVideo] = useState([]);
  const [videoPath, setVideoPath] = useState("");
  const [error, setError] = useState("");

  const { dialog: open, dialogData } = useSelector((state) => state.fakeUser);

  useEffect(
    () => () => {
      setName("");
      setEmail("");
      setAge("");
      setBio("");
      setImagePath("");
      setVideoPath("");
      setCountry("");
      setGender("");
      setError({
        name: "",
        bio: "",
        age: "",
        gender: "",
        email: "",
        country: "",
        image: "",
        video: "",
      });
    },
    [open]
  );

  useEffect(() => {
    if (dialogData) {
      setName(dialogData.name);
      setEmail(dialogData.email);
      setBio(dialogData.bio);
      setGender(dialogData.gender);
      setAge(dialogData.age);
      setCountry(dialogData.country);
      setImagePath(baseURL + dialogData.profileImage);
      setVideoPath(baseURL + dialogData.video);
    }
  }, [dialogData]);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!name || !email || !gender || !country || !bio || !age) {
      let error = {};
      if (!name) error.name = "Name is required";
      if (!bio) error.bio = "Bio is required";
      if (!age) error.age = "Age is required";
      if (!email) error.email = "Email is required";
      if (!country) error.country = "Country is required";
      if (!gender) error.gender = "Gender is required";
      if (image.length === 0) error.image = "Image is required";
      if (video.length === 0) error.video = "video is required";
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("country", country);
      formData.append("gender", gender);
      formData.append("bio", bio);
      formData.append("age", age);
      formData.append("profileImage", image);
      formData.append("video", video);

      if (dialogData) {
        props.updateFakeUser(dialogData._id, formData);
      } else {
        props.createFakeUser(formData);
      }
      handleClose();
    }
  };
  const handleClose = () => {
    dispatch({ type: CLOSE_FAKE_USER_DIALOG });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleVideo = (e) => {
    setVideo(e.target.files[0]);
    setVideoPath(URL.createObjectURL(e.target.files[0]));
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
          <span className="modal-title font-weight-bold h4"> User </span>
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
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Coin</label> */}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="Name"
                          required=""
                          value={name}
                          placeholder="name"
                          onChange={(e) => {
                            setName(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                name: "name is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                name: "",
                              });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        />
                        <label for="Name">Name</label>
                      </div>
                      {error.name && (
                        <div className="ml-1 mt-1">
                          {error.name && (
                            <div className=" text__left">
                              <span className="text-danger">{error.name}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Extra Coin</label> */}
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          required=""
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                email: "email is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                email: "",
                              });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        />
                        <label for="email">email</label>
                      </div>
                      {error.email && (
                        <div className="ml-1 mt-1">
                          {error.email && (
                            <div className=" text__left">
                              <span className="text-danger">{error.email}</span>
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
                      {/* <label className="mb-2 text-gray">Amount($)</label> */}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          id="bio"
                          placeholder="Bio"
                          value={bio}
                          onChange={(e) => {
                            setBio(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                bio: "bio is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                bio: "",
                              });
                            }
                          }}
                        />
                        <label for="bio">bio</label>
                      </div>
                      {error.bio && (
                        <div className="ml-1 mt-1">
                          {error.bio && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">{error.bio}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row align-align-items-center">
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Amount($)</label> */}
                      <div className="form-floating">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          required=""
                          id="age"
                          placeholder="20"
                          value={age}
                          onChange={(e) => {
                            setAge(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                age: "age is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                age: "",
                              });
                            }
                          }}
                        />
                        <label for="age">age</label>
                      </div>
                      {error.age && (
                        <div className="ml-1 mt-1">
                          {error.age && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">{error.age}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Amount($)</label> */}
                      <div className="form-floating">
                        <input
                          className="form-control"
                          required=""
                          id="country"
                          placeholder="india"
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                country: "country is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                country: "",
                              });
                            }
                          }}
                        />
                        <label for="country">country</label>
                      </div>
                      {error.country && (
                        <div className="ml-1 mt-1">
                          {error.country && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">
                                {error.country}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <p className="form-label fw-bold mt-3 "> Gender</p>
                    <FormControl className="mb-0">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={gender?.toLowerCase()}
                        onChange={(e) => {
                          setGender(e.target.value);
                          if (!e.target.value)
                            return setError({
                              ...error,
                              gender: "Gender Is Required !",
                            });
                          else {
                            return setError({
                              ...error,
                              gender: "",
                            });
                          }
                        }}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                    {error.gender && (
                      <div className="ml-1 mt-1">
                        {error.gender && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">{error.gender}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row  align-align-items-center">
                  <div className="col-md-6">
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
                      </div>
                      {imagePath && (
                        <img
                          src={imagePath}
                          alt="fakeUser"
                          draggable="false"
                          className="mt-3 ms-3"
                          width="100"
                          height="100"
                          style={{
                            borderRadius: "12px",
                          }}
                        />
                      )}

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
                  <div className="col-md-6">
                    <div>
                      <div className="form-group mb-0">
                        <p className="form-label mt-3">Video</p>
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
                            accept="video/*"
                            className="form-control "
                            autocomplete="off"
                            tabIndex="-1"
                            style={{
                              position: "absolute",
                              top: 0,
                              transform: "scale(3.5)",
                              opacity: 0,
                            }}
                            onChange={(e) => handleVideo(e)}
                            onKeyPress={handleKeyPress}
                          />
                        </div>
                      </div>
                      {videoPath && (
                        <video
                          src={videoPath}
                          autoPlay
                          loop
                          alt="fakeUser"
                          draggable="false"
                          className="mt-3 "
                          width="150"
                          height="120"
                          style={{
                            borderRadius: "12px",
                          }}
                        />
                      )}

                      {error.video && (
                        <div className="ml-1 mt-1">
                          {error.video && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">{error.video}</span>
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

export default connect(null, { createFakeUser, updateFakeUser })(
  FakeUserDialog
);
