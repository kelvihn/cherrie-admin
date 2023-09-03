import axios from "axios";

import * as ActionType from "./fakePost.type";
import { setToast } from "../../utils/toast";

// get  Post

export const getFakePost = () => (dispatch) => {
  axios
    .get("/userFake/userFakePost")
    .then((res) => {
      console.log(res.data);

      if (res.data.status) {
        dispatch({
          type: ActionType.GET_FAKE_POST,
          payload: res.data.userAll,
        });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

// create  Post

export const createFakePost = (formData) => (dispatch) => {
  axios
    .post(`/userFake/addFakePost`, formData)
    .then((res) => {
      console.log(res.data.post);
      if (res.data.status) {
        dispatch({
          type: ActionType.CREATE_FAKE_POST,
          payload: res.data.post,
        });
        setToast("success", " Post Create Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

// update  Post
export const updateFakePost = (id, formData) => (dispatch) => {

  axios
    .patch(`userFake/userFakeUpdatePost?postId=${id}`, formData)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.EDIT_FAKE_POST,
          payload: {
            data: res.data.post,
            id,
          },
        });
        setToast("success", " Post Update Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

// delete  Post
export const deleteFakePost = (id) => (dispatch) => {
  axios
    .delete(`/userFake/userFakeDeletePost?postId=${id}`)
    .then((res) => {
      console.log(res.data.FakePost);
      if (res.data.status) {
        dispatch({
          type: ActionType.DELETE_FAKE_POST,
          payload: id,
        });
        setToast("success", " Post Delete Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};
