import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_COIN_PLAN_DIALOG } from "../../store/CoinPlan/CoinPlan.Type";
import {
  createNewCoinPlan,
  updateCoinPlan,
} from "../../store/CoinPlan/CoinPlan.action";

const CoinPlanDialog = (props) => {
  const { dialog: open, dialogData } = useSelector((state) => state.coinPlan);
  const [mongoId, setMongoId] = useState("");
  const [coin, setCoin] = useState("");
  const [dollar, setDollar] = useState("");
  const [extraCoin, setExtraCoin] = useState("");
  const [platFormType, setPlatFormType] = useState("");
  const [productKey, setProductKey] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setCoin(dialogData.coin);
      setDollar(dialogData.dollar);
      setExtraCoin(dialogData.extraCoin);
      setTag(dialogData.tag);
      setProductKey(dialogData.productKey);
      setPlatFormType(dialogData?.platFormType);
    }
  }, [dialogData]);

  console.log("dialogData*********", dialogData);
  useEffect(
    () => () => {
      setError({
        coin: "",
        dollar: "",
        rupee: "",
        productKey: "",
        extraCoin: "",
        platFormType: "",
      });
      setMongoId("");
      setCoin("");
      setPlatFormType("");
      setTag("");
      setDollar("");
      setProductKey("");
      setExtraCoin("");
    },
    [open]
  );

  useEffect(() => {
    window.onbeforeunload = handleClose();
  }, []);
  const dispatch = useDispatch();
  // handleClose Dialog
  const handleClose = () => {
    dispatch({ type: CLOSE_COIN_PLAN_DIALOG });
  };

  // handel Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !coin ||
      !dollar ||
      !productKey ||
      coin < 0 ||
      dollar < 0 ||
      platFormType < 0 ||
      platFormType === "Select Package"
    ) {
      const error = {};
      if (!coin) error.coin = "Coin is required!";
      if (coin < 0) error.coin = "Invalid Coin!";
      if (!dollar) error.dollar = "Dollar is required!";
      if (dollar < 0) error.dollar = "Invalid dollar!";
      if (platFormType < 0 || platFormType === "Select Package") {
        error.platFormType = "PlatFormType is Required!";
      }
      if (!productKey) error.productKey = "Product Key is required!";

      return setError({ ...error });
    }

    const data = {
      coin,
      dollar,
      extraCoin: extraCoin ? extraCoin : 0,
      tag,
      productKey,
      platFormType,
    };

    if (mongoId) {
      props.updateCoinPlan(data, mongoId);
    } else {
      props.createNewCoinPlan(data);
    }
    handleClose();
  };

  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d+$/.test(val);
    return validNumber;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="dialogue_background_color"
        >
          <span className="modal-title font-weight-bold h4"> CoinPlan </span>
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <Tooltip title="Close">
            <Cancel className="modal-title text-light" onClick={handleClose} />
          </Tooltip>
        </IconButton>
        <DialogContent className="dialogue_background_color">
          <div className="modal-body pt-1 px-1 pb-3">
            <div className="d-flex flex-column">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Coin</label> */}
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="Coin"
                          required=""
                          min="0"
                          value={coin}
                          placeholder="10"
                          onChange={(e) => {
                            setCoin(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                coin: "coin is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                coin: "",
                              });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        />
                        <label for="Coin">Coin</label>

                      </div>
                      {error.coin && (
                        <div className="ml-1 mt-1">
                          {error.coin && (
                            <div className=" text__left">
                              <span className="text-danger">{error.coin}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Extra Coin</label> */}
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          required=""
                          id="ExtraCoin"
                          min="0"
                          placeholder="100"
                          value={extraCoin}
                          onChange={(e) => setExtraCoin(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        <label for="ExtraCoin">ExtraCoin</label>

                      </div>

                    </div>
                  </div>
                </div>

                <div className="row align-align-items-center">
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Amount($)</label> */}
                      <div className="form-floating">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          required=""
                          id="Dollar"
                          placeholder="100"
                          value={dollar}
                          onChange={(e) => {
                            setDollar(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                dollar: "Dollar is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                dollar: "",
                              });
                            }
                          }}
                        />
                        <label for="Dollar">Amount($)</label>

                      </div>
                      {error.dollar && (
                        <div className="ml-1 mt-1">
                          {error.dollar && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">
                                {error.dollar}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label class="float-left dialog__input__title">
                        Platform Type
                      </label> */}
                      <div className="form-floating">
                        <select
                          name="type "
                          class="form-control form-control-line"
                          id="type Plateform"
                          value={platFormType}
                          onChange={(e) => {
                            setPlatFormType(e.target.value);

                            if (e.target.value === "Select Package") {
                              return setError({
                                ...error,
                                platFormType: "Platform type is required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                platFormType: "",
                              });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        >
                          <option value="Select Package">
                            ---Select Package---
                          </option>

                          <option value="0">Android</option>
                          <option value="1">IOS</option>
                        </select>
                        <label for="Platform">Platform Type</label>

                      </div>
                      {error.platFormType && (
                        <div className="ml-1 mt-1">
                          {error.platFormType && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">
                                {error.platFormType}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label className="mb-2 text-gray">Tag</label> */}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          id="Tag"
                          placeholder="20% OFF"
                          value={tag}
                          onChange={(e) => {
                            setTag(e.target.value);
                          }}
                        />
                        <label for="Tag">Tag</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group ">
                      {/* <label className="text-gray">
                        Google InApp Product Key
                      </label> */}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          id="Key"
                          placeholder="android.test.purchased"
                          value={productKey}
                          onChange={(e) => {
                            setProductKey(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                productKey: "Product Key is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                productKey: "",
                              });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        />
                        <label for="Key">Product Key</label>
                      </div>
                      {error.productKey && (
                        <div className="ml-1 mt-1">
                          {error.productKey && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">
                                {error.productKey}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2 float-right">
                  {dialogData ? (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handleSubmit}
                    >
                      Insert
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn ml-2 btn-danger px-3"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { createNewCoinPlan, updateCoinPlan })(
  CoinPlanDialog
);
