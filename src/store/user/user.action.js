import axios from "axios";
import { baseURL, key } from "../../utils/Config";

import { setToast } from "../../utils/toast";
import * as ActionType from "./user.type";

export const getUser = (start, limit) => (dispatch) => {
  axios
    .get(`user/userGet?start=${start}&limit=${limit}`)
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: ActionType.GET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get profile

export const getUserProfile = (id) => (dispatch) => {
  axios
    .get(`user/userGetProfile?userId=${id}`)
    .then((res) => {
      dispatch({
        type: ActionType.GET_USER_PROFILE,
        payload: res.data.user,
      });
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};

export const blockUser = (user) => (dispatch) => {
  axios
    .put(`user/isBlock?userId=${user._id}`)
    .then((res) => {
      console.log(res.data.user);
      dispatch({
        type: ActionType.GET_USER_BLOCK,
        payload: { data: res.data.user, id: user._id },
      });
      setToast(
        "success",
        `${user.name} Is ${
          user.isBlock !== true ? "Blocked" : "Unblocked"
        } Successfully!`
      );
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};
// get history

export const getUserHistory =
  (userId, startDate, endDate, page, size, type) => (dispatch) => {
    axios
      .get(
        `history/historyForUser?userId=${userId}&type=${type}&start=${page}&limit=${size}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ActionType.GET_USER_HISTORY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

// user coin update
export const updateHostCoin = (val, ids) => (dispatch) => {
  axios
    .post(`user/addLessCoin`, { userId: ids, coin: val })
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.UPDATE_USER_COIN,
          payload: { editHostCoin: res.data.hostExist },
        });
        setToast("success", "User Updated Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error));
};

// get user Followers

export const getUserFollowers = (id, type) => (dispatch) => {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json", key: key },
  };
  fetch(`${baseURL}follow/showList?userId=${id}&type=${type}`, request)
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: ActionType.GET_USER_FOLLOWERS_LIST,
        payload: res.userFollow,
      });
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};

// get post Details

export const getUserPostDetails = (id, type) => (dispatch) => {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json", key: key },
  };
  fetch(`${baseURL}user/postDetails?postId=${id}&type=${type}`, request)
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: ActionType.GET_USER_POST_DETAILS,
        payload: res.posts,
      });
    })
    .catch((err) => console.log(err));
};

export const liveUser = (user) => (dispatch) => {
  axios
    .put(`userFake/isLive?userId=${user._id}`)
    .then((res) => {
      console.log(res.data.user);
      dispatch({
        type: ActionType.LIVE_SWITCH,
        payload: res.data.user,
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
