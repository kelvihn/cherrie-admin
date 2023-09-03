import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./RedeemType";

export const getRedeem = (type) => (dispatch) => {
  axios
    .get(`redeem?type=${type}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({ type: ActionType.GET_REDEEM, payload: res.data.redeem });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};

export const acceptRedeem = (id, type) => (dispatch) => {
  axios
    .patch(`redeem/${id}?type=${type}`)
    .then((res) => {
      if (res.data.status) {
        setToast("success", "Accept Success!!");
        dispatch({ type: ActionType.ACCEPT_REDEEM, payload: id });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};

export const acceptRedeemDecline = (id) => (dispatch) => {
  axios
    .patch(`redeem/${id}`)
    .then((res) => {
      if (res.data.status) {
        setToast("success", "Decline Success!!");

        dispatch({ type: ActionType.ACCEPT_REDEEM, payload: id });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};
