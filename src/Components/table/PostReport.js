import React, { useState, useEffect } from "react";
import $ from "jquery";

//routing
import { Link } from "react-router-dom";

// Pagination
import { TablePagination } from "@material-ui/core";
import TablePaginationActions from "../../utils/Pagination";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//action
import {
  getComplaint,
  solvedComplaint,
} from "../../store/Complaint/complaint.action";

//type
import { OPEN_COMPLAINT_DIALOG } from "../../store/Complaint/complaint.type";
import { baseURL } from "../../utils/Config";
//sweet alert

//component
import ComplaintDetails from "../Dialog/ComplaintDetails";
import dayjs from "dayjs";

const PostReport = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    props.getComplaint("0"); // eslint-disable-next-line
  }, []);

  const complaint = useSelector((state) => state.complaint.complaint);

  useEffect(() => {
    setData(complaint);
  }, [complaint]);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //search
  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase()
      ? e.target.value.trim().toUpperCase()
      : e.target.value.trim();
    if (value) {
      const data = complaint.filter((data) => {
        return (
          data?.userId?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.contact?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(complaint);
    }
  };

  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", baseURL + "storage/male.png");
    });
  });

  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>Post Report</h4>
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
                <a href={() => false}> Post Report</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row layout-top-spacing">
        <div id="tableDropdown" class="col-lg-12 col-12 layout-spacing">
          <div class="statbox widget  ">
            <div class="widget-content widget-content-area">
              <div class="row ">
                <div class="col-xl-8 col-md-8 col-sm-12 col-12"></div>
                <div
                  id="datePicker"
                  className="collapse mt-5 pt-5 position-absolute"
                  aria-expanded="false"
                ></div>
                <div class="col-xl-4 col-md-4 float-right col-sm-12 col-12 filtered-list-search ">
                  <form class="form-inline my-2 my-lg-0 justify-content-center">
                    <div class="w-100">
                      <input
                        type="text"
                        class="w-100 form-control product-search br-30"
                        id="input-search"
                        placeholder="Search Post Report..."
                        onChange={(e) => handleSearch(e)}
                      />
                      <button
                        class="btn bg-danger-gradient  text-white"
                        type="button"
                      >
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
                          class="feather feather-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-condensed table-striped">
                  <thead className="text-center">
                    <tr>
                      <th className="fw-bold fs-18 ">No</th>
                      <th className="fw-bold fs-18">Image</th>
                      <th className="fw-bold fs-18">Name</th>
                      <th className="fw-bold fs-18">Country</th>
                      <th className="fw-bold fs-18">Count</th>
                      <th className="fw-bold fs-18">createdAt</th>
                      <th className="fw-bold fs-18">Info</th>
                    </tr>
                  </thead>

                  {data?.length > 0 ? (
                    (rowsPerPage > 0
                      ? data.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : data
                    ).map((data, ids) => {
                      return (
                        <>
                          <tbody>
                            <tr
                              data-toggle="collapse"
                              data-target={`#demo${ids}`}
                              className="text-center accordion-toggle"
                              style={{ fontSize: "13px" }}
                            >
                              <td width="65px" style={{ fontSize: "18px" }}>
                                {ids + 1}
                              </td>

                              <td className="" width="242px">
                                <img
                                  src={data.profileImage}
                                  alt="Profile"
                                  className="m-auto table_image "
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "25px",
                                  }}
                                  draggable="false"
                                />
                              </td>
                              <td
                                width="270px"
                                className="text-center "
                                style={{
                                  fontSize: "18px",
                                  color: "#0917bd",
                                  fontWeight: "500",
                                }}
                              >
                                {data.name}
                              </td>
                              <td
                                width="200px"
                                className=" fw-bolder text-center"
                                style={{
                                  fontSize: "18px",
                                  color: "#1e9500",
                                }}
                              >
                                {data.country}
                              </td>
                              <td
                                width="100px"
                                className="text-info fw-bolder text-center"
                                style={{ fontSize: "18px" }}
                              >
                                {data.count}
                              </td>

                              <td
                                width="150px"
                                className="text-danger fw-bolder text-center"
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                }}
                              >
                                {dayjs(data?.createdAt).format("DD MMM YYYY")}
                              </td>
                              <td width="50px" style={{ fontSize: "18px" }}>
                                <button
                                  type="button"
                                  className="btn btn-primary bg-primary btn-icon p-0 py-2"
                                  style={{ width: "50px" }}
                                >
                                  <i
                                    class="fa-solid fa-circle-info text-white"
                                    style={{ fontSize: "15px" }}
                                  ></i>
                                </button>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="12" class="hiddenRow">
                                <div
                                  class="accordian-body collapse subReport"
                                  id={`demo${ids}`}
                                >
                                  <table class="table table-striped">
                                    <thead
                                      className="sticky-top"
                                      style={{ top: "-1px" }}
                                    >
                                      <tr
                                        className="text-center info"
                                        style={{
                                          color: "#000",
                                          borderBottom:
                                            "2px solid rgb(238, 242, 246)",
                                        }}
                                      >
                                        <th className="fw-bold fs-16">No</th>
                                        <th className="py-3 fs-16">Image</th>

                                        <th className="py-3 fs-16">Like</th>
                                        <th className="py-3 fs-16">Gift</th>
                                        <th className="py-3">Report</th>
                                        <th className="py-3"> createdAt</th>
                                      </tr>
                                    </thead>

                                    <tbody className="text-capitalize">
                                      {data.reports.map((com, index) => {
                                        return (
                                          <>
                                            <tr
                                              className="text-center  py-2"
                                              style={{
                                                borderBottom:
                                                  "1px solid #eef2f6",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              <td className="p-0">
                                                {index + 1}
                                              </td>
                                              <td className="py-2">
                                                <img
                                                  src={com?.image}
                                                  alt="Profile"
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                  }}
                                                  className="table_image m-auto fs-16"
                                                />
                                              </td>

                                              <td className="py-2 fs-16 text-danger fw-bolder">
                                                {com?.post?.gift}
                                              </td>
                                              <td className="py-2 fs-16 text-success fw-bolder">
                                                {com?.post?.like}
                                              </td>
                                              <td
                                                className="py-2 fs-16 "
                                                style={{ color: "#bb1e1e" }}
                                              >
                                                {com?.report}
                                              </td>
                                              <td className="py-2 fs-16">
                                                {dayjs(data?.createdAt).format(
                                                  "DD MMM YYYY"
                                                )}
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center">
                        No Data Found !
                      </td>
                    </tr>
                  )}
                </table>
                <div className="p-0 ">
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      50,
                      100,
                      { label: "All", value: data?.length },
                    ]}
                    component="div"
                    count={data?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ComplaintDetails />
      </div>
    </>
  );
};

export default connect(null, { getComplaint, solvedComplaint })(PostReport);
