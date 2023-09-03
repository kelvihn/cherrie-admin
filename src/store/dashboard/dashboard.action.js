import axios from "axios";
import { baseURL, key } from "../../utils/Config";
import * as ActionType from "./dashboard.type";

export const getDashboard = () => (dispatch) => {
  axios
    .get(`dashboard`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ActionType.GET_DASHBOARD, payload: res.data.dashboard });
    })
    .catch((error) => console.error(error));
};

export const getChartAnalcite =
  (type, date, startDate, endDate) => (dispatch) => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json", key: key },
    };
    fetch(
      `${baseURL}dashboard/analytic?type=${type}&date=${date}&startDate=${startDate}&endDate=${endDate}`,
      request
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        dispatch({ type: ActionType.GET_ANALCITE, payload: res.analytic });
      })
      .catch((error) => {
        console.error(error);
      });
  };
