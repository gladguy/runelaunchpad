import { useEffect, useState } from "react";
import "./App.css";
import { Button, Col, Input, Row, Typography } from "antd";
import axios from "axios";
import Notify from "./components/notification";

function App() {
  const BTC_ZERO = 100000000;
  const IS_LOCAL = false;
  const { Text } = Typography;

  const [formData, setFormData] = useState({
    rune: null,
    divisibility: null,
    symbol: null,
    premine: null,
    supply: null,
    cap: null,
    number_of_days: null,
    offset_end: null,
    amount: null,
    file: null,
    feeMode: null,
    fee: null
  });
  const [feeDetails, setFeeDetails] = useState({ low: null, medium: null, high: null });
  const [btcValue, setBtcValue] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState({
    runeErr: false,
    divisibilityErr: false,
    symbolErr: false,
    premineErr: false,
    supplyErr: false,
    capErr: false,
    number_of_daysErr: false,
    offset_endErr: false,
    amountErr: false,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const btcPrice = async () => {
    const BtcData = await axios.get(
      `https://ordinalsheight.com/api/v1/fetch/BtcPrice`
    );
    return BtcData;
  };

  const fetchBTCLiveValue = async () => {
    try {
      const BtcData = await btcPrice();
      if (BtcData.data.data[0]?.length) {
        const btcValue = BtcData.data.data[0].flat();
        setBtcValue(btcValue[1]);
      } else {
        fetchBTCLiveValue();
      }
    } catch (error) {
      Notify("error", "Failed to fetch ckBtc");
    }
  };

  const handleFormSubmit = async () => {
    try {
      let isReadyToSend = true;
      Object.values(formData).forEach((value) => {
        if (!value) {
          isReadyToSend = false;
        }
      });

      Object.values(formError).forEach((value) => {
        if (value) {
          isReadyToSend = false;
        }
      })

      if (isReadyToSend) {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });
        const res = await axios.post(`${IS_LOCAL ? "http" : "https"}://${IS_LOCAL ? "localhost:1010" : "rune.ordinalsheight.com"}/api/v1/inscribe`, formDataToSend);
        // console.log("res", res);
        if (res.data.success) {
          setIsSubmitted(true);
          // Notify("success", "Inscribe Successfull");
        } else {
          Notify("error", res.data.message);
        }
      } else {
        Notify("warning", "Fill all the fields correctly!");
      }
    } catch (error) {
      console.log("Submission error", error);
    }
  }

  useEffect(() => {
    const premineRegex = /^[0-9]+$/;
    const runeRegex = /^[A-Z.]{1,20}$/;
    const symbolRegex = /^[A-Z]{1}$/;
    const divisibilityRegex = /^[1-4]$/;
    const capRegex = /^(?:[1-9]\d{0,4}|100000)$/;
    const numRegex = /^(?:[1-9]\d{0,3}|10000)$/;
    let Error = { ...formError };
    Object.keys(formData).forEach((keys) => {
      if (
        !formData.divisibility?.match(divisibilityRegex) &&
        formData.divisibility !== null &&
        keys === "divisibility"
      ) {
        Error[keys + "Err"] = true;
      } else if (
        !formData.cap?.match(capRegex) &&
        formData.cap !== null &&
        keys === "cap"
      ) {
        Error[keys + "Err"] = true;
      } else if (
        !formData.number_of_days?.match(numRegex) &&
        formData.number_of_days !== null &&
        keys === "number_of_days"
      ) {
        Error[keys + "Err"] = true;
      } else if (
        !formData.amount?.match(numRegex) &&
        formData.amount !== null &&
        keys === "amount"
      ) {
        Error[keys + "Err"] = true;
      } else if (
        !formData.premine?.match(premineRegex) &&
        formData.premine !== null &&
        keys === "premine"
      ) {
        Error[keys + "Err"] = true;
      } else if (
        !formData.symbol?.match(symbolRegex) &&
        formData.symbol !== null &&
        keys === "symbol"
      ) {
        Error[keys + "Err"] = true;
      } else if (
        !formData.rune?.match(runeRegex) &&
        formData.rune !== null &&
        keys === "rune"
      ) {
        Error[keys + "Err"] = true;
      } else {
        Error[keys + "Err"] = false;
      }
    });
    setFormError(Error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    setFormData({
      ...formData,
      supply:
        Number(formData.premine) +
        (Number(formData.cap) * Number(formData.amount)) || null,
      offset_end: formData.number_of_days * 144 || null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.number_of_days,
    formData.premine,
    formData.cap,
    formData.amount,
  ]);

  useEffect(() => {
    fetchBTCLiveValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btcValue]);

  const handleRadio = async (e) => {
    // setFormData({
    //   ...formData,
    //   feeMode: e.target.id
    // })
    let info;

    try {
      info = await axios.get(
        `https://mempool.space/api/v1/fees/recommended`
      );
    } catch (error) {
      console.log("Fee fetching error", error);
    }

    setFeeDetails({
      low: info.data.hourFee * 267,
      medium: info.data.halfHourFee * 267,
      high: info.data.fastestFee * 267,
    });

    let fee = 0;
    if (e.target.id === "low") {
      fee = ((info.data.hourFee * 267) / BTC_ZERO) * btcValue;
    } else if (e.target.id === "medium") {
      fee = ((info.data.halfHourFee * 267) / BTC_ZERO) * btcValue;
    } else {
      fee = ((info.data.fastestFee * 267) / BTC_ZERO) * btcValue;
    }
    setFormData({
      ...formData,
      feeMode: e.target.id,
      fee: fee.toFixed(2)
    })
  };

  // console.log("formData", formData);
  // console.log("feeDetails", feeDetails);
  // console.log("btcValue", btcValue);

  return (
    <div className="App">
      <div className="App-header">
        <Row justify={"center"} style={{
          height: isSubmitted && "100vh"
        }} align={"middle"}>
          <Col md={10} className={`container`} >
            {isSubmitted ?
              <>
                <div className="success-checkmark fade-in pt-70">
                  <div className="check-icon ">
                    <span className="icon-line line-tip "></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle "></div>
                    <div className="icon-fix"></div>
                  </div>
                </div>
                <Row justify={"center"}>
                  <Text className="color-black font-size-25 font-weight-600">
                    Etching submitted successfully
                  </Text>
                </Row>
              </>
              :
              <>
                <Row justify={"center"}>
                  <label className="heading">Etching Form</label>
                </Row>

                <Row justify={"center"}>
                  <Col md={18}>
                    <form className="form">
                      <Row>
                        <Col md={24}>
                          <Row>
                            <label className="label">Rune</label>
                          </Row>
                          <Input
                            placeholder="Uppercase and Dot only allowed (upto 20 characters)"
                            name="rune"
                            type="text"
                            onChange={handleChange}
                            className={`input ${formError.runeErr ? "error" : formData.rune && "success"}`}
                            value={formData.rune}
                            required
                          />
                        </Col>
                      </Row>

                      <Row justify={"space-between"}>
                        <Col md={11}>
                          <Row>
                            <label className="label">Divisibility</label>
                          </Row>
                          <Input
                            placeholder="1, 2, 3, 4 only"
                            name="divisibility"
                            type="text"
                            value={formData.divisibility}
                            onChange={handleChange}
                            className={`input ${formError.divisibilityErr ? "error" : formData.divisibility && "success"}`}
                            required
                          />
                        </Col>

                        <Col md={11}>
                          <Row>
                            <label className="label">Symbol</label>
                          </Row>
                          <Input
                            value={formData.symbol}
                            placeholder="(A-Z) only one character"
                            name="symbol"
                            type="text"
                            maxLength={1}
                            onChange={handleChange}
                            className={`input ${formError.symbolErr ? "error" : formData.symbol && "success"}`}
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={24}>
                          <Row>
                            <label className="label">Premine</label>
                          </Row>
                          <Input
                            placeholder="1 to 1000000000"
                            name="premine"
                            type="text"
                            value={formData.premine}
                            onChange={(e) => {
                              if (e.target.value.match(/^[0-9]+$/)) {
                                handleChange(e);
                              } else if (e.target.value === "") {
                                handleChange(e);
                              }
                            }} className={`input ${formError.premineErr ? "error" : formData.premine && "success"}`}
                            required
                          />
                        </Col>
                      </Row>

                      <Row justify={"space-between"}>
                        <Col md={11}>
                          <Row>
                            <label className="label">Cap</label>
                          </Row>
                          <Input
                            placeholder="1 to 100000"
                            name="cap"
                            type="text"
                            onChange={(e) => {
                              if (e.target.value.match(/^[0-9]+$/)) {
                                handleChange(e);
                              } else if (e.target.value === "") {
                                handleChange(e);
                              }
                            }} className={`input ${formError.capErr ? "error" : formData.cap && "success"}`}
                            required=""
                          />
                        </Col>

                        <Col md={11}>
                          <Row>
                            <label className="label">Amount</label>
                          </Row>
                          <Input
                            placeholder="1 to 10000"
                            name="amount"
                            type="text"
                            onChange={(e) => {
                              if (e.target.value.match(/^[0-9]+$/)) {
                                handleChange(e);
                              } else if (e.target.value === "") {
                                handleChange(e);
                              }
                            }} className={`input ${formError.amountErr ? "error" : formData.amount && "success"}`}
                            required
                          />
                        </Col>
                      </Row>

                      <Row justify={"space-between"}>
                        <Col md={24}>
                          <Row>
                            <label className="label">Supply</label>
                          </Row>
                          <Input
                            placeholder="Fillout premine, cap and amount"
                            name="supply"
                            readOnly
                            type="text"
                            onChange={handleChange}
                            className={`input ${formData.supply && "success"}`}
                            value={formData.supply}
                            required
                          />
                        </Col>
                      </Row>

                      <Row justify={"space-between"}>
                        <Col md={11}>
                          <Row>
                            <label className="label">Number of Day</label>
                          </Row>
                          <Input
                            placeholder="1 to 10000"
                            name="number_of_days"
                            type="text"
                            onChange={(e) => {
                              if (e.target.value.match(/^[0-9]+$/)) {
                                handleChange(e);
                              } else if (e.target.value === "") {
                                handleChange(e);
                              }
                            }}
                            className={`input ${formError.number_of_daysErr ? "error" : formData.number_of_days && "success"}`}
                            required
                          />
                        </Col>

                        <Col md={11}>
                          <Row>
                            <label className="label">Offset End</label>
                          </Row>
                          <Input
                            placeholder="Fillout no of days"
                            name="offset_end"
                            readOnly
                            type="text"
                            onChange={handleChange}
                            className={`input ${formData.offset_end <= 1440000 && formData.offset_end ? "success" : formData.offset_end !== null && "error"}`}
                            value={formData.offset_end}
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={24}>
                          <Row>
                            <label className="label">Fee</label>
                          </Row>
                          <div className="radio-button-container">
                            <div className="radio-button">
                              <input
                                type="radio"
                                className="radio-button__input"
                                id="low"
                                name="radio-group"
                                onClick={(e) => handleRadio(e)}
                              />
                              <label className="radio-button__label" htmlFor="low">
                                <span className="radio-button__custom"></span>
                                Low
                              </label>
                            </div>
                            <div className="radio-button">
                              <input
                                type="radio"
                                className="radio-button__input"
                                id="medium"
                                name="radio-group"
                                onClick={(e) => handleRadio(e)}
                              />
                              <label className="radio-button__label" htmlFor="medium">
                                <span className="radio-button__custom"></span>
                                Medium
                              </label>
                            </div>

                            <div className="radio-button">
                              <input
                                type="radio"
                                className="radio-button__input"
                                id="high"
                                name="radio-group"
                                onClick={(e) => handleRadio(e)}
                              />
                              <label className="radio-button__label" htmlFor="high">
                                <span className="radio-button__custom"></span>
                                High
                              </label>
                            </div>
                          </div>
                          <Row>
                            <Input
                              placeholder="Fee"
                              name="Fee"
                              readOnly
                              type="text"
                              className={`input ${formData.fee && "success"}`}
                              value={`$ ${formData.fee ? formData.fee : 0}`}
                              required
                            />
                          </Row>
                        </Col>
                      </Row>

                      <Row>
                        <label htmlFor="file-input" className={`drop-container ${formData.file && "upload-success"}`}>
                          <span className="drop-title">Drop your logo here</span>
                          or
                          <input
                            onChange={handleChange}
                            type="file"
                            accept=".jpg, .png"
                            required=""
                            id="file-input"
                          />
                          <div>Allowed formats (.png or .jpg)</div>
                        </label>
                      </Row>

                      <Button type="submit" onClick={handleFormSubmit} className="login-button">
                        Submit
                      </Button>
                    </form>
                  </Col>
                </Row>
              </>
            }
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
