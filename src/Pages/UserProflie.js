import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  blockUser,
  updateHostCoin,
  getUserFollowers,
} from "../store/user/user.action";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { setToast } from "../utils/toast";
import EdiText from "react-editext";
import { baseURL } from "../utils/Config";
import $ from "jquery";
import diamond from "../assets/img/diamond.png";
import { SHOW_IMAGE_DIALOGUE } from "../store/user/user.type";
import ShowImageDialog from "../Components/Dialog/ShowImageDialog";
import { liveUser } from "../store/user/user.action";
import noImage from "../assets/img/noImage.png";

const UserProflie = (props) => {
  const location = useLocation();

  let id = location?.state?.userId;

  const { userProfile, followers } = useSelector((state) => state.user);

  const [type, setType] = useState("about");

  const [follow, setFollow] = useState([]);

  useEffect(() => {
    if (type === "following" || type === "followers") {
      props.getUserFollowers(id, type);
    }
    props.getUserProfile(id); // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (type === "following" || type === "followers") {
      props.getUserFollowers(id, type);
    }
  }, [type]);

  useEffect(() => {
    setFollow(followers);
  }, [followers]);

  const history = useHistory();
  const handlePreviousPage = () => {
    history.goBack();
  };
  const handleClick = (dataId) => {
    if (userProfile.isFake) {
      props.liveUser(dataId);
    } else {
      props.blockUser(dataId);
    }
  };

  const handleOpenImage = (url) => {
    window.open(url, "_blank");
  };

  const handleHistory = () => {
    history.push({
      pathname: "/admin/user/history",
      state: { userId: id },
    });
  };

  const handleType = (type) => {
    setType(type);

    $(document).on("click", ".user", function () {
      $(".user").removeClass("userActive");
      $(this).addClass("userActive");
    });
  };
  const dispatch = useDispatch();
  const handelShowImage = (data) => {
    dispatch({ type: SHOW_IMAGE_DIALOGUE, payload: data });
  };
  // update coin

  const handleSave = (val) => {
    if (val < 0) {
      setToast("error", "Invalid Coin");
    } else {
      const coinValid = isNumeric(val);
      if (!coinValid) {
        setToast("error", "Invalid Coin");
      } else {
        props.updateHostCoin(val, userProfile._id);
      }
    }
  };
  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d+$/.test(val);
    return validNumber;
  };

  console.log("userLive", userProfile?.isLive);
  const handlePervious = () => {
    history.goBack();
  };
  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", noImage);
    });
  });

  const newEmail = userProfile?.email?.substring(0, 22) + "...";
  return (
    <>
      <div className="text-end">
        <button className="btn btn-success" onClick={handleHistory}>
          <i className="fa fa-history" />
        </button>
        <button className="btn btn-info ml-2" onClick={handlePervious}>
          <i className="fa-solid fa-angles-left text-white fs-6" />
        </button>
      </div>
      <div className="row my-4 mr-3">
        <div className="col-xl-3 col-12">
          <div className="" style={{ overflow: "hidden" }}>
            <div className="">
              <div className="">
                {userProfile.isFake ? (
                  <img
                    src={baseURL + userProfile?.profileImage}
                    draggable="false"
                    className="mx-auto image profileImage "
                    alt=""
                    onClick={() =>
                      handleOpenImage(baseURL + userProfile?.profileImage)
                    }
                  />
                ) : (
                  <img
                    src={userProfile?.profileImage}
                    draggable="false"
                    className="mx-auto image profileImage "
                    alt=""
                    onClick={() => handleOpenImage(userProfile?.profileImage)}
                  />
                )}

                <p className="text-center text-dark my-2 userProfileUserName">
                  {userProfile?.name}
                </p>
                <p
                  className=" text-dark my-2 text-center"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  {userProfile?.bio}
                </p>

                <div
                  className="px-4 mt-4 mainSideBio"
                  style={{ fontSize: "18px", borderTop: "1px solid #a2b2d1" }}
                >
                  <div class="row">
                    <div className="col-12 ">
                      {" "}
                      <div className="sideBio">
                        <div className="text-dark my-3 mt-3">
                          <i
                            class="fa fa-envelope mr-3"
                            style={{ fontSize: "18px" }}
                            aria-hidden="true"
                          ></i>
                          <span
                            className="my-2 text-center"
                            style={{ fontWeight: "bold" }}
                          >
                            {newEmail}
                          </span>
                        </div>
                        <div className="text-dark my-3">
                          {userProfile?.gender === "male" ? (
                            <i
                              class="fa fa-male mr-3"
                              style={{ fontSize: "22px" }}
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <i
                              class="fa fa-female mr-3"
                              style={{ fontSize: "22px" }}
                              aria-hidden="true"
                            ></i>
                          )}

                          <span
                            className="my-2 text-center text-capitalize ml-1"
                            style={{ fontWeight: "bold" }}
                          >
                            {userProfile?.gender}
                          </span>
                        </div>
                        <div className="text-dark my-3">
                          <i
                            class="fa-solid fa-earth-americas mr-2"
                            style={{ fontSize: "20px" }}
                          ></i>
                          <span
                            className="my-2 text-center text-capitalize ml-1"
                            style={{ fontWeight: "bold" }}
                          >
                            {userProfile?.country
                              ? userProfile?.country
                              : "india"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 "> </div>
                    <div className="sideBio">
                      <div className="text-dark my-3">
                        {userProfile?.platformType === 0 ? (
                          <i class="fa-brands fa-android mr-2"></i>
                        ) : (
                          <i class="fa-brands fa-apple mr-2"></i>
                        )}

                        <span
                          className="my-2 text-center text-capitalize ml-1"
                          style={{ fontWeight: "bold" }}
                        >
                          {userProfile?.platformType === 0 ? "Android" : "IOS"}
                        </span>
                      </div>

                      <div className="text-dark my-3">
                        <img
                          src={diamond}
                          alt=""
                          width="20px"
                          height="20px"
                          draggable="false"
                          className="mr-3"
                        />
                        <span
                          className="my-2 text-center text-capitalize"
                          style={{ fontWeight: "bold" }}
                        >
                          {userProfile?.diamond ? userProfile?.diamond : 0}
                        </span>
                      </div>

                      <div className="text-dark d-flex my-3">
                        <div className="mr-3">
                          <i
                            class="fas fa-coins "
                            style={{ fontSize: "18px" }}
                          ></i>
                        </div>
                        <div className="pl-1">
                          <EdiText
                            type="text"
                            value={userProfile?.coin}
                            onSave={handleSave}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="text-dark my-3">
                    <i
                      class="fa fa-phone mr-2"
                      style={{ fontSize: "19px" }}
                    ></i>
                    <span
                      className="my-2 text-center text-capitalize ml-1"
                      style={{ fontWeight: "bold" }}
                    >
                      {userProfile?.mobileNumber
                        ? userProfile?.mobileNumber
                        : "-"}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-12 aboutMe">
          <div
            className="row ml-2 mr-3 text-center"
            style={{ borderBottom: "2px solid #eef2f6" }}
          >
            <div
              className="col-sm-3 col-6  user userActive "
              onClick={() => handleType("about")}
              style={{ cursor: "pointer" }}
            >
              <p className="text-profile pt-2">
                <span className="text-profile pt-2">About</span>
              </p>
            </div>
            <div
              className="col-sm-3 col-6 user "
              onClick={() => handleType("following")}
              style={{ cursor: "pointer" }}
            >
              <span className="text-profile pt-2">Following </span>
              <span className="ml-2 text text-main fw-bold">
                {userProfile?.following}
              </span>
            </div>
            <div
              className="col-sm-3 col-6 user"
              onClick={() => handleType("followers")}
              style={{ cursor: "pointer" }}
            >
              <span className="text-profile pt-2">Followers </span>
              <span className="ml-2 text text-main fw-bold">
                {userProfile?.followers}
              </span>
            </div>
            <div
              className="col-sm-3 col-6 user"
              onClick={() => handleType("post")}
              style={{ cursor: "pointer" }}
            >
              <span className="text-profile pt-2">Post </span>
              <span className="ml-2 text text-main fw-bold">
                {userProfile?.TotalPost}
              </span>
            </div>
          </div>

          <div className="card my-2 mr-3 user_profile_info">
            <div className="card-body">
              {type === "about" && (
                <>
                  <div className="row px-4">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <table
                        className="w-100 infoTable"
                        style={{ fontSize: "16px" }}
                      >
                        <tr className="">
                          <td
                            className="py-3  text-profile"
                            style={{ fontSize: "18px", width: "150px" }}
                          >
                            Status
                          </td>
                          <td className="text-dark fw-bold">:</td>
                          <td>
                            {userProfile?.isOnline ? (
                              <span class="badge badge-success"> Online </span>
                            ) : (
                              <span class="badge badge-danger"> Offline </span>
                            )}
                          </td>
                        </tr>

                        <tr className=" ">
                          <td
                            className="py-3  text-profile"
                            style={{ fontSize: "18px" }}
                          >
                            Followers
                          </td>
                          <td className="text-dark fw-bold">:</td>
                          <td className="text-dark fw-bold">
                            {userProfile?.followers}
                          </td>
                        </tr>

                        <tr className=" ">
                          <td
                            className="py-3  text-profile"
                            style={{ fontSize: "18px" }}
                          >
                            Like
                          </td>
                          <td className="text-dark fw-bold">:</td>
                          <td className="text-dark fw-bold">
                            {userProfile?.totalLike
                              ? userProfile?.totalLike
                              : 0}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <table
                        className="w-100 infoTable"
                        style={{ fontSize: "16px" }}
                      >
                        {userProfile.isFake ? (
                          <tr className="">
                            <td
                              className="py-3  text-profile"
                              style={{ fontSize: "18px", width: "150px" }}
                            >
                              Live
                            </td>
                            <td className="text-dark fw-bold">:</td>
                            <td className="text-dark fw-bold pt-2 ">
                              <div
                                class={`toggle plan ${
                                  userProfile?.isLive && "on"
                                } m-0 `}
                                id="toggle"
                                onClick={() => handleClick(userProfile)}
                              >
                                <div class="slide">
                                  <span class="fa fa-circle-o"></span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <tr className="">
                            <td
                              className="py-3  text-profile"
                              style={{ fontSize: "18px", width: "150px" }}
                            >
                              Block
                            </td>
                            <td className="text-dark fw-bold">:</td>
                            <td className="text-dark fw-bold pt-3 px-2">
                              <div
                                class={`toggle ${userProfile?.isBlock && "on"}`}
                                id="toggle"
                                onClick={() => handleClick(userProfile)}
                                style={({ marginLeft: "auto" }, { margin: 0 })}
                              >
                                <div class="slide">
                                  <span class="fa fa-circle-o"></span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}

                        <tr className=" ">
                          <td
                            className="py-3  text-profile"
                            style={{ fontSize: "18px" }}
                          >
                            Following
                          </td>
                          <td className="text-dark fw-bold">:</td>
                          <td className="text-dark fw-bold">
                            {userProfile?.following}
                          </td>
                        </tr>

                        <tr className=" ">
                          <td
                            className="py-3  text-profile"
                            style={{ fontSize: "18px" }}
                          >
                            Post
                          </td>
                          <td className="text-dark fw-bold">:</td>
                          <td className="text-dark fw-bold">
                            {userProfile?.TotalPost
                              ? userProfile?.TotalPost
                              : 0}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {type === "following" &&
                (follow.length > 0 ? (
                  follow.map((data) => {
                    return (
                      <>
                        <div className="row justify-content-between py-2 px-4">
                          <div className="col-md-6 col-12 d-flex align-items-center">
                            <div>
                              <img
                                src={data?.profileImage}
                                draggable="false"
                                className="mx-auto imageUser"
                                alt=""
                              />
                            </div>
                            <div className="pt-1 ms-2">
                              <p className="mb-0" style={{ fontSize: "25px" }}>
                                {data?.name}
                              </p>
                              <p className="ps-1">{data?.bio}</p>
                            </div>
                          </div>

                          <div className="col-md-6 col-12 userCnt">
                            <div className="row follower_count">
                              <div className="col-4 text-center">
                                <p>{data?.followers ? data?.followers : 0}</p>
                                <p>Followers</p>
                              </div>
                              <div
                                className="col-4 text-center"
                                style={{ borderLeft: "1px solid #eef2f6" }}
                              >
                                <p>{data?.following ? data?.following : 0}</p>
                                <p>Following</p>
                              </div>
                              <div
                                className="col-4 text-center"
                                style={{ borderLeft: "1px solid #eef2f6" }}
                              >
                                <p>{data?.post ? data?.post : 0}</p>

                                <p>Post</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <p>User Not Following</p>
                  </div>
                ))}
              {type === "followers" &&
                (follow.length > 0 ? (
                  follow.map((data) => {
                    return (
                      <>
                        <div className="row justify-content-between py-2 px-4">
                          <div className="col-md-6 col-12 d-flex align-items-center">
                            <div>
                              <img
                                src={data?.profileImage}
                                draggable="false"
                                className="mx-auto imageUser"
                                alt=""
                              />
                            </div>
                            <div className="pt-1 ms-2">
                              <p className="mb-0" style={{ fontSize: "25px" }}>
                                {data?.name}
                              </p>
                              <p className="ps-1">{data?.bio}</p>
                            </div>
                          </div>

                          <div className="col-md-6 col-12 userCnt">
                            <div className="row follower_count">
                              <div className="col-4 text-center">
                                <p>{data?.followers ? data?.followers : 0}</p>
                                <p>Followers</p>
                              </div>
                              <div
                                className="col-4 text-center"
                                style={{ borderLeft: "1px solid #eef2f6" }}
                              >
                                <p>{data?.following ? data?.following : 0}</p>
                                <p>Following</p>
                              </div>
                              <div
                                className="col-4 text-center"
                                style={{ borderLeft: "1px solid #eef2f6" }}
                              >
                                <p>{data?.post ? data?.post : 0}</p>

                                <p>Post</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <p>User Not followers</p>
                  </div>
                ))}

              {type === "post" && (
                <>
                  <div
                    className="row mt-4"
                    // style={{ height: "310px", overflow: "auto" }}
                  >
                    {userProfile?.userPost?.length > 0 ? (
                      userProfile?.userPost?.map((post) => {
                        console.log("==============", post);
                        return (
                          <>
                            <div className="col-xl-3 col-md-4 col-sm-6 col-12 mb-3">
                              <div
                                className="card"
                                style={{ borderRadius: "7px" }}
                              >
                                <div
                                  className="card-body p-0"
                                  style={{ height: "270px" }}
                                >
                                  <div className="postImage p-2">
                                    <img
                                      src={post.postImage}
                                      draggable="false"
                                      alt=""
                                      onClick={() => handelShowImage(post)}
                                      className="mx-auto userProfilePost"
                                    />
                                  </div>
                                  <div
                                    className="row px-3"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    <div className="col-4 text-center">
                                      <i
                                        class="fa fa-heart text-danger mt-1"
                                        style={{ fontSize: "20px" }}
                                        aria-hidden="true"
                                      ></i>
                                      <p>{post?.like}</p>
                                    </div>
                                    <div className="col-4 text-center">
                                      <i
                                        class="fa-solid fa-comment mt-1"
                                        style={{ fontSize: "20px" }}
                                      ></i>
                                      <p>{post?.comment}</p>
                                    </div>
                                    <div className="col-4 text-center">
                                      <i
                                        class="fa-solid fa-gift mt-1"
                                        style={{ fontSize: "20px" }}
                                      ></i>
                                      <p>{post?.gift}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className="text-center">
                        <p>User Not Post</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {!userProfile.isFake && <ShowImageDialog />}
    </>
  );
};

export default connect(null, {
  getUserProfile,
  blockUser,
  updateHostCoin,
  getUserFollowers,
  liveUser,
})(UserProflie);
