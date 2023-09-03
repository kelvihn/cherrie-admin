import axios from "axios";

import { setToast } from "../../utils/toast";
import * as ActionType from "./gift.type";

const GiftClick = localStorage.getItem("giftClick");

// get gift category
export const getGift = () => (dispatch) => {
  axios
    .get("gift")
    .then((res) => {
      console.log(res.data.gift);
      dispatch({
        type: ActionType.GET_GIFT,
        payload: res.data.gift,
      });
    })
    .catch((error) => setToast("error", error.message));
};

// create gift
export const createGift = (formData) => (dispatch) => {
  axios
    .post(`gift`, formData)
    .then((res) => {
      if (res.data.status) {
        setToast("success", "gift Create Successfully");
        dispatch({ type: ActionType.CREATE_NEW_GIFT, payload: res.data.gift });
        setTimeout(() => {
          GiftClick !== null && (window.location.href = "/admin/gift");
        }, 1000);
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error.message));
};

// updateGift
export const updateGift = (id, formData) => (dispatch) => {
  axios
    .patch(`gift/?giftId=${id}`, formData)
    .then((res) => {
      console.log(res.data.gift);
      if (res.data.status) {
        setToast("success", "gift Edit Successfully");
        dispatch({
          type: ActionType.EDIT_GIFT,
          payload: { data: res.data.gift, id },
        });
        setTimeout(() => {
          GiftClick !== null && (window.location.href = "/admin/gift");
        }, 3500);
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error.message));
};

// delete
export const deleteGift = (id) => (dispatch) => {
  axios
    .delete(`gift?giftId=${id}`)
    .then((res) => {
      console.log(res.data.gift);
      if (res.data.status) {
        setToast("success", "gift Delete Successfully");
        dispatch({
          type: ActionType.DELETE_GIFT,
          payload: id,
        });
      } else {
        setToast("error", res.data.message);
        console.log("error.....", res.data.message);
      }
    })
    .catch((error) => setToast("error", error.message));
};
