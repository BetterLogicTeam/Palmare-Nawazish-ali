import React, { useEffect, useState } from "react";

import "./Pool.css";
import bg from "../Assets/bg.png"
import { palmareContractAddress, palmareContractAbi } from '../../utilies/Bsc_contract';
import { loadWeb3 } from '../../apis/api';
import Web3, { fromWei } from 'web3'
function Pool() {



  let [minimumbuytoken, setminimumbuytoken] = useState(null)
  let [pricepertoken, setpricepertoken] = useState(null)


  const myfun = async () => {
    // console.log("res",inputValue)
    // setShowModal(false)
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      // toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      // toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {



        const web3 = window.web3;
        let nftContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);



        // let minimumbuytoken = await nftContractOf.methods.MinimumBuyTokn().call();
        // minimumbuytoken = window.web3.utils.fromWei(minimumbuytoken, "ether")
        // setminimumbuytoken(minimumbuytoken)


        let pricePrToken = await nftContractOf.methods.pricePrToken().call();
        pricePrToken = window.web3.utils.fromWei(pricePrToken, "ether")
        console.log("pricePrToken", pricePrToken);
        setpricepertoken(pricePrToken)





      } catch (e) {
        console.log(e);


      }

    }
  }
  useEffect(() => {
    myfun()


  });




  return (
    <div className="pool_main">
      <p className="text-start ps-4">Pool details</p>
      <div className="line w-100"></div>
      <span>
        <p className="mt-3 w-90 sm1 px-3">
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
                  <p> {pricepertoken} BNB</p>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <h6 className="fw-bold ">Total allocation</h6>
                  <p> 1500000000000 BNB</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h6 className="fw-bold ">Accept currency</h6>
                  <p> BNB</p>
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


                        <button className="btn text-white  border rounded-5">Generate Referral Link</button>
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
