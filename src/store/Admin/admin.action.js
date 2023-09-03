import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./admin.type";

export const loginAdmin = (login) => (dispatch) => {
 
  axios
    .post("/admin/loginAdmin", login)
    .then((res) => {
      console.log(res);
      if (res.data.status) {
        dispatch({ type: ActionType.LOGIN_ADMIN, payload: res.data.token });
        setToast("success", "Login Successfully!");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      setToast("error", error);
      console.log(error);
    });
};

// get profile
export const getProfile = () => (dispatch) => {
  axios
    .get("admin/adminData")
    .then((res) => {
      dispatch({ type: ActionType.PROFILE_ADMIN, payload: res.data.admin });
    })
    .catch((error) => console.log("error", error));
};

// handel Image Update

export const updateImage = (formData) => (dispatch) => {
  axios
    .patch("admin/updateImage", formData)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.UPDATE_IMAGE_PROFILE,
          payload: res.data.admin,
        });
        setToast("success", "Image Update Successfully");
      }
    })
    .catch((error) => {
      setToast("error", error);
    });
};

// handle update profile name  email

export const profileUpdate = (edit) => (dispatch) => {
  axios
    .patch("admin/updateAdmin", edit)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.UPDATE_PROFILE,
          payload: res.data.admin,
        });
        setToast("success", "Admin update Successfully");
      }
    })
    .catch((error) => {
      setToast("error", error);
    });
};

// change password

export const ChangePassword = (password) => (dispatch) => {
  
  axios
    .put(`admin/updatePassword`, password)
    .then((res) => {
      
      if (res.data.status) {
        setToast("success", "Change Your Password!");
        setTimeout(() => {
          dispatch({ type: ActionType.LOGOUT_ADMIN });
          window.location.href = "/";
        }, [3000]);
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      
      setToast("error", error.message);
      console.log(error);
    });
};
