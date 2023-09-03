import axios from "axios";

import * as ActionType from "./fakeUser.type";
import { setToast } from "../../utils/toast";

// get Fake User

export const getFakeUser = () => (dispatch) => {
  axios
    .get("/user/userGet?userType=fake")
    .then((res) => {
      console.log(res.data);

      if (res.data.status) {
        dispatch({
          type: ActionType.GET_FAKE_USER,
          payload: res.data.userAll,
        });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

// create fake user

export const createFakeUser = (formData) => (dispatch) => {
  axios
    .post(`/userFake/createUser`, formData)
    .then((res) => {
    
      if (res.data.status) {
        dispatch({
          type: ActionType.CREATE_FAKE_USER,
          payload: res.data.user,
        });
        setToast("success", "Fake User Create Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

// update fake user
export const updateFakeUser = (id, formData) => (dispatch) => {
  axios
    .post(`/fakeUser?fakeUserId=${id}`, formData)
    .then((res) => {
      console.log(res.data.fakeUser);
      if (res.data.status) {
        dispatch({
          type: ActionType.EDIT_FAKE_USER,
          payload: {
            data: res.data.fakeUser,
            id,
          },
        });
        setToast("success", "Fake User Update Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

// delete Fake User
export const deleteFakeUser = (id) => (dispatch) => {
  axios
    .post(`/fakeUser?fakeUserId=${id}`)
    .then((res) => {
      console.log(res.data.fakeUser);
      if (res.data.status) {
        dispatch({
          type: ActionType.DELETE_FAKE_USER,
          payload: id,
        });
        setToast("success", "Fake User Delete Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const liveUser = (user) => (dispatch) => {
  axios
    .put(`userFake/isLive?userId=${user._id}`)
    .then((res) => {
      console.log(res.data.user);
      dispatch({
        type: ActionType.LIVE_SWITCH,
        payload: { data: res.data.user, id: user._id },
      });
      setToast(
        "success",
        `${user.name} Is ${
          user.isLive !== true ? "IsLive Enable " : "IsLive Disable "
        } Successfully!`
      );
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};
