import React from "react";
import { Link, useHistory } from "react-router-dom";
//MUI
import { makeStyles, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { LOGOUT_ADMIN } from "../../store/Admin/admin.type";
import { warning } from "../../utils/Alert";
import $ from "jquery";

import Logo from "../../assets/img/tindoLogo.png";
import LogoTxt from "../../assets/img/tindoTxt.png";

//css
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/plugins.css";
import "../../assets/css/structure.css";

//js
import "../../assets/js/bootstrap/js/bootstrap.min.js";
import "../../assets/js/bootstrap/js/popper.min.js";
import "../../assets/js/custom";
import "../../plugins/perfect-scrollbar/perfect-scrollbar.min.js";

const useStyles = makeStyles(() => ({
  navLink: {
    // "&.active": {
    //   background: "#EDE7F6",
    //   boxShadow: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
    //   borderRadius: "6px",
    // },
    "&.active .fa-solid ": {
      color: "#FFF !important",
    },
    "&.active span": {
      color: "#FFF !important",
    },
    "&.active svg": {
      color: "#FFF !important",
    },
  },
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    const data = warning();
    data
      .then((logout) => {
        if (logout) {
          dispatch({ type: LOGOUT_ADMIN });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleGift = () => {
    localStorage.setItem("giftClick", true);
    localStorage.removeItem("GiftClick");
  };

  $(".dropdown-toggle").click(function () {
    $(".dropdown-toggle").removeClass("active");
    $(this).addClass("active");
    $(".dropdown-toggle").attr("aria-expanded", "false");
  });

  const handleToggle = () => {
    $(".collapse").removeClass("show");
  };

  return (
    <>
      <div className="sidebar-wrapper sidebar-theme">
        <nav id="sidebar">
          <div className="logoBar">
            <div className="mainLogo">
              <img src={Logo} alt="" width={60} />
            </div>
            <div className="mainLogo">
              <img src={LogoTxt} alt="" width={60} />
            </div>
          </div>
          <ul
            className="list-unstyled menu-categories ps pr-1"
            id="accordionExample"
          >
            {/* DashBoard */}
            <Tooltip title="Dashboard" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to={{
                    pathname: "/admin/dashboard",
                  }}
                  data-toggle="collapse"
                  className={`dropdown-toggle ${classes.navLink} `}
                >
                  <div className="">
                    <i class="bi bi-house-door"></i>
                    <span>Dashboard</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* User */}
            <Tooltip title="User" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  data-toggle="collapse"
                  to={{
                    pathname: "/admin/user",
                  }}
                  className={`dropdown-toggle ${classes.navLink}`}
                >
                  <div className>
                    <i class="bi bi-people"></i>
                    <span>User</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* Fake Details */}
            <li class="menu">
              <a
                href="#fakeDetails"
                data-toggle="collapse"
                class="dropdown-toggle"
              >
                <div style={{ paddingRight: "10px" }}>
                  <i class="bi bi-card-list"></i>
                  <span>Fake Details</span>
                </div>
                <div>
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
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled"
                id="fakeDetails"
                data-parent="#accordionExample"
              >
                <Tooltip title="Fake User" placement="right">
                  <li>
                    <Link
                      to="/admin/fakeUser"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Fake User
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Fake Post" placement="right">
                  <li>
                    <Link
                      to="/admin/post"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Fake Post
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>

            {/* coin Plan */}

            <li class="menu">
              <a
                href="#coinPlan"
                data-toggle="collapse"
                class="dropdown-toggle"
              >
                <div style={{ paddingRight: "10px" }}>
                  <i class="bi bi-coin"></i>
                  <span>Coin Plan</span>
                </div>
                <div>
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
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled"
                id="coinPlan"
                data-parent="#accordionExample"
              >
                <Tooltip title="Pending Redeem" placement="right">
                  <li>
                    <Link
                      to="/admin/coinPlan"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Plan
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Accepted Redeem" placement="right">
                  <li>
                    <Link
                      to="/admin/purchaseHistory"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Purchase History
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>

            {/*Banner  */}

            <Tooltip title="Banner" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/banner"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div className="">
                    <i class="bi bi-card-image"></i>
                    <span>Banner</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* gift */}

            <Tooltip title="Gift" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/gift"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div className="">
                    <i class="bi bi-gift"></i>
                    <span>Gift</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* Report  */}

            <li class="menu">
              <a
                href="#elements"
                data-toggle="collapse"
                class="dropdown-toggle"
              >
                <div style={{ paddingRight: "10px" }}>
                  <i class="bi bi-receipt-cutoff"></i>
                  <span>Report</span>
                </div>
                <div>
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
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled"
                id="elements"
                data-parent="#accordionExample"
              >
                <Tooltip title="Post Report" placement="right">
                  <li>
                    <Link
                      to="/admin/postReport"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Post Report
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Profile Report" placement="right">
                  <li>
                    <Link
                      to="/admin/profileReport"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Profile Report
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>

            {/* redeem */}

            <li class="menu">
              <a
                href="#dashboard"
                data-toggle="collapse"
                class="dropdown-toggle"
              >
                <div style={{ paddingRight: "10px" }}>
                  <i class="bi bi-credit-card-2-front"></i>
                  <span>Redeem</span>
                </div>
                <div>
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
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled"
                id="dashboard"
                data-parent="#accordionExample"
              >
                <Tooltip title="Pending Redeem" placement="right">
                  <li>
                    <Link
                      to="/admin/pendingRedeem"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Pending Redeem
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Accepted Redeem" placement="right">
                  <li>
                    <Link
                      to="/admin/acceptedRedeem"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Accepted Redeem
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Decline Redeem" placement="right">
                  <li>
                    <Link
                      to="/admin/declineRedeem"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Declined Redeem
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>

            {/* withdraw */}

            <Tooltip title="withdraw" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/withdraw"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div className="">
                    <i class="bi bi-cash-coin"></i>
                    <span>Withdraw</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* profile */}

            <Tooltip title="Profile" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link to="/admin/profile" className="dropdown-toggle">
                  <div class="">
                    <i class="bi bi-person"></i>
                    <span>Profile</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            <li class="menu">
              <a
                href="#components"
                data-toggle="collapse"
                class="dropdown-toggle gift"
              >
                <div style={{ paddingRight: "10px" }}>
                  <i class="bi bi-gear"></i>
                  <span>Setting</span>
                </div>
                <div>
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
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled"
                id="components"
                data-parent="#accordionExample"
              >
                <Tooltip title="App Setting" placement="right">
                  <li>
                    <Link
                      to="/admin/appSetting"
                      data-toggle="collapse"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                    >
                      App Setting
                    </Link>
                  </li>
                </Tooltip>

                <Tooltip title="Payment Setting" placement="right">
                  <li>
                    <Link
                      to="/admin/paymentSetting"
                      className={`dropdown-toggle ${classes.navLink} ms-3`}
                      data-toggle="collapse"
                    >
                      Payment Setting
                    </Link>
                  </li>
                </Tooltip>
                {/* <li>
                  <a href="/admin/solvedComplaint"> Solve </a>
                </li> */}
              </ul>
            </li>
            <Tooltip title="Logout" placement="right">
              <li className="menu">
                <Link onClick={handleLogout} className="dropdown-toggle">
                  <div className>
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </div>
                </Link>
              </li>
            </Tooltip>
          </ul>
          {/* <div class="shadow-bottom"></div> */}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
