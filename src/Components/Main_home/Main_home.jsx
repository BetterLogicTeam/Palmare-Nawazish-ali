import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Main_home.css";
import busd from "../Assets/busd.png";
import pal from "../Assets/pal.png";
import { AiOutlineArrowDown } from "react-icons/ai";

function Main_home() {
  return (
    <div className="Main_bg">
      <div className="container Main_inner">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row ">
              <div className="col-lg-6 ">
                <div className="card ">
                  <div className="card-body">
                    <h3 className="box_h">Initial Phase Offering</h3>
                    <div className="d-flex justify-content-start">
                      <button className="btn btn_card">Live</button>
                      <span>Phase 2 is Live</span>
                    </div>
                    <div className="line"></div>
                    <div className="row justify-content-between mt-3">
                      <div className="col-lg-6">
                        <p className="card_para">Min Purchase</p>
                        <p className="cardd_h">1290.0 PAL</p>
                      </div>
                      <div className="col-lg-6">
                        <p className="card_para ">Price per token</p>
                        <p className="cardd_h">0.0155 BUSD</p>
                      </div>
                    </div>
                    <div className="row justify-content-between mt-3">
                      <div className="col-lg-6">
                        <p className="card_para">Max Purchase</p>
                        <p className="cardd_h">129032.0 PAL</p>
                      </div>
                      <div className="col-lg-6">
                        <p className="card_para">Price in next round</p>
                        <p className="cardd_h">0.0186 BUSD</p>
                      </div>
                    </div>
                    <p className="card_para mb-2">swap progress</p>
                    <ProgressBar variant="success" now={60} />;
                    <div className="d-flex justify-content-between">
                      <p className="card_para  ">57.60%</p>
                      <p className="card_para ">8175483.0/14193548.0 PAL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 sm ">
                <div className="card py-3">
                  <div className="card-body">
                    <div className="grey_div">
                      <div className="d-flex justify-content-between">
                        <p>From</p>
                        <p>Balance: 0 </p>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            placeholder="0.0"
                            className="input_card"
                          />
                        </div>
                        <div className="col-lg-6">
                          <button className="btn input_btn ">Max</button>
                          <img src={busd} alt="" />
                        </div>
                      </div>
                    </div>
                    <AiOutlineArrowDown className="fs-4 fw-bold my-2"></AiOutlineArrowDown>
                    <div className="grey_div">
                      <div className="d-flex justify-content-between">
                        <p>To</p>
                        <p>Balance: 0 </p>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            placeholder="0.0"
                            className="input_card"
                          />
                        </div>
                        <div className="col-lg-6">
                          <button className="btn input_btn ">Max</button>
                          <img src={pal} alt="" />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <p>Rate</p>
                        <p>0.0155 BUSD = 1 PAL</p>
                      </div>
                      <button className="btn btn-dark rounded-5 w-100">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main_home;
