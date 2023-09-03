import React, { useEffect, useState } from "react";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//MUI
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import {
  createGiftCategory,
  updateGiftCategory,
} from "../../store/GiftCategory/GiftCategory.action";

//action

import { CLOSE_CATEGORY_DIALOG } from "../../store/GiftCategory/Giftcategory.type";
import { baseURL } from "../../utils/Config";

const GiftCategoryDialog = (props) => {
  const dispatch = useDispatch();

  const { dialogOpen: open, dialogData } = useSelector(
    (state) => state.giftCategory
  );

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const [errors, setError] = useState({
    image: "",
    name: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(dialogData.name);
      setImagePath(baseURL + dialogData.image);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        image: "",
        name: "",
      });
      setMongoId("");
      setName("");
      setImageData(null);
      setImagePath(null);
    },
    [open]
  );

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

  const closePopup = () => {
    dispatch({ type: CLOSE_CATEGORY_DIALOG });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    if (!mongoId && (!name || !imagePath)) {
      if (!name) error.name = "Name is Required!";
      if (!imageData || !imagePath) error.image = "Image is Required!";

      return setError({ ...error });
    }
    if (mongoId && (!name || !imagePath)) {
      if (!name) error.name = "Name is Required!";
      if (!imageData && !imagePath) error.image = "Image is Required!";
      return setError({ ...error });
    }

    const formData = new FormData();

    formData.append("image", imageData);
    formData.append("name", name);
    if (mongoId) {
      props.updateGiftCategory(mongoId, formData);
    } else {
      props.createGiftCategory(formData);
    }
    closePopup();
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
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

            Gift Category
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
            <Cancel className="modal-title text-light" onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent className="dialogue_background_color">
          <div className="modal-body pt-1 px-1 pb-3">
            <div className="d-flex flex-column">
              <form>
                <div class="form-group">
                  <div className="row">
                    <div className="col-md-12 my-2">
                      {/* <label className="dialog__input__title" htmlFor="earning">
                        Name
                      </label> */}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Category Name"
                          value={name}
                          id="GiftName"
                          onChange={(e) => {
                            setName(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...errors,
                                name: "Name is Required!",
                              });
                            } else {
                              return setError({
                                ...errors,
                                name: "",
                              });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        />
                        <label htmlFor="GiftName">Name</label>
                      </div>
                      {errors.name && (
                        <div className="ml-2 mt-1">
                          {errors.name && (
                            <div className="pl-1 text__left">
                              <span style={{ color: "rgb(0, 150, 136)" }}>
                                {errors.name}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12 my-2">
                      <label className="dialog__input__title" htmlFor="earning">
                        Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        required=""
                        onChange={HandleInputImage}
                        onKeyPress={handleKeyPress}
                      />
                      {errors.image && (
                        <div className="ml-2 mt-1">
                          {errors.image && (
                            <div className="pl-1 text__left">
                              <span style={{ color: "rgb(0, 150, 136)" }}>
                                {errors.image}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      {imagePath && (
                        <>
                          <img
                            height="70px"
                            width="70px"
                            alt="app"
                            src={imagePath}
                            style={{
                              // boxShadow: "0 5px 15px 0 rgb(105 103 103 / 50%)",
                              // border: "2px solid #fff",
                              borderRadius: 10,
                              marginTop: "20px",
                              float: "left",
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <DialogActions>
                  {dialogData ? (
                    <button
                      type="button"
                      className="btn btn-info mx-2"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-info mx-2"
                      onClick={handleSubmit}
                    >
                      Insert
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </DialogActions>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { createGiftCategory, updateGiftCategory })(
  GiftCategoryDialog
);
