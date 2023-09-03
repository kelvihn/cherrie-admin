import React, { useState } from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/css/custom.css";
import {
  getDashboard,
  getChartAnalcite,
} from "../store/dashboard/dashboard.action";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import dayjs from "dayjs";
import DashboardBox from "../Components/Dialog/DashboardBox";

const Dashboard = (props) => {
  const { dashboard, analytic } = useSelector((state) => state.dashboard);

  let label = [];
  let dataUser = [];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState("week");

  const today = new Date();

  const prevWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );

  const prevWeekEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  // Format the dates as strings (in YYYY-MM-DD format)
  const prevWeekStartStr = prevWeekStart.toISOString().slice(0, 10);
  const prevWeekEndStr = prevWeekEnd.toISOString().slice(0, 10);

  useEffect(() => {
    props.getDashboard(); // eslint-disable-next-line
    props.getChartAnalcite("USER", date, prevWeekStartStr, prevWeekEndStr);
  }, []);

  useEffect(() => {
    props.getChartAnalcite("USER", date, startDate, endDate);
  }, [date]);

  const chartData = {
    labels: label,
    datasets: [
      {
        label: "user",
        data: dataUser,
        fill: true,
        fillOpacity: 1,
        backgroundColor: "#EDE7F6 ",
        borderColor: "#673ab7",
        lineTension: 0.5,
      },
    ],
  };
  if (analytic.length > 0) {
    analytic.map((data_) => {
      const newDate = data_._id;
      const date = newDate.split("T");
      label.push(date[0]);
      dataUser.push(data_.count);
    });
  }

  //Apply button function for analytic
  const handleApply = (event, picker) => {
    const start = dayjs(picker.startDate).format("YYYY-MM-DD");

    const end = dayjs(picker.endDate).format("YYYY-MM-DD");

    setStartDate(start);
    setEndDate(end);
    setDate("");
    props.getChartAnalcite("USER", date, start, end);
  };

  //Cancel button function for analytic
  const handleCancel = (event, picker) => {
    picker?.element.val("");
    setStartDate("");
    setEndDate("");
    setDate("");

    props.getChartAnalcite("USER", "week", startDate, endDate);
  };
  return (
    <>
      <div className="row my-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4 className="mb-0 fw-bold">Hi, Welcome back!</h4>
          <p style={{ color: "#e5065e" }} className="fw-bold">
            Tango app monitoring dashboard.
          </p>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 col-12 ">
          <div class="breadcrumb-four float-right">
            <ul class="breadcrumb">
              <li className="active">
                <Link to="/admin/dashboard">
                  <i class="bi bi-house-door-fill fs-5"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row row-sm mt-3">
        {/* Online User  */}
        <DashboardBox
          boxColor={`#EE0072`}
          url={`/admin/user`}
          icon={`fa-solid fa-users`}
          title={`Total User`}
          value={dashboard?.totalUser ? dashboard?.totalUser : 0}
        />
        <DashboardBox
          boxColor={`#0088EB`}
          url={`/admin/user`}
          icon={`fa-solid fa-voicemail`}
          title={`Live User`}
          value={dashboard?.liveUser ? dashboard?.liveUser : 0}
        />
        <DashboardBox
          boxColor={`#713FFF`}
          url={`/admin/user`}
          icon={`fa-solid fa-earth-europe`}
          title={`Online User`}
          value={dashboard?.activeUser ? dashboard?.activeUser : 0}
        />

        <DashboardBox
          boxColor={`#A600E0`}
          url={`/admin/gift`}
          icon={`fa-solid fa-gift`}
          title={`Total Gift`}
          value={dashboard?.totalGift ? dashboard?.totalGift : 0}
        />
      </div>

      <div className="row mt-5 mb-3">
        <div className="col-4">
          <div className="d-flex justify-content-start align-items-center">
            <DateRangePicker
              initialSettings={{
                autoUpdateInput: false,
                locale: {
                  cancelLabel: "Clear",
                },
                maxDate: new Date(),

                buttonClasses: ["btn btn-dark"],
              }}
              onApply={handleApply}
              onCancel={handleCancel}
              readonly={true}
            >
              <input
                type="text"
                class="daterange form-control text-center mr-4 "
                value="Select Date"
                readOnly
                style={{
                  width: 120,
                  cursor: "pointer",
                }}
              />
            </DateRangePicker>
            {startDate === "" || endDate === "" ? (
              <div className=" mt-2 fw-bold"></div>
            ) : (
              <div
                className="dateShow fw-bold me-3"
                style={{ fontSize: "15px" }}
              >
                <span className="mr-2">{startDate}</span>
                <span className="mr-2"> To </span>
                <span>{endDate}</span>
              </div>
            )}
          </div>
        </div>
        <div className="col-4 text-center">
          <h3 className="fw-bold">User Chart</h3>
        </div>
        <div
          className="col-4 d-flex justify-content-end"
          style={{ cursor: "pointer" }}
        >
          <button
            className="dropdown-toggle dash-drop text-capitalize"
            data-bs-toggle="dropdown"
          >
            <span className="me-2">{date ? date : "today"}</span>
            <span>
              <i class="fa-solid fa-chevron-down"></i>
            </span>
          </button>
          <ul class="dropdown-menu dashDrop my-1 dropdown-chart" role="menu">
            <li
              className=""
              onClick={() => {
                setDate("week");
              }}
            >
              Week
            </li>

            <li
              className=""
              onClick={() => {
                setDate("month");
              }}
            >
              Month
            </li>
            <li
              className=""
              onClick={() => {
                setDate("year");
              }}
            >
              Year
            </li>
          </ul>
        </div>
      </div>
      {/* <Line
        data={chartData}
        options={{ responsive: true }}
        width={1146}
        height={250}
        style={{
          display: "block",
          boxSizing: "border-box",
        }}
      /> */}
    </>
  );
};

export default connect(null, { getDashboard, getChartAnalcite })(Dashboard);
