import React from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { CLOSE_BANNER } from "../../store/Banner/banner.type";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useEffect } from "react";
import { baseURL } from "../../utils/Config";
import { createBanner, editBanner } from "../../store/Banner/banner.action";

const BannerDialog = (props) => {
  const { dialog: open, dialogData } = useSelector((state) => state.banner);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState("");

  // Helper function to construct proper image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    
    // If it's already a full URL (Cloudinary), return as-is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path (old local storage), prepend baseURL
    return baseURL + imageUrl;
  };

  useEffect(() => {
    setUrl(dialogData?.url);
    // Use the helper function instead of always prepending baseURL
    setImagePath(getImageUrl(dialogData?.image));
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        url: "",
        imagePath: "",
      });
      setUrl("");
      setImagePath("");
    },
    [open]
  );

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: CLOSE_BANNER });
  };

  const handelSubmit = () => {
    if (!url || !imagePath) {
      let error = {};
      if (!url) error.url = "url is Required!";
      if (image.length === 0) error.image = "image is required!";
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("url", url);
      formData.append("image", image);
      if (dialogData?._id) {
        props.editBanner(formData, dialogData?._id);
      } else {
        props.createBanner(formData);
      }
    }
    handleClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handelSubmit();
    }
  };

  // show dialog image
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
          <span className="modal-title font-weight-bold h4"> Banner </span>
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
                <div className="form-group ">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      id="URL"
                      placeholder=" "
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            url: "Url is Required !",
                          });
                        } else {
                          return setError({
                            ...error,
                            url: "",
                          });
                        }
                      }}
                      onKeyPress={handleKeyPress}
                    />
                    <label for="URL">URL</label>
                  </div>
                  {error.url && (
                    <div className="ml-1 mt-1">
                      {error.url && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">{error.url}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <div className="form-group mb-0">
                    <p className="form-label mt-3">Image</p>
                  </div>
                  <div role="presntation" tabIndex={0} className="d-flex align-items-center">

                    <div style={{ height: 130, width: 130, border: '2px dashed gray', textAlign: 'center', marginTop: 10, position: "relative", overflow: "hidden" }}>
                      <i className="fas fa-plus" style={{ paddingTop: 30, fontSize: 70 }} />
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control "
                        autocomplete="off"
                        tabIndex="-1"
                        style={{ position: "absolute", top: 0, transform: "scale(3.5)", opacity: 0 }}
                        onChange={(e) => handleImage(e)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    {imagePath && (
                      <img
                        src={imagePath}
                        alt="banner"
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

                <div className="mt-5 float-right">
                  {dialogData ? (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handelSubmit}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handelSubmit}
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

export default connect(null, { createBanner, editBanner })(BannerDialog);