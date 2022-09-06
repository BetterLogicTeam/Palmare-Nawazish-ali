import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Main_home.css";
import busd from "../Assets/busd.png";
import pal from "../Assets/pal.png";
import { AiOutlineArrowDown } from "react-icons/ai";
import { palmareContractAddress, palmareContractAbi } from '../../utilies/Bsc_contract';
import { loadWeb3 } from '../../apis/api';
import Web3, { fromWei } from 'web3'

function Main_home() {

  let [minimumbuytoken, setminimumbuytoken] = useState(null)
  let [pricepertoken, setpricepertoken] = useState(null)
  let [inputvalue, setinputvalue] = useState('')

  let [valueinbnb, setbnbvalue] = useState('')
  let [currentbalance, setcurrentbalance] = useState('')
  let [userbalance, setuserbalance] = useState('')






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
        let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);



        let minimumbuytoken = await palmareContractOf.methods.MinimumBuyTokn().call();
        minimumbuytoken = window.web3.utils.fromWei(minimumbuytoken, "ether")
        setminimumbuytoken(minimumbuytoken)


        let pricePrToken = await palmareContractOf.methods.pricePrToken().call();
        pricePrToken = window.web3.utils.fromWei(pricePrToken, "ether")
        console.log("pricePrToken", pricePrToken);
        setpricepertoken(pricePrToken)

        let userbalance = await web3.eth.getBalance(acc)
        userbalance = window.web3.utils.fromWei(userbalance, "ether")
        setuserbalance(userbalance)
        console.log("currrentbalances", userbalance);

        let currrentbalance = await palmareContractOf.methods.balanceOf(acc).call();
        currrentbalance = window.web3.utils.fromWei(currrentbalance, "ether")

        setcurrentbalance(currrentbalance)
        // console.log("currrentbalance", currrentbalance);


      } catch (e) {
        console.log(e);
        // setinputdatahere(" ")
        // toast.error("User Is Not Exists")
        // setButtonOne("Mint With BNB")


      }

    }
  }
  useEffect(() => {
    myfun()
    console.log("what is input value", inputvalue)


  });

  const bnbtorunx = async (value) => {
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
        let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);


        console.log("what is enter value", value);
        const myvalue = web3.utils.toWei(value)
        console.log("after converting ", myvalue);

        let check_bnbValue = await palmareContractOf.methods.check_tokenValue(myvalue).call();
        let value_after = web3.utils.fromWei(check_bnbValue)
        // value_after = web3.utils.fromWei(value_after)
        console.log("check_bnbValue after fromwei", value_after);
        setbnbvalue(value_after)



      } catch (e) {
        console.log(e);
        // setinputdatahere(" ")
        // toast.error("User Is Not Exists")
        // setButtonOne("Mint With BNB")


      }

    }
  }
  const convertbnbtorunx = async (e) => {
    setinputvalue(e.target.value)
    bnbtorunx(e.target.value)
  }
  const buyToken = async () => {

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
        let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);


        console.log("what is enter value", inputvalue);
        // let myvalue = web3.utils.toWei(inputvalue)
        let val = web3.utils.toWei(inputvalue);
        console.log('what is the value  towei', val)

        // let myvalue = parseInt(inputvalue)
        // console.log("zzz ", web3.utils.toWei(myvalue).toString());

        let check_bnbValue = await palmareContractOf.methods.BuyToken().send({ from: acc, value: val });
        // let value_after = web3.utils.fromWei(check_bnbValue)
        // value_after = web3.utils.fromWei(value_after)
        console.log("check token ", check_bnbValue);
        // setbnbvalue(value_after)

        // setminimumbuytoken(minimumbuytoken)



        // let pricePrToken = await nftContractOf.methods.pricePrToken().call();
        // pricePrToken = window.web3.utils.fromWei(pricePrToken, "ether")
        // console.log("pricePrToken", pricePrToken);
        // setpricepertoken(pricePrToken)





      } catch (e) {
        console.log(e);
        // setinputdatahere(" ")
        // toast.error("User Is Not Exists")
        // setButtonOne("Mint With BNB")


      }
    }


  }

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
                        <p className="cardd_h">{minimumbuytoken} BNB</p>
                      </div>
                      <div className="col-lg-6">
                        <p className="card_para ">Price per token</p>
                        <p className="cardd_h">{pricepertoken} BNB</p>
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
                        <p>Balance: {userbalance} </p>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            value={inputvalue}
                            placeholder="0.0"
                            className="input_card"
                            onChange={convertbnbtorunx}
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
                        <p>Balance: {currentbalance} </p>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            value={valueinbnb}
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
                      <button className="btn btn-dark rounded-5 w-100" onClick={buyToken}>Connect</button>
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
