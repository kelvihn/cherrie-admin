import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import EditGift from "../Components/Dialog/Gift/EditGift";
import { getGift } from "../store/Gift/gift.action";
import { OPEN_GIFT_DIALOG } from "../store/Gift/gift.type";
import { warning } from "../utils/Alert";
import { baseURL } from "../utils/Config";
import AllGift from "./AllGift";

//action
import { deleteGift } from "../store/Gift/gift.action";
import AddGift from "../Components/Dialog/Gift/AddGift";

const Gift = (props) => {
  const { gift } = useSelector((state) => state.gift);

  const [data, setData] = useState([]);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    props.getGift(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setData(gift);
  }, [gift]);

  const handleEdit = (data) => {
    dispatch({ type: OPEN_GIFT_DIALOG, payload: data });
  };
  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteGift(id);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_GIFT_DIALOG });
  };
  const handleAddOpen = () => {
    history.push("/admin/gift/giftAdd");
  };
  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6  col-sm-12 col-12">
          <h4> Gift </h4>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 col-12 ">
          <div class="breadcrumb-four float-right">
            <ul class="breadcrumb">
              <li>
                <Link to="/admin/dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-home"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </Link>
              </li>

              <li class="active">
                <a href={() => false}> Gift </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row layout-top-spacing">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 float-left">
          <button
            class="btn text-white  text-center btn-danger"
            onClick={handleAddOpen}
          >
            New
          </button>
        </div>
      </div>
      <div class={`layout-top-spacing row mt-3`}>
        {data?.length > 0 ? (
          data.map((data, index) => {
            console.log("gift map", data);
            return (
              <>
                <div
                  class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3"
                  key={index}
                >
                  <div class="card contact-card card-bg pointer-cursor m-2">
                    <div class="card-body ">
                      <div className="row align-items-center">
                        <div className="col-6">
                          <img
                            src={data.image}
                            alt=""
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              display: "block",
                              borderRadius: "50px",
                            }}
                            class="shadow rounded-circle"
                          />
                        </div>
                        <div className="col-6">
                          <div class="d-flex contact-card-info justify-content-center mt-2 pt-2">
                            <h5 className="dialog__input__title mx-1 ">
                              {data.coin} Coin
                            </h5>
                          </div>
                          <div class="d-flex contact-card-info my-2  px-2 justify-content-center">
                            <h5 className="dialog__input__title ">
                              {data?.platFormType === 0 ? "Android" : "IOS"}
                            </h5>
                          </div>
                          <div className="row">
                            <div
                              className="col-6 text-right"
                              style={{ paddingLeft: "1px" }}
                            >
                              <div class="contact-card-buttons text-right">
                                <button
                                  type="button"
                                  class="btn btn-info badge badge-lg  p-2 px-3 m-1 d-inline-block"
                                  onClick={() => handleEdit(data)}
                                >
                                  <i class="fas fa-edit text-white"></i>
                                </button>
                              </div>
                            </div>
                            <div
                              className="col-6"
                              style={{ paddingLeft: "5px" }}
                            >
                              <div class="contact-card-buttons text-left ">
                                <button
                                  type="button"
                                  class="btn btn-danger badge badge-lg  p-2 px-3 m-1 d-inline-block"
                                  onClick={() => handleDelete(data._id)}
                                >
                                  <i class="fas fa-trash text-white"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <tr>
            <td colSpan="6" align="center">
              Nothing to show!!
            </td>
          </tr>
        )}
      </div>
      <EditGift />
    </>
  );
};

export default connect(null, { getGift, deleteGift })(Gift);
