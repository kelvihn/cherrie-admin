import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getFakePost,
  deleteFakePost,
} from "../../store/fakePost/fakePost.action";
import { useEffect } from "react";
import { useState } from "react";
import { OPEN_FAKE_POST_DIALOG } from "../../store/fakePost/fakePost.type";
import { warning } from "../../utils/Alert";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/Config";
import dayjs from "dayjs";
import { TablePagination } from "@material-ui/core";
import TablePaginationActions from "../../utils/Pagination";
import FakePostDialog from "../Dialog/FakePostDialog";

const FakePostTable = (props) => {
  const { fakePost } = useSelector((state) => state.fakePost);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    props.getFakePost();
  }, []);

  useEffect(() => {
    setData(fakePost);
  }, [fakePost]);
  const dispatch = useDispatch();

  const handleSearch = () => {};

  // handle Edit plan

  const handleEdit = (data) => {
    dispatch({ type: OPEN_FAKE_POST_DIALOG, payload: data });
  };

  // handle Delete planL
  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteFakePost(id);
        }
      })
      .catch((err) => console.log(err));
  };

  // handle Create Dialog Open

  const handleOpen = () => {
    dispatch({ type: OPEN_FAKE_POST_DIALOG });
  };

  // // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="row py-2 align-items-center">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>Fake Post</h4>
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
                <a href={() => false}>Fake Post </a>
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
                <div class="col-xl-8 col-md-8 col-sm-12 col-12 mb-4">
                  <button
                    class="btn text-white btn-danger  text-center"
                    onClick={handleOpen}
                  >
                    <i class="fa fa-plus pr-1" aria-hidden="true"></i> Add
                  </button>
                </div>
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
                        placeholder="Search User..."
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
              <div class="table-responsive table-height">
                <table class="table table-striped ">
                  <thead className="sticky-top" style={{ top: "-1px" }}>
                    <tr className="text-center">
                      <th className="fw-bold">ID</th>
                      <th className="fw-bold">Image</th>
                      <th className="fw-bold">User Name</th>
                      <th className="fw-bold">Description</th>

                      <th className="fw-bold">Created At</th>

                      <th className="fw-bold">Edit</th>
                      <th className="fw-bold">Delete</th>
                      {/* <th className="fw-bold">History</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {data?.length > 0 ? (
                      (rowsPerPage > 0
                        ? data?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((data, i) => {
                        return (
                          <>
                            <tr className="text-center">
                              <td> {i + 1}</td>
                              <td>
                                <img
                                  id="image"
                                  src={data?.postImage}
                                  draggable="false"
                                  className="mx-auto table_image"
                                  alt=""
                                  onerror={`this.src="${baseURL}/storage/male.png"`}
                                />
                              </td>
                              <td> {data?.userId.name}</td>
                              <td>
                                {data?.description === null
                                  ? "-"
                                  : data?.description}
                              </td>

                              <td>
                                {dayjs(data?.createdAt).format("DD MMM YYYY")}
                              </td>

                              <td>
                                <button
                                  className="btn btn-info"
                                  onClick={() => handleEdit(data)}
                                >
                                  <i className="fas fa-edit" />
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(data._id)}
                                >
                                  <i className="fas fa-trash-alt" />
                                </button>
                              </td>
                              {/* <td>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleHistory(data?._id)}
                                >
                                  <i className="fa fa-history "></i>
                                </button>
                              </td> */}
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="13" className="text-center ">
                          No Data Found !
                        </td>
                      </tr>
                    )}
                  </tbody>
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
        <FakePostDialog />
      </div>
    </>
  );
};

export default connect(null, { getFakePost, deleteFakePost })(FakePostTable);
