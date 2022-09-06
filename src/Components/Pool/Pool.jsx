import React from "react";
import "./Pool.css";
import bg from "../Assets/bg.png"

function Pool() {
  return (
    <div className="pool_main">
      <p className="text-start ps-4">Pool details</p>
      <div className="line w-100"></div>
      <span>
        <p className="mt-3 w-90 sm1">
          After purchasing the $PAL token, you get instantly a portion of the
          purchased token and the rest will be distributed following the vesting
          schedule. Each purchaser can get a different tier based on the round
          number they joined. For more detail please visit{" "}
          <a href="">
            {" "}
            https://docs.palmare.io/tokenomic/ipo-initial-phase-offering
          </a>
        </p>
      </span>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card two_card">
              <div className="card-body">
                <div className="d-flex justify-content-between mt-3">
                  <h6 className="fw-bold ">Price per token</h6>
                  <p> $0.0155 per PAL</p>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <h6 className="fw-bold ">Total allocation</h6>
                  <p> 14193548.0 PAL</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h6 className="fw-bold ">Accept currency</h6>
                  <p> BUSD</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h6 className="fw-bold ">Network</h6>
                  <p> Binance Smart Chain</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h6 className="fw-bold ">Vesting Schedule</h6>
                  <p className="ps-5">
                    {" "}
                    15% unlock instanly after purchasing, 85% vesting monthly in
                    15 months
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card two_card">
              <div className="card-body">
                <div className="d-flex">
                  <div className="row">
                    <div className="col-lg-6 p-0">
                    <div className="img">
                  <img src={bg} alt="" /> </div>
                    </div>
                    <div className="col-lg-6 p-0">
                    <div className="h4 mt-5 text-start">
                  <h4>Referral to Earn</h4>
                  <p className="fs-6 ">Refer any participant to join the IPO, and then you can earn up to 6% commission on their deposits, 2% bonus from total reward of level 2 referrers. Commission will be instantly transferred to your wallet in BUSD.</p>
                  
                  
                  <button className="btn btn-outline-dark rounded-5">Generate Referral Link</button>
                  </div>
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

export default Pool;
